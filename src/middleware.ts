import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/products', '/profile', '/dashboard'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};