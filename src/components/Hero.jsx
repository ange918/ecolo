import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { useState } from 'react'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
})

// Cartes affichées dans le carrousel mobile
const mobileCards = [
  {
    img: '/gallery/img17.jpg',
    title: 'Créations sur mesure',
    text: 'Des tenues artistiques uniques, façonnées à la main pour sublimer chaque occasion.',
  },
  {
    img: '/gallery/img12.jpg',
    title: 'Décor & accessoires',
    text: 'Chaque pièce enrichit votre univers avec harmonie et sophistication.',
  },
  {
    img: '/gallery/img5.jpg',
    title: "Décors d'événements",
    text: 'Des scénographies immersives pour festivals, cérémonies et célébrations sacrées.',
  },
  {
    img: '/gallery/img10.jpg',
    title: 'Formations',
    text: "Transmettre l'excellence du savoir-faire artisanal béninois à la nouvelle génération.",
  },
]

const ArrowRight = ({ size = 16, color = '#0A0A0A' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// Contenu visuel d'une carte (sans animation) — utilisé tel quel dans la bande roulante
function CardBox({ img, title, text }) {
  return (
    <div
      style={{
        background: 'rgba(17,17,17,0.92)',
        border: '1px solid rgba(201,168,76,0.18)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '18px',
        padding: '1rem',
        width: 'min(260px, 78vw)',
      }}
    >
      <div style={{ overflow: 'hidden', borderRadius: '12px', aspectRatio: '16/10', marginBottom: '0.85rem' }}>
        <img src={img} alt="" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <h3 style={{
        fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.95rem',
        color: '#F5F0E8', marginBottom: '0.4rem',
      }}>
        {title}
      </h3>
      <div className="flex items-end justify-between gap-3">
        <p style={{
          fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.78rem',
          lineHeight: 1.55, color: '#B8B0A0', margin: 0,
        }}>
          {text}
        </p>
        <span
          className="shrink-0 flex items-center justify-center"
          style={{
            width: '34px', height: '34px', borderRadius: '9999px',
            background: '#C9A84C',
          }}
        >
          <ArrowRight size={15} color="#0A0A0A" />
        </span>
      </div>
    </div>
  )
}

// Carte flottante animée (apparition), pour l'affichage desktop sur l'image
function FloatingCard({ img, title, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      <CardBox img={img} title={title} text={text} />
    </motion.div>
  )
}

export default function Hero() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      id="hero"
      className="relative px-4 sm:px-6 lg:px-10 pt-24 pb-16 lg:pt-28 lg:pb-20"
      style={{ background: '#0A0A0A', minHeight: '100vh' }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          background: '#111111',
          border: '1px solid rgba(201,168,76,0.12)',
          borderRadius: '32px',
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
        }}
      >
        {/* Bloc titre + intro (centré) */}
        <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-14">
          <motion.p {...fadeUp(0.1)} className="section-label mb-6">
            Art · Costume · Décoration
          </motion.p>
          <motion.h1
            {...fadeUp(0.3)}
            style={{
              fontFamily: 'Syncopate, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.35rem, 4.6vw, 3.8rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              overflowWrap: 'break-word',
            }}
            className="text-blanc"
          >
            Transformez votre vision en{' '}
            <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>artisanat africain</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="text-texte mt-6 mb-9 mx-auto"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.75, maxWidth: '38rem' }}
          >
            Senan Concept crée des tenues artistiques sur mesure, des accessoires
            de déco et des décors d'événements uniques. Au service de la royauté,
            des festivals culturels et sacrés.
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="realisations"
              smooth
              duration={600}
              offset={-64}
              className="cursor-pointer inline-flex items-center gap-2.5 px-7 py-3.5 transition-all duration-300"
              style={{
                background: '#C9A84C',
                color: '#0A0A0A',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.03em',
                borderRadius: '9999px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E8D5A0' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C' }}
            >
              Découvrir la collection
              <ArrowRight size={16} color="#0A0A0A" />
            </Link>
            <Link
              to="contact"
              smooth
              duration={600}
              offset={-64}
              className="cursor-pointer px-7 py-3.5 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '2px solid #F5F0E8',
                color: '#F5F0E8',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.03em',
                borderRadius: '9999px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#F5F0E8'; e.currentTarget.style.color = '#F5F0E8' }}
            >
              Prendre contact
            </Link>
          </motion.div>
        </div>

        {/* Image principale + cartes flottantes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
          className="relative"
        >
          <div
            className="overflow-hidden"
            style={{ borderRadius: '24px', aspectRatio: '16/9' }}
          >
            <img
              src="/gallery/img18.jpg"
              alt="Création artistique Senan Concept"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '52% 34%', display: 'block' }}
            />
          </div>

          {/* Carte gauche */}
          <div className="hidden md:block absolute left-5 lg:left-8 bottom-6 lg:bottom-8">
            <FloatingCard
              img="/gallery/img17.jpg"
              title="Créations sur mesure"
              text="Des tenues artistiques uniques, façonnées à la main pour sublimer chaque occasion."
              delay={0.7}
              align="left"
            />
          </div>

          {/* Carte droite */}
          <div className="hidden md:block absolute right-5 lg:right-8 bottom-6 lg:bottom-8">
            <FloatingCard
              img="/gallery/img12.jpg"
              title="Décor & accessoires"
              text="Chaque pièce enrichit votre univers avec harmonie et sophistication."
              delay={0.85}
              align="right"
            />
          </div>
        </motion.div>

        {/* Bande roulante de cartes sur mobile (sous l'image) */}
        <div className="md:hidden mt-6 -mx-4 sm:-mx-6">
          <div className="marquee-viewport">
            <div
              className={`marquee-track to-left ${paused ? 'marquee-paused' : ''}`}
              style={{ '--marquee-dur': '26s' }}
            >
              {[...mobileCards, ...mobileCards].map((card, i) => (
                <div key={i} className="shrink-0" style={{ marginRight: '1rem' }}>
                  <CardBox {...card} />
                </div>
              ))}
            </div>
          </div>

          {/* Bouton pause / lecture */}
          <div className="flex items-center justify-center mt-4 px-4">
            <button
              onClick={() => setPaused(p => !p)}
              aria-label={paused ? 'Reprendre le défilement' : 'Mettre en pause'}
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#C9A84C',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 500,
                fontSize: '0.78rem',
                letterSpacing: '0.05em',
                borderRadius: '9999px',
                padding: '0.45rem 1.1rem',
                cursor: 'pointer',
              }}
            >
              {paused ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#C9A84C"><polygon points="6 4 20 12 6 20 6 4" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#C9A84C"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              )}
              {paused ? 'Lecture' : 'Pause'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
