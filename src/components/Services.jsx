import { motion } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    num: '01',
    titre: 'Tenues artistiques',
    desc: 'Costumes royaux, tenues de cérémonie et créations scéniques conçus avec des matières nobles et un soin du détail exceptionnel. Chaque pièce est une œuvre unique.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4 C22 4 14 8 10 14 L8 20 L14 22 L14 38 L30 38 L30 22 L36 20 L34 14 C30 8 22 4 22 4 Z" />
        <path d="M14 22 L10 14" /><path d="M30 22 L34 14" />
        <path d="M16 30 Q22 34 28 30" /><circle cx="22" cy="10" r="3" />
      </svg>
    ),
  },
  {
    num: '02',
    titre: "Décoration d'intérieure",
    desc: "Des espaces réinventés avec des pièces artisanales uniques, alliant l'esthétique africaine contemporaine à une élégance intemporelle.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="32" height="28" /><path d="M6 18 L38 18" /><path d="M18 18 L18 36" />
        <path d="M10 13 L14 13" /><path d="M24 24 L34 24" /><path d="M24 29 L30 29" /><circle cx="11" cy="27" r="4" />
      </svg>
    ),
  },
  {
    num: '03',
    titre: 'Formations',
    desc: "Formations professionnelles dans nos domaines d'intervention : mode africaine, accessoires, décoration. Un centre de formation pour transmettre et perpétuer l'excellence du savoir-faire béninois.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 6 L38 14 L22 22 L6 14 Z" />
        <path d="M6 14 L6 28 M38 14 L38 28" />
        <path d="M12 18 L12 30 C12 34 17 37 22 37 C27 37 32 34 32 30 L32 18" />
        <path d="M22 22 L22 37" />
        <circle cx="38" cy="28" r="3" />
        <path d="M38 31 L38 38" />
      </svg>
    ),
  },
]

function ServiceCard({ service, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{
        padding: '2.5rem 2rem',
        background: hovered ? '#1A1A1A' : 'transparent',
        borderRight: '1px solid rgba(201,168,76,0.1)',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
    >
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)', marginBottom: '1.5rem', fontFamily: 'Jost' }}>
        {service.num}
      </p>
      <div style={{ marginBottom: '1.5rem' }}>{service.icon}</div>
      <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1.2rem', color: '#F5F0E8', marginBottom: '0.75rem' }}>
        {service.titre}
      </h3>
      <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#B8B0A0', lineHeight: 1.85 }}>
        {service.desc}
      </p>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: '2px',
        background: '#C9A84C', width: hovered ? '100%' : '0%',
        transition: 'width 0.4s ease',
      }} />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">Ce que nous faisons</p>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Nos domaines de <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>création</span>
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: '1px solid rgba(201,168,76,0.12)', borderRadius: '24px', overflow: 'hidden' }}
        >
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
