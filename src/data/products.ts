export type ProductCategory = 'Limpieza' | 'Sérums' | 'Hidratación' | 'Protección'

export type Product = {
  id: string
  slug: string
  name: string
  category: ProductCategory
  priceMXN: number
  priceLabel: 'sample'
  size: string
  description: string
  isDemo: true
  tone: 'rose' | 'pearl' | 'berry' | 'gold'
  format: 'bottle' | 'dropper' | 'tube' | 'jar'
  featured?: boolean
}

export const products: Product[] = [
  { id: '01', slug: 'gel-de-agua', name: 'Gel de Agua', category: 'Limpieza', priceMXN: 389, priceLabel: 'sample', size: '150 ml', description: 'Concepto de limpiador en gel para una primera colección de cuidado facial.', isDemo: true, tone: 'pearl', format: 'bottle', featured: true },
  { id: '02', slug: 'serum-luz', name: 'Sérum Luz', category: 'Sérums', priceMXN: 549, priceLabel: 'sample', size: '30 ml', description: 'Concepto de sérum ligero para explorar la categoría de tratamientos.', isDemo: true, tone: 'rose', format: 'dropper', featured: true },
  { id: '03', slug: 'crema-nube', name: 'Crema Nube', category: 'Hidratación', priceMXN: 479, priceLabel: 'sample', size: '50 g', description: 'Concepto de crema facial para la primera selección de Hydross.', isDemo: true, tone: 'pearl', format: 'jar', featured: true },
  { id: '04', slug: 'aceite-noche', name: 'Aceite Noche', category: 'Sérums', priceMXN: 599, priceLabel: 'sample', size: '30 ml', description: 'Concepto de aceite facial para ampliar la categoría de tratamientos.', isDemo: true, tone: 'berry', format: 'dropper' },
  { id: '05', slug: 'balsamo-labios', name: 'Bálsamo Beso', category: 'Hidratación', priceMXN: 229, priceLabel: 'sample', size: '12 g', description: 'Concepto de bálsamo para labios dentro de la colección visual.', isDemo: true, tone: 'rose', format: 'tube' },
  { id: '06', slug: 'protector-diario', name: 'Protector Diario', category: 'Protección', priceMXN: 529, priceLabel: 'sample', size: '50 ml', description: 'Concepto de producto para explorar la categoría de protección.', isDemo: true, tone: 'gold', format: 'tube' },
  { id: '07', slug: 'mascarilla-miel', name: 'Mascarilla Miel', category: 'Hidratación', priceMXN: 429, priceLabel: 'sample', size: '75 g', description: 'Concepto de mascarilla para ampliar la selección de hidratación.', isDemo: true, tone: 'gold', format: 'jar' },
  { id: '08', slug: 'tonico-bruma', name: 'Bruma Rocío', category: 'Hidratación', priceMXN: 319, priceLabel: 'sample', size: '100 ml', description: 'Concepto de bruma facial para la primera colección de Hydross.', isDemo: true, tone: 'pearl', format: 'bottle' },
  { id: '09', slug: 'limpiador-balsamo', name: 'Bálsamo Cero', category: 'Limpieza', priceMXN: 449, priceLabel: 'sample', size: '80 g', description: 'Concepto de bálsamo limpiador para explorar otra textura.', isDemo: true, tone: 'berry', format: 'jar' },
]

export const categories: Array<{ label: string; value: ProductCategory | 'Todos' }> = [
  { label: 'Todo', value: 'Todos' },
  { label: 'Limpieza', value: 'Limpieza' },
  { label: 'Sérums', value: 'Sérums' },
  { label: 'Hidratación', value: 'Hidratación' },
  { label: 'Protección', value: 'Protección' },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value)
}
