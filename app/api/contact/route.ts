import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kvkk: boolean;
  court?: string;
  lawArea?: string;
  facts?: string;
  request?: string;
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

const htmlEscapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => htmlEscapeMap[char] ?? char);
}

function formatMultilineHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, '<br />');
}

function buildHtmlRows(entries: Array<[string, string]>) {
  return entries
    .map(([label, value]) => {
      const safeValue = value ? escapeHtml(value) : '-';
      return `<p style="margin:0 0 6px;line-height:1.5;"><strong>${label}:</strong> ${safeValue || '-'}</p>`;
    })
    .join('');
}

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

  const petitionValues = {
    court: data.court || '-',
    subject: data.subject || '-',
    lawArea: data.lawArea || '-',
    facts: data.facts || '-',
    request: data.request || '-'
  };

  const textBody = [
    '--- Dilekçe ---',
    `Başvuru Makamı/Mahkeme: ${petitionValues.court}`,
    `Konu: ${petitionValues.subject}`,
    `Hukuk Alanı: ${petitionValues.lawArea}`,
    `Olayın Özeti: ${petitionValues.facts}`,
    `Talep/İstem: ${petitionValues.request}`,
    '',
    '--- Başvuran Bilgileri ---',
    `Ad Soyad: ${data.name}`,
    `E-posta: ${data.email}`,
    `Telefon: ${data.phone}`,
    `KVKK: ${data.kvkk ? 'Onaylandı' : 'Onaylanmadı'}`,
    '',
    '--- Mesaj ---',
    data.message || '-'
  ].join('\n');

  const htmlPetition = buildHtmlRows([
    ['Başvuru Makamı/Mahkeme', petitionValues.court],
    ['Konu', petitionValues.subject],
    ['Hukuk Alanı', petitionValues.lawArea],
    ['Olayın Özeti', petitionValues.facts],
    ['Talep/İstem', petitionValues.request]
  ]);

  const htmlApplicant = buildHtmlRows([
    ['Ad Soyad', data.name],
    ['E-posta', data.email],
    ['Telefon', data.phone],
    ['KVKK', data.kvkk ? 'Onaylandı' : 'Onaylanmadı']
  ]);

  const htmlMessage = formatMultilineHtml(data.message || '-');

  const payload = {
    from: options.from,
    to: options.to,
    replyTo: data.email,
    subject: `[İletişim Formu] ${data.subject}`,
    text: textBody,
    html: `
      <div>
        <section>
          <h2 style="font-size:16px;margin-bottom:8px;">Dilekçe</h2>
          ${htmlPetition}
        </section>
        <hr style="margin:16px 0;border:none;border-top:1px solid #e5e5e5;" />
        <section>
          <h2 style="font-size:16px;margin-bottom:8px;">Başvuran Bilgileri</h2>
          ${htmlApplicant}
        </section>
        <hr style="margin:16px 0;border:none;border-top:1px solid #e5e5e5;" />
        <section>
          <h2 style="font-size:16px;margin-bottom:8px;">Mesaj</h2>
          <p style="margin:0;line-height:1.6;">${htmlMessage}</p>
        </section>
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
  const sanitize = (value?: string) => value?.toString().trim() ?? '';
  return {
    name: sanitize(data.name),
    email: sanitize(data.email),
    phone: sanitize(data.phone),
    subject: sanitize(data.subject),
    message: sanitize(data.message),
    kvkk: Boolean(data.kvkk),
    court: sanitize(data.court),
    lawArea: sanitize(data.lawArea),
    facts: sanitize(data.facts),
    request: sanitize(data.request)
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
      court: payload.court,
      lawArea: payload.lawArea,
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
