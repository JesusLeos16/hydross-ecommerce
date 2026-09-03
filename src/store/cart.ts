import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../data/products'

export type CartLine = { product: Product; quantity: number }

type CartState = {
  items: CartLine[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  itemCount: () => number
  subtotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => {
        const existing = state.items.find((line) => line.product.id === product.id)
        if (existing) return { items: state.items.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) }
        return { items: [...state.items, { product, quantity: 1 }] }
      }),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((line) => line.product.id !== productId) })),
      updateQuantity: (productId, quantity) => set((state) => ({ items: quantity <= 0 ? state.items.filter((line) => line.product.id !== productId) : state.items.map((line) => line.product.id === productId ? { ...line, quantity } : line) })),
      clear: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: () => get().items.reduce((sum, line) => sum + line.product.priceMXN * line.quantity, 0),
    }),
    { name: 'hydross-cart-v1', version: 1 },
  ),
)
