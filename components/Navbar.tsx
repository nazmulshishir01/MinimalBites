'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChefHat, Menu, X, ShoppingCart, User, LogOut, Plus } from 'lucide-react'
import { isAuthenticated, logout, getCurrentUser } from '@/lib/auth'
import { getCartItemCount } from '@/lib/cart'
import { toast } from 'sonner'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
    setUser(getCurrentUser())
    setCartCount(getCartItemCount())

    const handleCartUpdate = () => setCartCount(getCartItemCount())
    window.addEventListener('cartUpdated', handleCartUpdate)

    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUser(null)
    toast.success('Logged out successfully')
    window.location.href = '/'
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Menu' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-display font-bold text-dark">
            <ChefHat className="w-8 h-8 text-primary" />
            <span>MinimalBites</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname === link.href ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                href="/items/add"
                className={`font-medium transition-colors flex items-center gap-1 ${
                  pathname === '/items/add' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-5 h-5" />
                    <span>{user?.name || 'Admin'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn-primary py-2 px-5">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-4 animate-slideIn">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-2 transition-colors ${
                    pathname === link.href ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  href="/items/add"
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-2 transition-colors flex items-center gap-2 ${
                    pathname === '/items/add' ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Link>
              )}
              <div className="border-t pt-4 mt-2">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-5 h-5" />
                      <span>{user?.name || 'Admin'}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
