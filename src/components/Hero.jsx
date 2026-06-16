import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center"
      style={{
        background: '#0A0A0A',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p {...fadeUp(0.1)} className="section-label mb-8">
          Art · Costume · Décoration
        </motion.p>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.3)}
          style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
          className="text-blanc mb-6"
        >
          Transformez votre vision
          <br />
          en{' '}
          <span style={{ color: '#C9A84C' }}>artisanat africain</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-texte max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8 }}
        >
          Senan Concept crée des tenues artistiques sur mesure, des accessoires de déco, des décors d'événements et d'intérieurs uniques et des formations — au service de la royauté, des événements, festivals culturels et sacrés.
        </motion.p>

        {/* Boutons */}
        <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="realisations"
            smooth
            duration={600}
            offset={-64}
            className="cursor-pointer px-8 py-3.5 transition-all duration-300"
            style={{
              background: 'transparent',
              border: '2px solid #F5F0E8',
              color: '#F5F0E8',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              borderRadius: '9999px',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#F5F0E8'; e.currentTarget.style.color = '#F5F0E8' }}
          >
            Nos réalisations
          </Link>
          <Link
            to="contact"
            smooth
            duration={600}
            offset={-64}
            className="cursor-pointer px-8 py-3.5 transition-all duration-300"
            style={{
              background: '#C9A84C',
              border: '2px solid #C9A84C',
              color: '#0A0A0A',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              borderRadius: '9999px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8D5A0'; e.currentTarget.style.borderColor = '#E8D5A0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.borderColor = '#C9A84C' }}
          >
            Prendre contact
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div
          className="scroll-line"
          style={{ width: '1px', height: '48px', background: 'rgba(201,168,76,0.5)' }}
        />
        <span
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(184,176,160,0.6)', textTransform: 'uppercase' }}
        >
          Défiler
        </span>
      </div>
    </section>
  )
}
