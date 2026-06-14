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
      className="min-h-screen flex flex-col items-center justify-center relative px-6"
      style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.05) 0%, #0A0A0A 70%)',
      }}
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p {...fadeUp(0.2)} className="section-label mb-6">
          Art · Costume · Décoration
        </motion.p>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.4)}
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
          }}
          className="text-blanc mb-6"
        >
          L'art du costume
          <br />
          à l'âme{' '}
          <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>africaine</em>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          {...fadeUp(0.6)}
          className="text-texte max-w-xl mx-auto mb-10"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.85 }}
        >
          Tenues artistiques sur-mesure, décoration d'intérieure et création de poufs —
          au service des rois, des festivals et des mémoires culturelles.
        </motion.p>

        {/* Boutons */}
        <motion.div {...fadeUp(0.8)} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="realisations"
            smooth
            duration={600}
            offset={-64}
            className="cursor-pointer px-8 py-3 transition-all duration-300"
            style={{
              background: '#C9A84C',
              color: '#0A0A0A',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8D5A0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C' }}
          >
            Nos réalisations
          </Link>
          <Link
            to="contact"
            smooth
            duration={600}
            offset={-64}
            className="cursor-pointer px-8 py-3 transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid rgba(245,240,232,0.3)',
              color: '#F5F0E8',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.3)'; e.currentTarget.style.color = '#F5F0E8' }}
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
