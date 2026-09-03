import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart'
import { brandCopy } from '../content/brandCopy'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const count = useCart((state) => state.itemCount())
  const navItems = [[brandCopy.navigation.shop, '/shop'], [brandCopy.navigation.finder, '/find'], [brandCopy.navigation.essence, '/#essence']]

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className="site-header">
        <button ref={menuButtonRef} className="mobile-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        <Link to="/" className="wordmark" aria-label="Hydross inicio"><span className="logo-frame"><img className="brand-logo-header" src="/brand/hydross-logo.png" alt="hydross. skincare" /></span></Link>
        <nav id="site-navigation" className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Navegación principal">
          {navItems.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button aria-label="Buscar productos" title="Buscar productos" onClick={() => navigate('/shop?focus=search')}><Search size={19} /></button>
          <button className="bag-button" aria-label={`Carrito con ${count} productos`} onClick={() => navigate('/cart')}><ShoppingBag size={19} /><span>{count}</span></button>
        </div>
    </header>
  )
}
