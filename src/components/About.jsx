import { motion } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Festivals majeurs' },
  { value: '100%', label: 'Fait à la main' },
  { value: '15+', label: "Années d'expérience" },
  { value: 'BJ', label: 'Bénin, Afrique de l\'Ouest' },
]

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Colonne texte */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="section-label mb-4">Qui sommes-nous</p>
          <h2
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              lineHeight: 1.15,
              color: '#F5F0E8',
            }}
          >
            L'excellence au service<br />
            de la <span style={{ color: '#C9A84C' }}>culture</span>
          </h2>
          <div className="divider" />

          <div className="space-y-5 mb-12">
            {[
              "Fondée au cœur de Cotonou, Senan Concept est une maison artisanale dédiée à la valorisation du patrimoine culturel béninois à travers la création de tenues artistiques d'exception.",
              "Nos créations ont habillé les plus grandes cérémonies du Bénin : des costumes de cour de la royauté Fon aux tenues rituelles des Vodouns Days, en passant par les parures du Festival des Masques.",
              "Au-delà de la costumerie, Senan Concept investit également la décoration d'intérieure et la fabrication artisanale de poufs, apportant l'authenticité de l'artisanat africain dans vos espaces de vie.",
            ].map((text, i) => (
              <p key={i} style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.9, fontSize: '0.95rem', color: '#B8B0A0' }}>
                {text}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(201,168,76,0.15)' }}>
            {stats.map((stat, i) => (
              <div key={i} className="p-6" style={{ background: '#111111' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '2.5rem', color: '#C9A84C', lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.5rem' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Colonne visuelle */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative"
          style={{ height: '520px', border: '1px solid rgba(201,168,76,0.18)', background: '#1A1A1A' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="200" height="320" viewBox="0 0 200 320" fill="none" style={{ opacity: 0.1 }}>
              <ellipse cx="100" cy="60" rx="28" ry="35" stroke="#C9A84C" strokeWidth="1.5" />
              <path d="M72 90 C60 120 55 160 60 200 L140 200 C145 160 140 120 128 90 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
              <path d="M60 200 C40 240 30 280 35 310 L165 310 C170 280 160 240 140 200 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
              <path d="M72 100 C55 115 45 140 50 165" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M128 100 C145 115 155 140 150 165" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M70 220 Q100 210 130 220" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" />
              <path d="M65 240 Q100 228 135 240" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" />
              <path d="M62 260 Q100 248 138 260" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" />
              <path d="M78 30 L82 15 L90 25 L100 10 L110 25 L118 15 L122 30 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 px-8 py-6"
            style={{ borderTop: '1px solid rgba(201,168,76,0.18)', background: 'linear-gradient(to top, rgba(10,10,10,0.95), transparent)' }}
          >
            <p style={{ fontFamily: 'Jost, sans-serif', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', color: '#E8D5A0', lineHeight: 1.7 }}>
              "Habiller une culture, c'est honorer une identité."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
