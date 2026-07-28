import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'

const stats = [
  { value: '8+', label: "Années d'expérience" },
  { value: '3', label: 'Festivals majeurs' },
  { value: '100%', label: 'Fait à la main' },
  { value: 'BJ', label: 'Porto Novo, Bénin' },
]

export default function AboutSnippet() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">À propos</p>
          <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            L'artisanat béninois<br />
            au service de la <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>culture</span>
          </h2>
          <div className="divider" />
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.9, marginBottom: '1.5rem' }}>
            Fondée à Porto Novo, Senan Concept est une maison de mode d'exception dédiée à la valorisation du patrimoine culturel béninois. Nos créations habillent les plus grandes cérémonies, de la royauté aux événements, festivals culturels et sacrés.
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.9, marginBottom: '2.5rem' }}>
            Sous la direction de sa fondatrice <strong style={{ color: '#F5F0E8' }}>Christelle FASSINOU</strong>, chaque pièce que nous concevons est une œuvre unique, mêlant tradition et savoir-faire contemporain.
          </p>
          <RouterLink
            to="/qui-sommes-nous"
            style={{
              display: 'inline-block',
              border: '1.5px solid #C9A84C', color: '#C9A84C',
              fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.88rem',
              borderRadius: '9999px', padding: '0.6rem 1.6rem',
              textDecoration: 'none', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0A0A0A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C' }}
          >
            Découvrir notre histoire →
          </RouterLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(201,168,76,0.15)', borderRadius: '24px', overflow: 'hidden' }}>
            {stats.map((s, i) => (
              <div key={i} className="p-8" style={{ background: '#1A1A1A' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '2.8rem', color: '#C9A84C', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.5rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-6" style={{ background: '#1A1A1A', borderLeft: '3px solid #C9A84C', borderRadius: '18px' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', color: '#E8D5A0', lineHeight: 1.7 }}>
              "Habiller une culture, c'est honorer une identité."
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.75rem', color: '#C9A84C', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
              Christelle FASSINOU, Fondatrice
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
