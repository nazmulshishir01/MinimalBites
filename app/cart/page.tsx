'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { getCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } from '@/lib/cart'

interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCartItems(getCart())
    setLoading(false)

    const handleCartUpdate = () => setCartItems(getCart())
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateCartQuantity(id, quantity)
    setCartItems(getCart())
  }

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id)
    setCartItems(getCart())
    toast.success(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    setCartItems([])
    setDiscount(0)
    toast.success('Cart cleared')
  }

  const applyPromoCode = () => {
    const codes: Record<string, number> = {
      'SAVE10': 10,
      'SAVE20': 20,
    }
    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()])
      toast.success(`${promoCode.toUpperCase()} applied! ${codes[promoCode.toUpperCase()]}% off`)
    } else {
      toast.error('Invalid promo code')
    }
  }

  const handleCheckout = () => {
    clearCart()
    setCartItems([])
    setDiscount(0)
    toast.success('Order placed successfully! 🎉')
  }

  const subtotal = getCartTotal()
  const discountAmount = (subtotal * discount) / 100
  const deliveryFee = subtotal > 30 ? 0 : 4.99
  const total = subtotal - discountAmount + deliveryFee

  if (loading) {
    return (
      <div className="min-h-screen bg-cream section-padding">
        <div className="container-custom">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-dark mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet</p>
          <Link href="/items" className="btn-primary">
            Browse Menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Your Cart</h1>
          <p className="text-gray-400 mt-2">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="card p-4 sm:p-6 flex gap-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/items/${item.id}`} className="font-bold text-dark hover:text-primary text-lg">
                      {item.name}
                    </Link>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-primary font-semibold mb-4">${item.price.toFixed(2)} each</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-bold text-dark text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleClearCart}
              className="text-gray-500 hover:text-red-500 font-medium flex items-center gap-2 mt-4"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-dark mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="input-field pl-10"
                    />
                  </div>
                  <button onClick={applyPromoCode} className="btn-outline px-4">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Try: SAVE10 or SAVE20</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-dark">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleCheckout} className="btn-primary w-full py-4 text-lg mb-4">
                Checkout <ArrowRight className="w-5 h-5" />
              </button>

              <Link href="/items" className="block text-center text-primary font-medium hover:underline">
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free delivery over $30</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
