import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const scrollStyle = {
  fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.88rem',
  color: '#B8B0A0', cursor: 'pointer', textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const SLink = ({ to, children }) =>
    isHome
      ? <ScrollLink to={to} smooth duration={700} offset={-64} style={scrollStyle}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
          onMouseLeave={e => e.currentTarget.style.color = '#B8B0A0'}>
          {children}
        </ScrollLink>
      : <RouterLink to={`/#${to}`} style={scrollStyle}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
          onMouseLeave={e => e.currentTarget.style.color = '#B8B0A0'}>
          {children}
        </RouterLink>

  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C' }}>
                SENAN<span style={{ color: '#F5F0E8', fontWeight: 300 }}> CONCEPT</span>
              </span>
            </RouterLink>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', lineHeight: 1.85, marginTop: '1rem', maxWidth: '340px' }}>
              Maison artisanale d'excellence basée à Cotonou, Bénin. Tenues artistiques sur-mesure, décoration d'intérieure et poufs artisanaux — au service des cultures et des mémoires.
            </p>
            <div className="flex gap-4 mt-5">
              {['Facebook', 'Instagram', 'WhatsApp'].map(s => (
                <a key={s} href="#" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.75rem', color: '#B8B0A0', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                  onMouseLeave={e => e.currentTarget.style.color = '#B8B0A0'}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5F0E8', marginBottom: '1.2rem' }}>
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              <SLink to="services">Nos services</SLink>
              <SLink to="realisations">Réalisations</SLink>
              <SLink to="temoignages">Témoignages</SLink>
              <SLink to="galerie">Galerie</SLink>
              <SLink to="faq">FAQ</SLink>
              <RouterLink to="/qui-sommes-nous" style={scrollStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.color = '#B8B0A0'}>
                Qui sommes-nous
              </RouterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5F0E8', marginBottom: '1.2rem' }}>
              Contact
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Cotonou, Bénin' },
                { label: 'contact@senanconcept.com' },
                { label: '+229 XX XX XX XX' },
                { label: 'Lun – Ven · 8h – 18h' },
              ].map((item, i) => (
                <p key={i} style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#B8B0A0' }}>{item.label}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)', marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.78rem', color: 'rgba(184,176,160,0.5)' }}>
            © 2025 Senan Concept — Tous droits réservés. Cotonou, Bénin.
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.78rem', color: 'rgba(184,176,160,0.35)' }}>
            Fondée par AndyChris
          </p>
        </div>

      </div>
    </footer>
  )
}
