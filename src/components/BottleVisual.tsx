import { Sparkles } from 'lucide-react'
import type { Product } from '../data/products'

export function BottleVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-visual tone-${product.tone} format-${product.format} ${large ? 'product-visual-large' : ''}`} aria-label={`Visual conceptual de ${product.name}`}>
      <span className="visual-orbit orbit-one" />
      <span className="visual-orbit orbit-two" />
      <div className="bottle-shadow" />
      <div className="bottle">
        {product.format === 'dropper' && <div className="dropper-cap"><span /></div>}
        {product.format === 'tube' && <div className="tube-cap" />}
        {product.format === 'jar' && <div className="jar-lid" />}
        <div className="bottle-body">
          <span className="bottle-line" />
          <span className="bottle-name">hydross.</span>
          <span className="bottle-type">{product.category.toUpperCase()}</span>
          <span className="bottle-dot"><Sparkles size={11} strokeWidth={1.5} /></span>
        </div>
      </div>
      <span className="visual-number">{product.id}</span>
    </div>
  )
}
