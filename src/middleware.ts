import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Allow access to the login page
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // Update the user's auth session
  const response = await updateSession(request);

  // If `updateSession` redirects or handles authentication, return that response
  if (response) {
    return response;
  }

  // If not authenticated and trying to access any route other than login
  if (!response?.authenticated) {
    // Redirect to login page
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continue to the requested route if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
