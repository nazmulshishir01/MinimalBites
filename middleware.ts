import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/items/add']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // Check for auth cookie
    const authCookie = request.cookies.get('mb_auth')
    
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Redirect logged-in users away from login page
  if (pathname === '/login') {
    const authCookie = request.cookies.get('mb_auth')
    if (authCookie && authCookie.value === 'true') {
      return NextResponse.redirect(new URL('/items', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/items/add', '/login']
}
