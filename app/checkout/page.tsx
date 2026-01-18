'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, User, MapPin, Phone, CreditCard, Lock, 
  CheckCircle, ShoppingBag, Truck, ShieldCheck 
} from 'lucide-react'
import { toast } from 'sonner'
import { getCart, clearCart, getCartTotal } from '@/lib/cart'

interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const items = getCart()
    if (items.length === 0 && !orderSuccess) {
      router.push('/cart')
    }
    setCartItems(items)
  }, [router, orderSuccess])

  const subtotal = getCartTotal()
  const deliveryFee = subtotal > 30 ? 0 : 4.99
  const total = subtotal + deliveryFee

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }))
    }
    // Format expiry date
    else if (name === 'cardExpiry') {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length >= 2) {
        setFormData(prev => ({ ...prev, [name]: cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) }))
      } else {
        setFormData(prev => ({ ...prev, [name]: cleaned }))
      }
    }
    // Format CVC
    else if (name === 'cardCvc') {
      setFormData(prev => ({ ...prev, [name]: value.slice(0, 3) }))
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter valid phone number'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Enter valid 16-digit card number'
    }
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required'
    else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Enter valid expiry (MM/YY)'
    }
    if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required'
    else if (formData.cardCvc.length < 3) {
      newErrors.cardCvc = 'Enter valid 3-digit CVC'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly')
      return
    }
    
    setLoading(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order ID
    const newOrderId = 'MB' + Date.now().toString().slice(-8)
    setOrderId(newOrderId)
    
    // Clear cart and show success
    clearCart()
    setOrderSuccess(true)
    toast.success('Order placed successfully! 🎉')
    
    setLoading(false)
  }

  // Order Success Screen
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-xl">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-dark mb-2">Order Successful!</h1>
          <p className="text-gray-500 mb-6">Thank you for your order</p>
          
          <div className="bg-cream rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-2xl font-bold text-primary">{orderId}</p>
          </div>
          
          <div className="space-y-3 text-left bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-gray-600">
              <User className="w-5 h-5 text-primary" />
              <span>{formData.name}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-primary" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{formData.address}, {formData.city}</span>
            </div>
          </div>
          
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-bold text-dark">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            🚚 Estimated delivery: 30-45 minutes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/items" className="btn-outline flex-1 justify-center">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-primary flex-1 justify-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark text-white py-8">
        <div className="container-custom">
          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold">Checkout</h1>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-primary" />
                  Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`input-field pl-12 ${errors.name ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className={`input-field pl-12 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Delivery Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House/Flat, Road, Area"
                        rows={2}
                        className={`input-field pl-12 resize-none ${errors.address ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Payment Information
                </h2>
                
                {/* Demo Card Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm font-medium text-blue-800 mb-2">💳 Demo Card for Testing:</p>
                  <p className="text-sm text-blue-700">Card: <span className="font-mono">4242 4242 4242 4242</span></p>
                  <p className="text-sm text-blue-700">Expiry: <span className="font-mono">12/25</span> | CVC: <span className="font-mono">123</span></p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Card Number *</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`input-field pl-12 font-mono ${errors.cardNumber ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`input-field font-mono ${errors.cardExpiry ? 'border-red-500' : ''}`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">CVC *</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={3}
                          className={`input-field pl-12 font-mono ${errors.cardCvc ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.cardCvc && <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Your payment information is secure and encrypted
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  Order Summary
                </h2>
                
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-dark text-sm truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                      <p className="font-semibold text-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-dark pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      <Lock className="w-5 h-5" />
                      Pay ${total.toFixed(2)}
                    </span>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
