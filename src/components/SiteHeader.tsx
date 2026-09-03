import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const count = useCart((state) => state.itemCount())
  const navItems = [['Tienda', '/shop'], ['Ritual', '/ritual'], ['Nuestra esencia', '/#essence']]

  return (
    <>
      <div className="announcement">Envío gratis en compras mayores a $899 <span>✦</span> producto mexicano · tecnología francesa</div>
      <header className="site-header">
        <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        <Link to="/" className="wordmark" aria-label="Hydross inicio"><img className="brand-logo-header" src="/brand/hydross-logo.png" alt="hydross. skincare" /></Link>
        <nav className={`main-nav ${open ? 'nav-open' : ''}`}>
          {navItems.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button aria-label="Buscar" onClick={() => navigate('/shop')}><Search size={19} /></button>
          <button className="bag-button" aria-label={`Carrito con ${count} productos`} onClick={() => navigate('/cart')}><ShoppingBag size={19} /><span>{count}</span></button>
        </div>
      </header>
    </>
  )
}
