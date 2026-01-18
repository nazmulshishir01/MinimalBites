'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Leaf, Truck, ShieldCheck, Star, Clock, ArrowRight, 
  ChefHat, Mail, Quote, Utensils, Coffee, Pizza, IceCream
} from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  rating: number
  isPopular?: boolean
}

export default function HomePage() {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([])
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        const popular = data.filter((item: MenuItem) => item.isPopular).slice(0, 4)
        setPopularItems(popular.length > 0 ? popular : data.slice(0, 4))
      })
      .catch(() => setPopularItems([]))
  }, [])

  const features = [
    { icon: Leaf, title: 'Fresh Ingredients', desc: 'Locally sourced, organic produce for every dish' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Hot food at your door in 30 minutes or less' },
    { icon: ShieldCheck, title: 'Hygienic Kitchen', desc: 'Certified clean with daily health inspections' },
  ]

  const categories = [
    { name: 'Burgers', icon: Utensils, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
    { name: 'Pizza', icon: Pizza, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { name: 'Drinks', icon: Coffee, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400' },
    { name: 'Desserts', icon: IceCream, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400' },
  ]

  const steps = [
    { num: '01', title: 'Browse Menu', desc: 'Explore our delicious menu items' },
    { num: '02', title: 'Choose & Order', desc: 'Select your favorites and checkout' },
    { num: '03', title: 'Enjoy!', desc: 'Receive fresh food at your doorstep' },
  ]

  const testimonials = [
    { name: 'Sarah M.', text: 'Best food delivery service ever! Always fresh and on time.', rating: 5 },
    { name: 'John D.', text: 'The burger was absolutely amazing. Will order again!', rating: 5 },
    { name: 'Emily R.', text: 'Love the variety and quality. My family\'s favorite!', rating: 5 },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream to-cream-dark min-h-[90vh] flex items-center">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                🍽️ #1 Food Delivery App
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-dark leading-tight mb-6">
                Fresh food,<br />
                <span className="text-primary">minimal</span> fuss.
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Discover the joy of delicious meals delivered right to your doorstep. 
                Fresh ingredients, amazing taste, unbeatable convenience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/items" className="btn-primary text-lg">
                  View Menu <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/items" className="btn-outline text-lg">
                  Order Now
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10">
                <div>
                  <p className="text-3xl font-bold text-dark">50K+</p>
                  <p className="text-gray-500">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <p className="text-3xl font-bold text-dark">100+</p>
                  <p className="text-gray-500">Menu Items</p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <p className="text-3xl font-bold text-dark">4.9</p>
                  <p className="text-gray-500">App Rating</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600"
                  alt="Delicious Food"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Fast Delivery</p>
                    <p className="text-sm text-gray-500">30 min average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">Why Choose Us</span>
            <h2 className="text-4xl font-display font-bold text-dark mt-2">Our Highlights</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card p-8 text-center hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">Taste the Best</span>
              <h2 className="text-4xl font-display font-bold text-dark mt-2">Popular Dishes</h2>
            </div>
            <Link href="/items" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <Link key={item.id} href={`/items/${item.id}`} className="card overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isPopular && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <h3 className="font-bold text-dark mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/items" className="md:hidden btn-primary mt-8 mx-auto">
            View All Menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">Explore</span>
            <h2 className="text-4xl font-display font-bold text-dark mt-2">Food Categories</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                href={`/items?category=${cat.name.toLowerCase()}`}
                className="relative h-64 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <cat.icon className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-dark text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">Simple Process</span>
            <h2 className="text-4xl font-display font-bold mt-2">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-4xl font-display font-bold text-dark mt-2">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-8">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-gray-600 mb-6">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-dark">{t.name}</p>
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <Mail className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold text-white mb-4">Get Weekly Offers</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter and receive exclusive deals, new menu updates, and special discounts.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); setEmail(''); alert('Thanks for subscribing!'); }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-dark focus:outline-none"
              required
            />
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
