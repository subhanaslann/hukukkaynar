import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kvkk: boolean;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, number>();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TransportOptions = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
  to: string;
};

let transporter: nodemailer.Transporter | null = null;

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value ? value.trim() : undefined;
}

function resolveTransportOptions(): TransportOptions | null {
  const host = getEnv('SMTP_HOST');
  const portValue = getEnv('SMTP_PORT');
  const from = getEnv('SMTP_FROM') ?? getEnv('SMTP_USER');
  const to = getEnv('SMTP_TO');

  if (!host || !from || !to) {
    return null;
  }

  const port = Number(portValue ?? '587');
  const secure =
    getEnv('SMTP_SECURE') === 'true' || (!Number.isNaN(port) && port === 465);
  const user = getEnv('SMTP_USER');
  const pass = getEnv('SMTP_PASS');

  return {
    host,
    port: Number.isNaN(port) ? 587 : port,
    secure,
    user,
    pass,
    from,
    to
  };
}

async function sendMail(data: ContactFormData) {
  const options = resolveTransportOptions();
  if (!options) {
    console.warn('SMTP yapılandırması eksik olduğundan e-posta gönderimi atlandı.');
    return false;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure,
      auth: options.user && options.pass ? { user: options.user, pass: options.pass } : undefined
    });
  }

  const payload = {
    from: options.from,
    to: options.to,
    replyTo: data.email,
    subject: `[İletişim Formu] ${data.subject}`,
    text: [
      `Ad Soyad: ${data.name}`,
      `E-posta: ${data.email}`,
      `Telefon: ${data.phone}`,
      `Konu: ${data.subject}`,
      '',
      data.message
    ].join('\n'),
    html: `
      <div>
        <p><strong>Ad Soyad:</strong> ${data.name}</p>
        <p><strong>E-posta:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Konu:</strong> ${data.subject}</p>
        <p><strong>KVKK:</strong> ${data.kvkk ? 'Onaylandı' : 'Onaylanmadı'}</p>
        <hr />
        <p>${data.message.replace(/\n/g, '<br />')}</p>
      </div>
    `
  };

  const sent = await transporter.sendMail(payload);
  return Boolean(sent.accepted?.length);
}

function getClientIp(request: NextRequest): string {
  return (
    request.ip ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastAttempt = rateLimitStore.get(ip);
  if (lastAttempt && now - lastAttempt < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  rateLimitStore.set(ip, now);
  setTimeout(() => {
    if (rateLimitStore.get(ip) === now) {
      rateLimitStore.delete(ip);
    }
  }, RATE_LIMIT_WINDOW_MS);
  return false;
}

function sanitizePayload(data: ContactFormData) {
  return {
    name: data.name?.trim(),
    email: data.email?.trim(),
    phone: data.phone?.trim(),
    subject: data.subject?.trim(),
    message: data.message?.trim(),
    kvkk: Boolean(data.kvkk)
  };
}

export async function POST(request: NextRequest) {
  try {
    const payload = sanitizePayload(await request.json());
    const clientIp = getClientIp(request);

    if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Çok sık istek gönderildi. Lütfen kısa bir süre sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    if (!payload.name || !payload.email || !payload.phone || !payload.subject || !payload.message) {
      return NextResponse.json({ error: 'Tüm alanları doldurunuz.' }, { status: 400 });
    }

    if (!payload.kvkk) {
      return NextResponse.json({ error: 'KVKK onayı gereklidir.' }, { status: 400 });
    }

    if (!emailRegex.test(payload.email)) {
      return NextResponse.json({ error: 'Geçerli bir e-posta adresi giriniz.' }, { status: 400 });
    }

    const delivered = await sendMail(payload);

    console.info('İletişim formu teslimatı', {
      delivered,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        delivered
      },
      { status: 202 }
    );
  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}
