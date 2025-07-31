import type {  NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(
  request: NextRequest,
  // event: NextFetchEvent,
) {
  // Verify the request with Arcjet
  // Use `process.env` instead of Env to reduce bundle size in middleware
 
  // Handle i18n routing first
  const response = handleI18nRouting(request);
  
  // Add pathname to headers for server components
  if (response) {
    response.headers.set('x-pathname', request.nextUrl.pathname);
    return response;
  }
  
  // If no response from i18n routing, create a new response with pathname header
  const nextResponse = NextResponse.next();
  nextResponse.headers.set('x-pathname', request.nextUrl.pathname);
  return nextResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};