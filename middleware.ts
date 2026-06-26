import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/courses',
  '/books',
  '/contact',
  '/verify',
  '/privacy-policy',
  '/login',
  '/register',
]

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({ request })

  // Attach Supabase client — also refreshes session tokens via cookie setAll
  const supabase = createMiddlewareClient(request, response)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Parse guest cookie
  const guestCookie = request.cookies.get('guest_user')
  let guestData: { displayName: string; type: 'guest' } | null = null
  try {
    guestData = guestCookie ? JSON.parse(guestCookie.value) : null
  } catch {
    guestData = null
  }

  const isAuthenticated = !!user
  const isGuest = guestData?.type === 'guest'

  // --- /login: redirect if already authenticated ---
  if (pathname === '/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/paid-professional', request.url))
    }
    if (isGuest) {
      return NextResponse.redirect(new URL('/free-cohort', request.url))
    }
    return response
  }

  // --- Public marketing routes: pass through ---
  if (isPublicRoute(pathname)) {
    return response
  }

  // --- /admin: requires session + admin role ---
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (user?.app_metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/paid-professional', request.url))
    }
    return response
  }

  // --- /paid-professional: requires Supabase session ---
  if (pathname.startsWith('/paid-professional')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  // --- /labs: requires guest cookie OR pro session ---
  if (pathname.startsWith('/labs')) {
    if (!isAuthenticated && !isGuest) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  // --- /free-cohort: requires guest cookie; pro users get bumped up ---
  if (pathname.startsWith('/free-cohort')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/paid-professional', request.url))
    }
    if (!isGuest) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icons/|manifest\\.json|sw\\.js|workbox-).*)',
  ],
}
