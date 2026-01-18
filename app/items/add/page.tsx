'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, X, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { isAuthenticated } from '@/lib/auth'

const sampleImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500',
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
  'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=500',
]

export default function AddItemPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'burgers',
    imageUrl: '',
    preparationTime: '',
    calories: '',
    isPopular: false,
    isNew: true,
  })
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login?next=/items/add')
    }
  }, [router])

  const categories = ['burgers', 'pizza', 'drinks', 'desserts', 'salads', 'sides']

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required'
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          calories: formData.calories ? parseInt(formData.calories) : undefined,
          ingredients: ingredients.length > 0 ? ingredients : undefined,
          rating: 4.5,
          reviews: 0,
        }),
      })

      if (!response.ok) throw new Error('Failed to add item')

      toast.success('Item added successfully!')
      router.push('/items')
    } catch (error) {
      toast.error('Failed to add item. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient('')
    }
  }

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing))
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-dark text-white py-12">
        <div className="container-custom">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-display font-bold">Add New Item</h1>
          <p className="text-gray-400 mt-2">Create a new menu item for your restaurant</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* Image Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-dark mb-3">Item Image *</label>
              {formData.imageUrl ? (
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setShowGallery(true)}
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-500">Click to select an image</p>
                </div>
              )}
              {errors.imageUrl && <p className="text-red-500 text-sm mt-2">{errors.imageUrl}</p>}
              
              {/* Image Gallery Modal */}
              {showGallery && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Select Image</h3>
                      <button onClick={() => setShowGallery(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {sampleImages.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setFormData({ ...formData, imageUrl: img })
                            setShowGallery(false)
                          }}
                          className="relative h-32 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary"
                        >
                          <Image src={img} alt={`Sample ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Or enter custom URL:</p>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://..."
                          className="input-field flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              const url = (e.target as HTMLInputElement).value
                              if (url) {
                                setFormData({ ...formData, imageUrl: url })
                                setShowGallery(false)
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = (e.currentTarget.previousSibling as HTMLInputElement)
                            if (input.value) {
                              setFormData({ ...formData, imageUrl: input.value })
                              setShowGallery(false)
                            }
                          }}
                          className="btn-primary"
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Classic Cheeseburger"
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item..."
                rows={3}
                className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="9.99"
                  step="0.01"
                  min="0"
                  className={`input-field ${errors.price ? 'border-red-500' : ''}`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Prep Time</label>
                <input
                  type="text"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  placeholder="e.g., 15-20 min"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  placeholder="e.g., 450"
                  min="0"
                  className="input-field"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">Ingredients</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                  placeholder="Add an ingredient"
                  className="input-field flex-1"
                />
                <button type="button" onClick={addIngredient} className="btn-outline px-4">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {ing}
                      <button type="button" onClick={() => removeIngredient(ing)} className="hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Flags */}
            <div className="flex gap-6 mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Mark as Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Mark as New</span>
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Link href="/items" className="btn-outline flex-1 justify-center">
                Cancel
              </Link>
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
