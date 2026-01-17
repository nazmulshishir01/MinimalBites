// Mock credentials
const MOCK_EMAIL = 'admin@minimalbites.com'
const MOCK_PASSWORD = '123456'
const COOKIE_NAME = 'mb_auth'
const USER_COOKIE = 'mb_user'

export function login(email: string, password: string): boolean {
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    // Set cookies (client-side)
    const expires = new Date()
    expires.setDate(expires.getDate() + 1) // 1 day
    
    document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/`
    document.cookie = `${USER_COOKIE}=${encodeURIComponent(JSON.stringify({ 
      email, 
      name: 'Admin User',
      role: 'admin' 
    }))}; expires=${expires.toUTCString()}; path=/`
    
    return true
  }
  return false
}

export function logout(): void {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  document.cookie = `${USER_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.includes(`${COOKIE_NAME}=true`)
}

export function getCurrentUser(): { email: string; name: string; role: string } | null {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const userCookie = cookies.find(c => c.trim().startsWith(`${USER_COOKIE}=`))
  
  if (userCookie) {
    try {
      const value = userCookie.split('=')[1]
      return JSON.parse(decodeURIComponent(value))
    } catch {
      return null
    }
  }
  return null
}

export function getAuthToken(): string | null {
  return isAuthenticated() ? 'mock-token' : null
}
