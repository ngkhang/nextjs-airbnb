import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken, getSession } from './lib/session';
import { KEYS } from './utils/constants/env';

// 1. Specify protected and public routes
const protectedRoutes = ['/profile'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const session = (await getSession(KEYS.SESSION))?.value;
  const userInfo = session ? await decodeToken(session) : null;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userInfo) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 5. Redirect to /profile if the user is authenticated
  if (isPublicRoute && userInfo?.id) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl));
  }

  // 4. Create a new response with headers
  const response = NextResponse.next();
  if (session) response.headers.set(KEYS.TOKEN, session);
  return response;
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
