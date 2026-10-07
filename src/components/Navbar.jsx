import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { trackClick } from '../lib/supabase'
import Logo from './Logo'

const LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Événementiel', to: '/evenementiel' },
  { label: 'Qui sommes-nous', to: '/qui-sommes-nous' },
]

function isActive(pathname, to) {
  return pathname === to || pathname.startsWith(to + '/')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className="site-bar">
      <div className="site-header">
        <Logo />
        <nav className="nav" aria-label="Navigation principale">
          {LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(pathname, link.to) ? 'active' : undefined}
              onClick={() => trackClick('nav:' + link.to)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="btn btn-outline-gold btn-sm header-cta" onClick={() => trackClick('cta:contactez-nous')}>
          Contactez-nous
        </Link>
        <button className="burger" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Navigation mobile">
          {LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(pathname, link.to) ? 'active' : undefined}
              onClick={() => trackClick('nav:' + link.to)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-outline-gold btn-sm" onClick={() => trackClick('cta:contactez-nous')}>
            Contactez-nous
          </Link>
        </nav>
      )}
    </header>
  )
}
