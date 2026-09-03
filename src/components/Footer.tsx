import { ArrowUpRight, AtSign, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div><p className="footer-kicker">Tu piel, tu ritual.</p><h2>Glow con<br /><em>intención.</em></h2></div><Link className="circle-link" to="/shop" aria-label="Explorar tienda"><ArrowUpRight size={24} /></Link></div>
    <div className="footer-grid"><div><p className="footer-label">hydross.</p><p className="footer-note">Skincare sensorial hecho<br />para la vida real.</p></div><div><p className="footer-label">Explora</p><Link to="/shop">Tienda</Link><Link to="/ritual">Encuentra tu ritual</Link><Link to="/#essence">Nuestra esencia</Link></div><div><p className="footer-label">Conecta</p><a href="mailto:hola@hydross.com"><Mail size={14} /> hola@hydross.com</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><AtSign size={14} /> @hydross.skin</a></div><div className="newsletter"><p className="footer-label">Una gotita de glow</p><p>Notas, rituales y novedades en tu inbox.</p><div className="email-field"><input placeholder="Tu correo electrónico" aria-label="Tu correo electrónico" /><button aria-label="Suscribirme"><ArrowUpRight size={16} /></button></div></div></div>
    <div className="footer-bottom"><span>© 2025 hydross. skincare</span><span>Hecho en México · vegano</span><span>Privacidad · Términos</span></div>
  </footer>
}
