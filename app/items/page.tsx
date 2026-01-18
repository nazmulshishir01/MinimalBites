'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Star, Clock, ShoppingCart, X, ChevronDown } from 'lucide-react'
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
  isPopular?: boolean
  isNew?: boolean
}

export default function ItemsPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const categories = ['all', 'burgers', 'pizza', 'drinks', 'desserts', 'salads', 'sides']

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setFilteredItems(data)
        setLoading(false)
      })
      .catch(() => {
        setItems([])
        setFilteredItems([])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let result = [...items]

    // Filter by search
    if (searchQuery) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item =>
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredItems(result)
  }, [items, searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
    toast.success(`${item.name} added to cart!`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSortBy('default')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Menu</h1>
          <p className="text-gray-400 max-w-2xl">
            Explore our delicious selection of fresh, handcrafted dishes. From classic burgers to refreshing drinks.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pr-10 appearance-none cursor-pointer min-w-[150px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field pr-10 appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto py-4 -mx-4 px-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-custom section-padding">
        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-dark">{filteredItems.length}</span> items
          </p>
          {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default') && (
            <button
              onClick={clearFilters}
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card overflow-hidden group">
                <Link href={`/items/${item.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.isPopular && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        🔥 Popular
                      </span>
                    )}
                    {item.isNew && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{item.rating}</span>
                      {item.reviews && <span className="text-gray-400">({item.reviews})</span>}
                    </div>
                  </div>
                  <Link href={`/items/${item.id}`}>
                    <h3 className="font-bold text-dark text-lg mb-1 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                  {item.preparationTime && (
                    <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                      <Clock className="w-4 h-4" />
                      {item.preparationTime}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-3 bg-dark text-white rounded-full hover:bg-primary transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No items found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
