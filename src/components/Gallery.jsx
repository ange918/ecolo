import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const galleryItems = [
  { src: '/gallery/img16.jpg', category: 'Costumerie' },
  { src: '/gallery/img17.jpg', category: 'Costumerie' },
  { src: '/gallery/img15.jpg', category: 'Costumerie' },
  { src: '/gallery/img18.jpg', category: 'Cérémonie' },
  { src: '/gallery/img6.jpg', category: 'Costumerie' },
  { src: '/gallery/img10.jpg', category: 'Costumerie' },
  { src: '/gallery/img7.jpg', category: 'Costumerie' },
  { src: '/gallery/img8.jpg', category: 'Costumerie' },
  { src: '/gallery/img20.jpg', category: 'Festival' },
  { src: '/gallery/img1.jpg', category: 'Festival' },
  { src: '/gallery/img5.jpg', category: 'Festival' },
  { src: '/gallery/img2.jpg', category: 'Festival' },
  { src: '/gallery/img4.jpg', category: 'Cérémonie' },
  { src: '/gallery/img3.jpg', category: 'Cérémonie' },
  { src: '/gallery/img11.jpg', category: 'Cérémonie' },
  { src: '/gallery/img9.jpg', category: 'Accessoires' },
  { src: '/gallery/img19.jpg', category: 'Accessoires' },
  { src: '/gallery/img12.jpg', category: 'Accessoires' },
  { src: '/gallery/img13.jpg', category: 'Accessoires' },
  { src: '/gallery/img14.jpg', category: 'Accessoires' },
]

const categories = ['Tout', 'Costumerie', 'Festival', 'Cérémonie', 'Accessoires']

export default function Gallery() {
  const [filter, setFilter] = useState('Tout')
  const [dbItems, setDbItems] = useState([])

  useEffect(() => {
    let active = true
    supabase
      .from('gallery_photos')
      .select('image_url, category')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (active && data) {
          setDbItems(data.map(d => ({ src: d.image_url, category: d.category })))
        }
      })
    return () => { active = false }
  }, [])

  const allItems = [...dbItems, ...galleryItems]
  const filtered = filter === 'Tout' ? allItems : allItems.filter(i => i.category === filter)

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
          <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', marginBottom: '1.5rem', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Notre <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>univers</span> en images
          </h2>

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

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="overflow-hidden"
                style={{ aspectRatio: '3/4', borderRadius: '14px' }}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
