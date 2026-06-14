import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const NAV_SECTIONS = [
  { label: 'Services', to: 'services' },
  { label: 'Réalisations', to: 'realisations' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const SectionLink = ({ to, label, className, style, onClick }) => {
    if (isHome) {
      return (
        <ScrollLink to={to} smooth duration={700} offset={-64}
          className={className} style={style} onClick={onClick}>
          {label}
        </ScrollLink>
      )
    }
    return (
      <RouterLink to={`/#${to}`} className={className} style={style} onClick={onClick}>
        {label}
      </RouterLink>
    )
  }

  const linkStyle = {
    fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.92rem', cursor: 'pointer',
    color: '#B8B0A0', textDecoration: 'none', transition: 'color 0.25s',
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.85)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.jpg"
            alt="Senan Concept"
            style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </RouterLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_SECTIONS.map(link => (
            <SectionLink key={link.to} to={link.to} label={link.label}
              style={linkStyle}
              className="hover:text-blanc"
            />
          ))}
          <RouterLink to="/qui-sommes-nous"
            style={{ ...linkStyle, color: location.pathname === '/qui-sommes-nous' ? '#C9A84C' : '#B8B0A0' }}
          >
            Qui sommes-nous
          </RouterLink>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <SectionLink to="contact" label="Contactez-nous"
            style={{
              border: '1.5px solid #C9A84C', color: '#C9A84C',
              fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.88rem',
              borderRadius: '9999px', padding: '0.45rem 1.3rem',
              cursor: 'pointer', display: 'inline-block', textDecoration: 'none',
              transition: 'all 0.25s',
            }}
          />
        </div>

        {/* Burger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block h-px w-6 bg-or transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-or transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-or transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-5" style={{ background: 'rgba(10,10,10,0.98)' }}>
          {NAV_SECTIONS.map(link => (
            <SectionLink key={link.to} to={link.to} label={link.label}
              style={linkStyle} onClick={() => setMenuOpen(false)} />
          ))}
          <RouterLink to="/qui-sommes-nous" onClick={() => setMenuOpen(false)}
            style={{ ...linkStyle, color: '#B8B0A0', textDecoration: 'none' }}>
            Qui sommes-nous
          </RouterLink>
          <SectionLink to="contact" label="Contactez-nous"
            style={{
              border: '1.5px solid #C9A84C', color: '#C9A84C',
              fontFamily: 'Jost, sans-serif', fontSize: '0.88rem',
              borderRadius: '9999px', padding: '0.5rem 1.2rem',
              textAlign: 'center', textDecoration: 'none', display: 'block',
            }}
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </motion.nav>
  )
}
