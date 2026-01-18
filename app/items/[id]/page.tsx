'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Clock, ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, ChefHat } from 'lucide-react'
import { toast } from 'sonner'
import { addToCart } from '@/lib/cart'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  rating: number
  reviews?: number
  preparationTime?: string
  calories?: number
  ingredients?: string[]
  isPopular?: boolean
  isNew?: boolean
}

export default function ItemDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<MenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([])
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (params.id) {
      // Fetch item details
      fetch(`/api/items/${params.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Item not found')
          return res.json()
        })
        .then(data => {
          setItem(data)
          // Fetch related items from same category
          return fetch('/api/items')
        })
        .then(res => res.json())
        .then(allItems => {
          if (item) {
            const related = allItems
              .filter((i: MenuItem) => i.category === item.category && i.id !== item.id)
              .slice(0, 4)
            setRelatedItems(related)
          }
          setLoading(false)
        })
        .catch(() => {
          setItem(null)
          setLoading(false)
        })
    }
  }, [params.id])

  // Fetch related items when item loads
  useEffect(() => {
    if (item) {
      fetch('/api/items')
        .then(res => res.json())
        .then(allItems => {
          const related = allItems
            .filter((i: MenuItem) => i.category === item.category && i.id !== item.id)
            .slice(0, 4)
          setRelatedItems(related)
        })
        .catch(() => setRelatedItems([]))
    }
  }, [item])

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity)
      toast.success(`${quantity}x ${item.name} added to cart!`)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream section-padding">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-3xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-dark mb-4">Item not found</h2>
          <p className="text-gray-500 mb-6">The item you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/items" className="btn-primary">
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/items" className="text-gray-500 hover:text-primary">Menu</Link>
            <span className="text-gray-300">/</span>
            <span className="text-dark font-medium">{item.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
              {item.isPopular && (
                <span className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-medium">
                  🔥 Popular
                </span>
              )}
              {item.isNew && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-medium">
                  New
                </span>
              )}
            </div>
            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full shadow-lg transition-colors ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {item.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{item.rating}</span>
                {item.reviews && <span className="text-gray-400">({item.reviews} reviews)</span>}
              </div>
            </div>

            <h1 className="text-4xl font-display font-bold text-dark mb-4">{item.name}</h1>

            {/* Quick Info */}
            <div className="flex items-center gap-6 mb-6 text-gray-600">
              {item.preparationTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{item.preparationTime}</span>
                </div>
              )}
              {item.calories && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span>{item.calories} cal</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-8">{item.description}</p>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex gap-8">
                {['description', 'ingredients'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'description' && (
                <p className="text-gray-600">{item.description}</p>
              )}
              {activeTab === 'ingredients' && (
                <div>
                  {item.ingredients && item.ingredients.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-2">
                      {item.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Ingredients list not available.</p>
                  )}
                </div>
              )}
            </div>

            {/* Price & Cart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">Quantity</p>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-dark">${(item.price * quantity).toFixed(2)}</p>
                </div>
                <button onClick={handleAddToCart} className="btn-primary flex-1 max-w-xs py-4">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-dark mb-8">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relItem) => (
                <Link key={relItem.id} href={`/items/${relItem.id}`} className="card overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={relItem.imageUrl}
                      alt={relItem.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark mb-1">{relItem.name}</h3>
                    <p className="text-primary font-bold">${relItem.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
