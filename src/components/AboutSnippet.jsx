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

          {/* Colonne droite : couverture magazine qui s'ouvre comme un livre */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center justify-center"
            style={{ background: '#C7BDAE', padding: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {/* Livre */}
            <motion.div
              initial="closed"
              whileInView="open"
              viewport={{ once: true, amount: 0.5 }}
              style={{ perspective: '1700px', width: '100%', maxWidth: '380px' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/3.85', transformStyle: 'preserve-3d' }}>

                {/* Page intérieure révélée par l'ouverture */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '10px', overflow: 'hidden', background: '#0E0E0E', boxShadow: '0 30px 60px -22px rgba(0,0,0,0.55)' }}>
                  <img
                    src="/gallery/img17.jpg"
                    alt="Création Senan Concept"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Reliure côté gauche */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '14px', background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))' }} />
                  <div className="flex items-center justify-between" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0.9rem 1.1rem', background: 'linear-gradient(to top, rgba(10,10,10,0.92), transparent)' }}>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D8D0C2' }}>Édition Héritage</span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C' }}>Porto Novo · BJ</span>
                  </div>
                  {/* Ombre de la couverture qui se lève */}
                  <motion.div
                    variants={{ closed: { opacity: 0.55 }, open: { opacity: 0 } }}
                    transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.4 }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.65), rgba(0,0,0,0) 55%)', pointerEvents: 'none' }}
                  />
                </div>

                {/* Couverture qui s'ouvre (pivote sur la reliure) */}
                <motion.div
                  variants={{ closed: { rotateY: 0 }, open: { rotateY: -158 } }}
                  transition={{ duration: 1.6, ease: [0.33, 0.9, 0.28, 1], delay: 0.4 }}
                  style={{
                    position: 'absolute', inset: 0, transformOrigin: 'left center',
                    transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    borderRadius: '10px', background: 'linear-gradient(135deg, #161616, #0A0A0A)',
                    border: '1px solid rgba(201,168,76,0.16)',
                    padding: 'clamp(1.2rem, 3vw, 1.8rem)', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Reliure */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '12px', background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} />

                  <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 500, fontSize: 'clamp(2.2rem, 5.5vw, 3.2rem)', color: '#F5F0E8', lineHeight: 1, letterSpacing: '0.02em' }}>
                    senan<span style={{ color: '#C9A84C' }}>.</span>
                  </p>
                  <div className="flex items-center justify-between mt-3 pb-3" style={{ borderBottom: '1px solid rgba(245,240,232,0.15)' }}>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B8B0A0' }}>Maison de mode · Costumerie</span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C' }}>N°01</span>
                  </div>

                  <div className="mt-4 overflow-hidden" style={{ borderRadius: '4px', flex: 1 }}>
                    <img src="/gallery/img16.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(0.15) brightness(0.94)' }} />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#787068' }}>Édition Héritage</span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#787068' }}>Porto Novo · BJ</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
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
