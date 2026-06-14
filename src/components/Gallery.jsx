import { motion } from 'framer-motion'
import { useState } from 'react'

const galleryItems = [
  { label: 'Costume de cour', category: 'Costumerie', color: '#1A1A1A', svgOpacity: 0.12 },
  { label: 'Tenue festival', category: 'Festival', color: '#161616', svgOpacity: 0.1 },
  { label: 'Décoration salon', category: 'Décoration', color: '#1C1C1C', svgOpacity: 0.11 },
  { label: 'Pouf artisanal', category: 'Poufs', color: '#181818', svgOpacity: 0.13 },
  { label: 'Parure vodoun', category: 'Cérémonie', color: '#1A1A1A', svgOpacity: 0.1 },
  { label: 'Tenue royale', category: 'Costumerie', color: '#161616', svgOpacity: 0.12 },
  { label: 'Décoration chambre', category: 'Décoration', color: '#1C1C1C', svgOpacity: 0.11 },
  { label: 'Costume scénique', category: 'Costumerie', color: '#181818', svgOpacity: 0.13 },
]

const svgs = [
  // Robe
  <svg key="a" width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="40" cy="20" rx="12" ry="14" /><path d="M28 32 C22 50 20 70 22 90 L58 90 C60 70 58 50 52 32 Z" /><path d="M22 90 C16 100 14 112 16 118 L64 118 C66 112 64 100 58 90 Z" /><path d="M33 14 L36 6 L40 10 L44 6 L47 14 Z" />
  </svg>,
  // Masque
  <svg key="b" width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <path d="M20 40 Q20 8 40 8 Q60 8 60 40 L58 70 Q40 80 22 70 Z" /><ellipse cx="30" cy="42" rx="7" ry="9" /><ellipse cx="50" cy="42" rx="7" ry="9" /><path d="M32 58 Q40 64 48 58" /><path d="M20 40 L10 55 L18 58" /><path d="M60 40 L70 55 L62 58" /><path d="M30 8 L24 0 M40 8 L40 0 M50 8 L56 0" />
  </svg>,
  // Canapé décoré
  <svg key="c" width="100" height="80" viewBox="0 0 100 80" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <rect x="10" y="30" width="80" height="35" rx="2" /><rect x="4" y="22" width="16" height="43" rx="2" /><rect x="80" y="22" width="16" height="43" rx="2" /><rect x="10" y="24" width="80" height="14" rx="2" /><path d="M18 65 L18 75 M82 65 L82 75" /><path d="M25 42 Q50 38 75 42" strokeDasharray="3 2" />
  </svg>,
  // Pouf
  <svg key="d" width="90" height="70" viewBox="0 0 90 70" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="45" cy="35" rx="35" ry="20" /><ellipse cx="45" cy="48" rx="35" ry="12" /><path d="M10 35 L10 48 M80 35 L80 48" /><ellipse cx="45" cy="35" rx="18" ry="10" strokeDasharray="3 2" /><path d="M28 28 Q45 24 62 28" strokeDasharray="3 2" /><path d="M22 42 Q45 36 68 42" strokeDasharray="3 2" />
  </svg>,
  // Silhouette vodoun
  <svg key="e" width="70" height="130" viewBox="0 0 70 130" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="35" cy="18" rx="10" ry="12" /><path d="M25 28 C18 45 17 70 20 90 L50 90 C53 70 52 45 45 28 Z" /><path d="M20 90 C14 105 12 118 14 126 L56 126 C58 118 56 105 50 90 Z" /><path d="M25 35 C16 46 12 60 14 74" /><path d="M45 35 C54 46 58 60 56 74" /><path d="M14 74 C8 80 5 88 6 96" /><path d="M56 74 C62 80 65 88 64 96" />
  </svg>,
  // Costume royal long
  <svg key="f" width="80" height="130" viewBox="0 0 80 130" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="40" cy="18" rx="10" ry="13" /><path d="M30 30 C24 55 22 75 24 100 L56 100 C58 75 56 55 50 30 Z" /><path d="M24 100 C18 112 16 122 18 128 L62 128 C64 122 62 112 56 100 Z" /><path d="M30 40 C20 50 16 65 18 80" /><path d="M50 40 C60 50 64 65 62 80" /><path d="M34 8 L37 0 L40 4 L43 0 L46 8 Z" /><path d="M28 65 Q40 60 52 65" strokeDasharray="3 2" /><path d="M26 80 Q40 74 54 80" strokeDasharray="3 2" />
  </svg>,
  // Chambre décorée
  <svg key="g" width="100" height="90" viewBox="0 0 100 90" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <rect x="8" y="40" width="84" height="44" rx="2" /><path d="M8 54 L92 54" /><rect x="18" y="4" width="64" height="38" rx="2" /><path d="M18 20 L82 20 M50 4 L50 42" /><path d="M14 84 L14 90 M86 84 L86 90" />
  </svg>,
  // Costume scénique
  <svg key="h" width="80" height="130" viewBox="0 0 80 130" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="40" cy="16" rx="11" ry="13" /><path d="M29 28 C20 52 18 78 22 108 L58 108 C62 78 60 52 51 28 Z" /><path d="M22 108 C18 116 16 124 18 128 L62 128 C64 124 62 116 58 108 Z" /><path d="M29 38 C16 54 12 74 15 94" /><path d="M51 38 C64 54 68 74 65 94" /><path d="M30 60 Q40 54 50 60" strokeDasharray="4 2" /><path d="M28 80 Q40 73 52 80" strokeDasharray="4 2" />
  </svg>,
]

const categories = ['Tout', 'Costumerie', 'Festival', 'Cérémonie', 'Décoration', 'Poufs']

export default function Gallery() {
  const [filter, setFilter] = useState('Tout')
  const filtered = filter === 'Tout' ? galleryItems : galleryItems.filter(i => i.category === filter)

  return (
    <section id="galerie" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label">Galerie</p>
          <h2 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: '#F5F0E8', marginBottom: '1.5rem' }}>
            Notre <span style={{ color: '#C9A84C' }}>univers</span> en images
          </h2>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.8rem',
                  padding: '0.4rem 1rem', borderRadius: '9999px', cursor: 'pointer',
                  border: '1px solid', transition: 'all 0.2s',
                  borderColor: filter === cat ? '#C9A84C' : 'rgba(201,168,76,0.2)',
                  background: filter === cat ? '#C9A84C' : 'transparent',
                  color: filter === cat ? '#0A0A0A' : '#B8B0A0',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4', background: item.color, cursor: 'pointer' }}
            >
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{ opacity: item.svgOpacity }}>
                {svgs[i % svgs.length]}
              </div>
              <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 40%, transparent)' }}>
                <div className="p-4">
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#F5F0E8' }}>{item.label}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.72rem', color: '#C9A84C', marginTop: '0.15rem' }}>{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
