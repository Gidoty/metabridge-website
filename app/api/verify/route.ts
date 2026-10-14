import { NextRequest, NextResponse } from 'next/server';

const CERT_APP_API = 'https://cert-ashen.vercel.app/api/verify';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ found: false, error: 'Missing code' }, { status: 400 });
  }

  try {
    // Server-side proxy to cert app — avoids browser CORS/SSO issues
    const res = await fetch(`${CERT_APP_API}?code=${encodeURIComponent(code)}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ found: false, error: 'Verification service unavailable' }, { status: 502 });
  }
}
