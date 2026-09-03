import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, Minus, Plus, Search, Sparkles } from 'lucide-react'
import { Link, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BottleVisual } from './components/BottleVisual'
import { Footer } from './components/Footer'
import { ProductCard } from './components/ProductCard'
import { SiteHeader } from './components/SiteHeader'
import { brandCopy } from './content/brandCopy'
import { categories, formatPrice, getProduct, products, type ProductCategory } from './data/products'
import { useCart, type CartLine } from './store/cart'

type SortOption = 'original' | 'price-asc' | 'price-desc'
type DemoOrder = { id: string; items: CartLine[]; subtotal: number; total: number; mode: 'demo' }

const metaByRoute: Record<string, { title: string; description: string }> = {
  '/': { title: 'hydross. skincare', description: 'Hydross skincare: una selección de conceptos para cuidado facial.' },
  '/shop': { title: 'Tienda · hydross.', description: 'Explora la colección de conceptos de Hydross.' },
  '/find': { title: 'Encuentra lo que necesitas · hydross.', description: 'Una selección guiada para explorar las categorías de Hydross.' },
  '/cart': { title: 'Selección · hydross.', description: 'Revisa los conceptos que elegiste en Hydross.' },
  '/checkout': { title: 'Compra de muestra · hydross.', description: 'Revisa una demostración del flujo de compra de Hydross.' },
}

function splitLines(value: string) {
  return value.split('\n').map((line) => <span key={line}>{line}<br /></span>)
}

function SectionTitle({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return <div className={`section-title align-${align}`}><p className="eyebrow">{eyebrow}</p><h2>{splitLines(title)}</h2>{copy && <p className="section-copy">{copy}</p>}</div>
}

function DocumentMeta() {
  const location = useLocation()
  useEffect(() => {
    const productSlug = location.pathname.startsWith('/product/') ? location.pathname.split('/').pop() : undefined
    const product = productSlug ? getProduct(productSlug) : undefined
    const meta = product ? { title: `${product.name} · hydross.`, description: `${product.name}: concepto de ${product.category.toLowerCase()} para la colección de Hydross.` } : metaByRoute[location.pathname] ?? { title: 'hydross. skincare', description: 'Hydross skincare: una selección de conceptos para cuidado facial.' }
    document.title = meta.title
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description) }
    description.content = meta.description
  }, [location.pathname])
  return null
}

function ScrollToLocation() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.requestAnimationFrame(() => target ? target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' }) : window.scrollTo({ top: 0, behavior: 'auto' }))
  }, [pathname, hash])
  return null
}

function Home() {
  const featured = products.filter((product) => product.featured)
  return <>
    <main>
      <section className="hero section-dark"><div className="hero-grain" /><div className="hero-copy"><p className="eyebrow hero-eyebrow">{brandCopy.home.eyebrow}</p><h1>{splitLines(brandCopy.home.title)}</h1><p className="hero-text">{brandCopy.home.description}</p><Link className="button button-pink" to="/shop">{brandCopy.home.cta} <ArrowRight size={16} /></Link></div><div className="hero-stage"><div className="hero-sun" /><div className="hero-bottle hero-bottle-back"><BottleVisual product={products[2]} large /></div><div className="hero-bottle hero-bottle-front"><BottleVisual product={products[1]} large /></div><div className="hero-caption"><span>01 — {String(products.length).padStart(2, '0')}</span><span>colección inicial</span></div></div><div className="hero-scroll"><ArrowDown size={14} /> explorar</div></section>
      <nav className="marquee category-marquee" aria-label="Categorías de producto">{categories.slice(1).map((category) => <Link key={category.value} to={`/shop?category=${encodeURIComponent(category.value)}`}>{category.label}<span>✦</span></Link>)}</nav>
      <section className="intro section-pad"><div className="intro-number">01<span>/04</span></div><div className="intro-copy"><p className="eyebrow">{brandCopy.home.introEyebrow}</p><h2>{splitLines(brandCopy.home.introTitle)}</h2></div><div className="intro-body"><p>{brandCopy.home.introDescription}</p><Link className="text-link" to="/#essence">{brandCopy.navigation.essence} <ArrowRight size={15} /></Link></div></section>
      <section className="shop-preview section-pad"><div className="section-heading-row"><SectionTitle eyebrow={brandCopy.home.collectionEyebrow} title={brandCopy.home.collectionTitle} copy={brandCopy.home.collectionDescription} /><Link className="text-link hide-mobile" to="/shop">Ver la colección <ArrowRight size={15} /></Link></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div><Link className="text-link mobile-only" to="/shop">Ver la colección <ArrowRight size={15} /></Link></section>
      <section id="essence" className="essence-section section-dark"><div className="essence-visual"><div className="essence-ring ring-one" /><div className="essence-ring ring-two" /><div className="essence-orb"><span>h.</span></div><span className="essence-caption">hydross<br />skincare</span></div><div className="essence-copy"><p className="eyebrow">{brandCopy.home.essenceEyebrow}</p><h2>{splitLines(brandCopy.home.essenceTitle)}</h2><p>{brandCopy.home.essenceDescription}</p><Link className="button button-outline" to="/find">{brandCopy.navigation.finder} <ArrowRight size={16} /></Link></div></section>
      <section className="concerns section-pad"><SectionTitle eyebrow={brandCopy.home.concernsEyebrow} title={brandCopy.home.concernsTitle} copy={brandCopy.home.concernsDescription} align="center" /><div className="concern-grid"><Link to="/shop?category=Hidratación" className="concern-card concern-pink"><span>01</span><h3>Explorar<br /><em>hidratación</em></h3><ArrowUpRight /></Link><Link to="/shop?category=Sérums" className="concern-card concern-cream"><span>02</span><h3>Explorar<br /><em>sérums</em></h3><ArrowUpRight /></Link><Link to="/shop?category=Limpieza" className="concern-card concern-black"><span>03</span><h3>Explorar<br /><em>limpieza</em></h3><ArrowUpRight /></Link></div></section>
      <section className="ritual-teaser section-pad"><div className="ritual-teaser-copy"><p className="eyebrow">{brandCopy.home.finderEyebrow}</p><h2>{splitLines(brandCopy.home.finderTitle)}</h2><p>{brandCopy.home.finderDescription}</p><Link className="button button-dark" to="/find">{brandCopy.home.finderCta} <ArrowRight size={16} /></Link></div><div className="ritual-stack"><div className="stack-card stack-back"><span>lo que buscas</span><strong>elige</strong></div><div className="stack-card stack-front"><span>hydross / selección</span><strong>empieza</strong><Sparkles /></div></div></section>
      <section className="quote-section section-dark"><p className="quote-mark">h.</p><blockquote>{splitLines(brandCopy.home.editorialTitle)}</blockquote><p className="quote-by">{brandCopy.home.editorialDescription}</p></section>
    </main><Footer />
  </>
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const category = searchParams.get('category') ?? 'Todos'
  const query = searchParams.get('q') ?? ''
  const sort = (searchParams.get('sort') as SortOption | null) ?? 'original'
  const focusSearch = searchParams.get('focus') === 'search'
  useEffect(() => { if (focusSearch) window.requestAnimationFrame(() => searchInputRef.current?.focus()) }, [focusSearch])
  const updateParams = (updates: Record<string, string | null>) => { setSearchParams((current) => { const next = new URLSearchParams(current); Object.entries(updates).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key)); next.delete('focus'); return next }) }
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matching = products.filter((product) => (category === 'Todos' || product.category === category) && (!normalizedQuery || `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)))
    if (sort === 'price-asc') return [...matching].sort((a, b) => a.priceMXN - b.priceMXN)
    if (sort === 'price-desc') return [...matching].sort((a, b) => b.priceMXN - a.priceMXN)
    return matching
  }, [category, query, sort])
  const hasFilters = category !== 'Todos' || Boolean(query)
  return <><main className="shop-page"><section className="shop-hero section-dark"><div><p className="eyebrow">Hydross skincare</p><h1>Explora la<br /><em>colección.</em></h1></div><p>Una primera selección de conceptos para definir la dirección de Hydross.</p></section><section className="catalog section-pad"><div className="catalog-toolbar"><div className="category-tabs" role="group" aria-label="Filtrar por categoría">{categories.map((item) => <button key={item.value} className={category === item.value ? 'active' : ''} aria-pressed={category === item.value} onClick={() => updateParams({ category: item.value === 'Todos' ? null : item.value })}>{item.label}</button>)}</div><label className="catalog-search"><Search size={14} aria-hidden="true" /> Buscar <input ref={searchInputRef} id="catalog-search" value={query} onChange={(event) => updateParams({ q: event.target.value || null })} placeholder="nombre o categoría" /></label></div><div className="catalog-result-row"><div><span>{filtered.length} conceptos</span>{hasFilters && <button className="active-filter" onClick={() => updateParams({ category: null, q: null, sort: null })}>Quitar filtros</button>}</div><label className="sort-control">Ordenar por<select aria-label="Ordenar productos" value={sort} onChange={(event) => updateParams({ sort: event.target.value })}><option value="original">Orden original</option><option value="price-asc">Precio menor</option><option value="price-desc">Precio mayor</option></select></label></div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><p className="eyebrow">Sin coincidencias</p><h2>No encontramos ese concepto.</h2><p>Prueba con otra palabra o retira los filtros activos.</p><button className="button button-dark" onClick={() => updateParams({ category: null, q: null, sort: null })}>Ver todo</button></div>}</section></main><Footer /></>
}

function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  const addItem = useCart((state) => state.addItem)
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [open, setOpen] = useState('about')
  if (!product) return <NotFound />
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3)
  const handleAdd = () => { addItem(product); setAdded(true); window.setTimeout(() => setAdded(false), 1800) }
  return <><main className="product-page"><div className="breadcrumb"><Link to="/shop">Tienda</Link><ChevronLeft size={13} /><span>{product.name}</span></div><section className="product-detail section-pad"><div className="product-detail-visual"><BottleVisual product={product} large /></div><div className="product-detail-copy"><p className="eyebrow">{product.category} · {product.size}</p><h1>{product.name}</h1><p className="detail-price"><span>Precio de muestra</span>{formatPrice(product.priceMXN)}</p><p className="concept-status">Concepto visual · información comercial pendiente</p><p className="detail-description">{product.description}</p><div className="detail-accordions"><div className="accordion"><button aria-expanded={open === 'about'} aria-controls="product-about" onClick={() => setOpen(open === 'about' ? '' : 'about')}><span>Sobre este concepto</span>{open === 'about' ? <Minus size={16} /> : <Plus size={16} />}</button>{open === 'about' && <p id="product-about">{product.description} El nombre, el formato y el precio se muestran únicamente para validar la experiencia de tienda.</p>}</div><div className="accordion"><button aria-expanded={open === 'format'} aria-controls="product-format" onClick={() => setOpen(open === 'format' ? '' : 'format')}><span>Ficha de presentación</span>{open === 'format' ? <Minus size={16} /> : <Plus size={16} />}</button>{open === 'format' && <p id="product-format">Categoría: {product.category}. Presentación: {product.size}. La información final del producto se agregará cuando la colección esté confirmada.</p>}</div></div><button className={`button add-button ${added ? 'added' : ''}`} onClick={handleAdd}>{added ? <><Check size={17} /> Agregado</> : <>Agregar selección <Plus size={17} /></>}</button><button className="continue-shopping" onClick={() => navigate('/shop')}>← Seguir explorando</button></div></section>{related.length > 0 && <section className="related section-pad"><SectionTitle eyebrow="Más conceptos" title="De la misma categoría" /><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</main><Footer /></>
}

function Finder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [added, setAdded] = useState(false)
  const navigate = useNavigate()
  const questions = brandCopy.finder.questions
  const current = questions[step]
  const selectedCategory = answers[0] as ProductCategory | undefined
  const result = selectedCategory && ['Limpieza', 'Hidratación', 'Sérums', 'Protección'].includes(selectedCategory) ? products.filter((product) => product.category === selectedCategory).slice(0, 2) : products.slice(0, 2)
  const resultReason = selectedCategory ? `Mostramos primero los conceptos de ${selectedCategory.toLowerCase()}, que fue la categoría que elegiste.` : 'Mostramos los primeros conceptos de la colección para que puedas compararlos.'
  const addSelection = () => { result.forEach((product) => useCart.getState().addItem(product)); setAdded(true) }
  if (step >= questions.length) return <main className="ritual-page ritual-result section-dark"><div className="ritual-result-content"><p className="eyebrow">{brandCopy.finder.resultEyebrow}</p><h1>{splitLines(brandCopy.finder.resultTitle)}</h1><p>{resultReason} Las respuestas sobre textura e información funcionan como contexto de navegación, no como diagnóstico.</p><div className="result-products">{result.map((product) => <article key={product.id} className="result-product"><Link to={`/product/${product.slug}`}><BottleVisual product={product} /></Link><div><p className="eyebrow">{product.category} · selección inicial</p><h3><Link to={`/product/${product.slug}`}>{product.name}</Link></h3><span>Precio de muestra · {formatPrice(product.priceMXN)}</span></div></article>)}</div><div className="result-actions"><button className={`button button-pink ${added ? 'selection-added' : ''}`} onClick={addSelection}>{added ? <><Check size={16} /> Selección agregada</> : <>{brandCopy.finder.addCta} <ArrowRight size={16} /></>}</button><button className="text-link light" onClick={() => { setStep(0); setAnswers([]); setAdded(false) }}>{brandCopy.finder.restartCta} <ArrowRight size={15} /></button></div></div></main>
  return <main className="ritual-page"><div className="ritual-progress"><span>{brandCopy.finder.progress}</span><span>{current.eyebrow}</span></div><div className="ritual-question"><div className="ritual-question-copy"><p className="eyebrow">{current.eyebrow}</p><h1>{splitLines(current.title)}</h1><p>Una selección inicial, sin diagnósticos ni promesas.</p></div><div className="ritual-options">{current.options.map((option, index) => <button key={option} onClick={() => { setAnswers((currentAnswers) => [...currentAnswers, option]); setStep((currentStep) => currentStep + 1) }}><span>0{index + 1}</span>{option}<ArrowRight size={17} /></button>)}</div></div><div className="ritual-footer"><button className="text-link" onClick={() => step > 0 ? setStep((currentStep) => currentStep - 1) : navigate('/')}>{step > 0 ? '← Anterior' : '← Inicio'}</button><span>hydross<span className="pink-dot">.</span></span></div></main>
}

function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const navigate = useNavigate()
  const total = subtotal()
  return <><main className="cart-page section-pad"><div className="cart-heading"><div><p className="eyebrow">{brandCopy.cart.eyebrow}</p><h1>{splitLines(brandCopy.cart.title)}</h1></div><Link className="text-link" to="/shop">Seguir explorando <ArrowRight size={15} /></Link></div>{items.length === 0 ? <div className="empty-cart"><div className="empty-orb">✦</div><h2>{brandCopy.cart.emptyTitle}</h2><p>{brandCopy.cart.emptyDescription}</p><Link className="button button-dark" to="/shop">Explorar productos</Link></div> : <div className="cart-layout"><div className="cart-lines">{items.map(({ product, quantity }) => <div className="cart-line" key={product.id}><BottleVisual product={product} /><div className="cart-line-info"><Link to={`/product/${product.slug}`}>{product.name}</Link><p>{product.size} · {product.category}</p><button onClick={() => removeItem(product.id)}>Eliminar</button></div><div className="quantity"><button aria-label={`Disminuir cantidad de ${product.name}`} onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></button><span aria-live="polite">{quantity}</span><button aria-label={`Aumentar cantidad de ${product.name}`} onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></button></div><strong>{formatPrice(product.priceMXN * quantity)}</strong></div>)}</div><aside className="summary"><p className="eyebrow">{brandCopy.cart.summary}</p><div className="summary-total"><span>{brandCopy.cart.total}</span><strong>{formatPrice(total)}</strong></div><button className="button button-dark" onClick={() => navigate('/checkout')}>{brandCopy.cart.checkout} <ArrowRight size={16} /></button><p className="summary-note">Importes de demostración · sin cargo</p></aside></div>}</main><Footer /></>
}

function Checkout() {
  const { items, subtotal, clear } = useCart()
  const [order, setOrder] = useState<DemoOrder | null>(null)
  const total = subtotal()
  if (order) return <NavigateSuccess order={order} />
  if (!items.length) return <NavigateEmpty />
  const confirmDemo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const demoOrder: DemoOrder = { id: `DEMO-${Date.now().toString(36).slice(-5).toUpperCase()}`, items: items.map((line) => ({ ...line })), subtotal: total, total, mode: 'demo' }
    setOrder(demoOrder)
    clear()
  }
  return <main className="checkout-page section-pad"><div className="checkout-heading"><Link to="/cart"><ChevronLeft size={15} /> Selección</Link><p className="eyebrow">{brandCopy.checkout.eyebrow}</p><h1>{splitLines(brandCopy.checkout.title)}</h1></div><div className="checkout-layout"><form className="checkout-form" onSubmit={confirmDemo}><div className="form-section"><h2>{brandCopy.checkout.details}</h2><div className="form-grid"><label htmlFor="checkout-name">Nombre completo<input id="checkout-name" name="name" autoComplete="name" required placeholder="Nombre" /></label><label htmlFor="checkout-email">Correo electrónico<input id="checkout-email" name="email" autoComplete="email" required type="email" placeholder="correo@ejemplo.com" /></label><label className="full" htmlFor="checkout-address">Dirección<input id="checkout-address" name="address" autoComplete="street-address" required placeholder="Calle y número" /></label><label htmlFor="checkout-city">Ciudad<input id="checkout-city" name="city" autoComplete="address-level2" required placeholder="Ciudad" /></label><label htmlFor="checkout-postal">Código postal<input id="checkout-postal" name="postalCode" autoComplete="postal-code" inputMode="numeric" required pattern="[0-9]{5}" title="Escribe un código postal de 5 dígitos" placeholder="00000" /></label></div></div><div className="form-section"><h2>Pago</h2><div className="demo-payment"><Sparkles size={17} aria-hidden="true" /><span>{brandCopy.checkout.payment}</span></div></div><button type="submit" className="button button-dark checkout-submit">{brandCopy.checkout.submit} <ArrowRight size={16} /></button></form><aside className="checkout-order"><p className="eyebrow">{brandCopy.cart.summary}</p>{items.map(({ product, quantity }) => <div className="checkout-item" key={product.id}><span>{quantity} × {product.name}</span><strong>{formatPrice(product.priceMXN * quantity)}</strong></div>)}<div className="summary-total"><span>{brandCopy.cart.total}</span><strong>{formatPrice(total)}</strong></div></aside></div></main>
}

function NavigateSuccess({ order }: { order: DemoOrder }) {
  return <main className="success-page section-dark"><div className="success-icon"><Check size={25} /></div><p className="eyebrow">{brandCopy.checkout.successEyebrow}</p><h1>{splitLines(brandCopy.checkout.successTitle)}</h1><p>{brandCopy.checkout.successDescription}</p><div className="demo-receipt"><span>Folio de demostración</span><strong>{order.id}</strong><span>{order.items.length} concepto(s) · {formatPrice(order.total)}</span></div><p className="success-disclaimer">No se realizó ningún cargo ni se generó un envío.</p><Link className="button button-pink" to="/shop">Volver a la colección <ArrowRight size={16} /></Link></main>
}

function NavigateEmpty() { return <main className="empty-cart section-pad"><div className="empty-orb">✦</div><h2>La selección está vacía.</h2><Link className="button button-dark" to="/shop">Explorar productos</Link></main> }
function NotFound() { return <main className="empty-cart section-pad"><p className="eyebrow">404</p><h2>Esta página no existe.</h2><Link className="button button-dark" to="/">Volver al inicio</Link></main> }

function App() {
  return <><DocumentMeta /><ScrollToLocation /><SiteHeader /><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/product/:slug" element={<ProductPage />} /><Route path="/find" element={<Finder />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="*" element={<NotFound />} /></Routes></>
}

export default App
