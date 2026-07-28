import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'

const DISPLAY = {
  fontFamily: 'Syncopate, sans-serif',
  fontWeight: 700,
  color: '#F5F0E8',
  lineHeight: 1.14,
  letterSpacing: '-0.02em',
  fontSize: 'clamp(1.7rem, 4vw, 3.2rem)',
  textTransform: 'uppercase',
  margin: 0,
}

export default function AboutSnippet() {
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-10 py-20 lg:py-28" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        {/* ─── Bloc éditorial « couverture magazine » ─── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{ borderRadius: '28px', border: '1px solid rgba(201,168,76,0.14)' }}
        >
          {/* Colonne gauche : grande typographie */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col justify-between"
            style={{ background: '#0E0E0E', padding: 'clamp(2rem, 5vw, 4rem)', minHeight: '460px' }}
          >
            <span className="section-label" style={{ marginBottom: 0 }}>À propos</span>

            <h2 style={DISPLAY} className="my-8 lg:my-0">
              Maison<br />
              <span style={{ color: '#C9A84C', fontStyle: 'italic', textTransform: 'none' }}>Senan</span><br />
              Concept
            </h2>

            <p style={{
              fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.72rem',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B8B0A0',
              lineHeight: 2, maxWidth: '340px', margin: 0,
            }}>
              Mode artistique, costumerie & décoration d'exception — Porto Novo, Bénin
            </p>
          </motion.div>

          {/* Colonne droite : couverture magazine sur fond taupe */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center justify-center"
            style={{ background: '#C7BDAE', padding: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            <div
              className="w-full flex flex-col"
              style={{
                maxWidth: '400px', background: '#0E0E0E', borderRadius: '10px',
                padding: 'clamp(1.2rem, 3vw, 1.8rem)',
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
              }}
            >
              {/* En-tête de la couverture */}
              <p style={{
                fontFamily: 'Syncopate, sans-serif', fontWeight: 500, fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
                color: '#F5F0E8', lineHeight: 1, letterSpacing: '0.02em',
              }}>
                senan<span style={{ color: '#C9A84C' }}>.</span>
              </p>
              <div className="flex items-center justify-between mt-3 pb-3" style={{ borderBottom: '1px solid rgba(245,240,232,0.15)' }}>
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B8B0A0' }}>
                  Maison de mode · Costumerie
                </span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C' }}>
                  N°01
                </span>
              </div>

              {/* Visuel */}
              <div className="mt-4 overflow-hidden" style={{ borderRadius: '4px', aspectRatio: '3/3.6' }}>
                <img
                  src="/gallery/img16.jpg"
                  alt="Création Senan Concept"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.15)' }}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#787068' }}>
                  Édition Héritage
                </span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#787068' }}>
                  Porto Novo · BJ
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Texte de présentation + CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end mt-12 lg:mt-16"
        >
          <div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1rem', color: '#B8B0A0', lineHeight: 1.9, maxWidth: '640px', marginBottom: '1.2rem' }}>
              Fondée à Porto Novo, <strong style={{ color: '#F5F0E8', fontWeight: 500 }}>Senan Concept</strong> est une maison
              de mode d'exception dédiée à la valorisation du patrimoine culturel béninois. Nos créations habillent
              les plus grandes cérémonies, de la royauté aux festivals culturels et sacrés.
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1rem', color: '#B8B0A0', lineHeight: 1.9, maxWidth: '640px' }}>
              Sous la direction de sa fondatrice <strong style={{ color: '#F5F0E8', fontWeight: 500 }}>Christelle FASSINOU</strong>,
              chaque pièce est une œuvre unique, mêlant tradition et savoir-faire contemporain.
            </p>
          </div>

          <RouterLink
            to="/qui-sommes-nous"
            className="shrink-0 inline-flex items-center gap-2 whitespace-nowrap transition-all duration-300"
            style={{
              border: '1.5px solid #C9A84C', color: '#C9A84C',
              fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.88rem',
              borderRadius: '9999px', padding: '0.7rem 1.8rem', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0A0A0A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C' }}
          >
            Découvrir notre histoire →
          </RouterLink>
        </motion.div>

      </div>
    </section>
  )
}
