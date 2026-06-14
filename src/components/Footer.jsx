import { Link } from 'react-scroll'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-wrap items-center justify-between gap-6">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <span
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: '1.1rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C' }}
          >
            SENAN CONCEPT
          </span>
        </Link>

        {/* Copyright */}
        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.72rem', color: '#B8B0A0', letterSpacing: '0.05em' }}>
          © 2025 Senan Concept — Tous droits réservés
        </p>

        {/* Liens */}
        <div className="flex gap-6">
          {[
            { label: 'Services', to: 'services' },
            { label: 'Réalisations', to: 'realisations' },
            { label: 'Contact', to: 'contact' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-64}
              className="cursor-pointer hover:text-or transition-colors duration-300"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8B0A0' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
