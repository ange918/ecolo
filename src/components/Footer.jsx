import { Link } from 'react-scroll'

export default function Footer() {
  return (
    <footer style={{ background: '#111111', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-wrap items-center justify-between gap-6">

        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>
            SENAN <span style={{ color: '#F5F0E8', fontWeight: 300 }}>CONCEPT</span>
          </span>
        </Link>

        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.78rem', color: '#B8B0A0' }}>
          © 2025 Senan Concept — Tous droits réservés
        </p>

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
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.8rem', color: '#B8B0A0' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
