import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brandCopy } from '../content/brandCopy'

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div><p className="footer-kicker">{brandCopy.footer.kicker}</p><h2>{brandCopy.footer.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2></div><Link className="circle-link" to="/shop" aria-label="Explorar productos"><ArrowUpRight size={24} /></Link></div>
    <div className="footer-grid"><div><p className="footer-label">{brandCopy.footer.information}</p><p className="footer-note">{brandCopy.footer.note}</p></div><div><p className="footer-label">{brandCopy.footer.explore}</p><Link to="/shop">{brandCopy.navigation.shop}</Link><Link to="/find">{brandCopy.navigation.finder}</Link><Link to="/#essence">{brandCopy.navigation.essence}</Link></div><div><p className="footer-label">{brandCopy.footer.information}</p><span className="footer-note">Productos · Categorías<br />Precios · Disponibilidad</span></div><div className="newsletter"><p className="footer-label">Contacto</p><p>El canal de contacto se publicará junto con la colección.</p></div></div>
    <div className="footer-bottom"><span>© Hydross skincare</span><span>Catálogo de muestra</span><span>Privacidad · Términos</span></div>
  </footer>
}
