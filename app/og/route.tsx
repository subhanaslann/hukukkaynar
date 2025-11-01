import { ImageResponse } from 'next/server';

const OG_SIZE = { width: 1200, height: 630 } as const;
const OG_CONTENT_TYPE = 'image/png';

export const runtime = 'edge';
export const contentType = OG_CONTENT_TYPE as unknown as never;
export const size = OG_SIZE as unknown as never;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || 'Kaynar Hukuk Bürosu').slice(0, 80);
  const logoUrl = new URL('/logo.svg', req.url).toString();

  return new (ImageResponse as any)(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'linear-gradient(120deg,#0f1216,#051D40,#0f1216)',
          color: 'white',
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -1
        }}
      >
        <img
          src={logoUrl}
          width={200}
          height={200}
          alt="Kaynar Hukuk Bürosu logosu"
          style={{ position: 'absolute', top: 48, left: 48, width: 200, height: 'auto' }}
        />
        {title}
      </div>
    ),
    { ...OG_SIZE, headers: { 'Content-Type': OG_CONTENT_TYPE } }
  );
}
