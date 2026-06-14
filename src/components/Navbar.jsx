import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', to: 'services' },
    { label: 'Réalisations', to: 'realisations' },
    { label: 'Qui sommes-nous', to: 'about' },
  ]

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
        <Link to="hero" smooth duration={600} className="cursor-pointer flex-shrink-0">
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 700,
              fontSize: '1.35rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#C9A84C',
            }}
          >
            SENAN<span style={{ color: '#F5F0E8', fontWeight: 300 }}> CONCEPT</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-64}
              className="cursor-pointer text-texte hover:text-blanc transition-colors duration-300"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.92rem' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA pill */}
        <div className="hidden md:block">
          <Link
            to="contact"
            smooth
            duration={600}
            offset={-64}
            className="cursor-pointer px-6 py-2.5 transition-all duration-300"
            style={{
              border: '1.5px solid #C9A84C',
              color: '#C9A84C',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              fontSize: '0.88rem',
              borderRadius: '9999px',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0A0A0A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C' }}
          >
            Contactez-nous
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px w-6 bg-or transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-or transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-or transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-6" style={{ background: 'rgba(10,10,10,0.98)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-64}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer text-texte hover:text-blanc transition-colors duration-300"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.92rem' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="contact"
            smooth
            duration={600}
            offset={-64}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer text-center py-2.5"
            style={{ border: '1.5px solid #C9A84C', color: '#C9A84C', fontFamily: 'Jost, sans-serif', fontSize: '0.88rem', borderRadius: '9999px' }}
          >
            Contactez-nous
          </Link>
        </div>
      )}
    </motion.nav>
  )
}
