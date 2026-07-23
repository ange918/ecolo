import { motion } from 'framer-motion'
import { useState } from 'react'

const realisations = [
  {
    tag: 'Comédie musicale',
    titre: 'Trône de Béhanzin',
    sousTitre: 'Costumes & décors pour la comédie musicale',
    svg: (
      <svg width="180" height="280" viewBox="0 0 180 280" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="90" cy="50" rx="22" ry="28" />
        <path d="M68 75 C58 100 55 140 58 175 L122 175 C125 140 122 100 112 75 Z" />
        <path d="M58 175 C45 215 40 250 43 270 L137 270 C140 250 135 215 122 175 Z" />
        <path d="M68 85 C54 98 46 120 48 145" /><path d="M112 85 C126 98 134 120 132 145" />
        <path d="M72 35 L76 20 L83 30 L90 15 L97 30 L104 20 L108 35 Z" />
        <path d="M65 200 Q90 193 115 200" strokeDasharray="4 3" />
        <path d="M62 218 Q90 210 118 218" strokeDasharray="4 3" />
        <path d="M60 236 Q90 228 120 236" strokeDasharray="4 3" />
      </svg>
    ),
  },
  {
    tag: 'Festival culturel',
    titre: 'Festival des Masques',
    sousTitre: 'Tenues rituelles & masques sacrés',
    svg: (
      <svg width="180" height="280" viewBox="0 0 180 280" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 80 Q50 20 90 20 Q130 20 130 80 L125 150 Q90 170 55 150 Z" />
        <ellipse cx="72" cy="95" rx="10" ry="13" /><ellipse cx="108" cy="95" rx="10" ry="13" />
        <path d="M75 130 Q90 140 105 130" />
        <path d="M50 80 L35 110 L45 115" /><path d="M130 80 L145 110 L135 115" />
        <path d="M70 20 L60 5 M90 20 L90 3 M110 20 L120 5" />
        <path d="M55 150 L40 200 Q90 220 140 200 L125 150" />
        <path d="M40 200 L30 270 L150 270 L140 200" />
        <path d="M55 210 Q90 202 125 210" strokeDasharray="5 3" />
        <path d="M48 230 Q90 220 132 230" strokeDasharray="5 3" />
      </svg>
    ),
  },
  {
    tag: 'Cérémonie spirituelle',
    titre: 'Vodouns Days',
    sousTitre: 'Parures & tenues des cultes vodoun',
    svg: (
      <svg width="180" height="280" viewBox="0 0 180 280" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="90" cy="48" rx="24" ry="30" />
        <path d="M66 75 C54 105 52 150 56 185 L124 185 C128 150 126 105 114 75 Z" />
        <path d="M56 185 C42 220 38 255 42 270 L138 270 C142 255 138 220 124 185 Z" />
        <path d="M66 88 C50 104 42 130 44 158" /><path d="M114 88 C130 104 138 130 136 158" />
        <path d="M80 35 L90 25 L100 35" />
        <path d="M62 205 Q90 197 118 205" strokeDasharray="4 3" />
        <path d="M58 222 Q90 214 122 222" strokeDasharray="4 3" />
        <path d="M55 240 Q90 232 125 240" strokeDasharray="4 3" />
        <path d="M54 258 Q90 250 126 258" strokeDasharray="4 3" />
      </svg>
    ),
  },
]

function Card({ item, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{ aspectRatio: '3/4', background: '#1A1A1A', cursor: 'default', borderRadius: '20px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-500"
        style={{ opacity: hovered ? 0.18 : 0.07 }}>
        {item.svg}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 px-6 py-5"
        style={{ borderTop: '1px solid rgba(201,168,76,0.2)', background: 'linear-gradient(to top, rgba(10,10,10,0.95) 60%, transparent)' }}
      >
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.3rem', fontFamily: 'Jost' }}>
          {item.tag}
        </p>
        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: '#F5F0E8' }}>
          {item.titre}
        </p>
        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#B8B0A0', marginTop: '0.2rem' }}>
          {item.sousTitre}
        </p>
      </div>
    </motion.div>
  )
}

export default function Realisations() {
  return (
    <section id="realisations" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Portfolio</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', marginBottom: '1rem', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Nos réalisations <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>emblématiques</span>
          </h2>
          <p className="max-w-2xl mb-14" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.8 }}>
            De la cour royale de Béhanzin aux festivals sacrés, nos créations ont marqué les plus grands évènements culturels du Bénin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {realisations.map((item, i) => (
            <Card key={i} item={item} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
