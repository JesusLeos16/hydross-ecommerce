import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'
import { useCart } from '../store/cart'
import { BottleVisual } from './BottleVisual'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-image-link">
        <BottleVisual product={product} />
        <span className="product-arrow"><ArrowUpRight size={16} /></span>
      </Link>
      <div className="product-card-copy">
        <div><p className="eyebrow">{product.category} · {product.size}</p><Link to={`/product/${product.slug}`} className="product-name">{product.name}</Link></div>
        <div className="product-buy"><span><small>Precio de muestra</small>{formatPrice(product.priceMXN)}</span><button onClick={() => addItem(product)} aria-label={`Agregar ${product.name} al carrito`}><Plus size={17} /></button></div>
      </div>
    </article>
  )
}
