const CART_KEY = 'mb_cart'

interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface MenuItem {
  id: number
  name: string
  price: number
  imageUrl: string
  [key: string]: any
}

function dispatchCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }
}

export function getCart(): CartItem[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const cart = localStorage.getItem(CART_KEY)
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

export function addToCart(item: MenuItem, quantity: number = 1): void {
  const cart = getCart()
  const existingIndex = cart.findIndex(i => i.id === item.id)
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity = Math.min(10, cart[existingIndex].quantity + quantity)
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: Math.min(10, quantity)
    })
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  dispatchCartUpdate()
}

export function removeFromCart(itemId: number): void {
  const cart = getCart().filter(item => item.id !== itemId)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  dispatchCartUpdate()
}

export function updateCartQuantity(itemId: number, quantity: number): void {
  const cart = getCart()
  const item = cart.find(i => i.id === itemId)
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      item.quantity = Math.min(10, quantity)
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
      dispatchCartUpdate()
    }
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY)
  dispatchCartUpdate()
}

export function getCartTotal(): number {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartItemCount(): number {
  return getCart().reduce((count, item) => count + item.quantity, 0)
}

export function isInCart(itemId: number): boolean {
  return getCart().some(item => item.id === itemId)
}

export function getCartItemQuantity(itemId: number): number {
  const item = getCart().find(i => i.id === itemId)
  return item ? item.quantity : 0
}
