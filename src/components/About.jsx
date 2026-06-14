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
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="section-label">Notre identité</p>
          <h2
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
            className="text-blanc"
          >
            L'excellence au service<br />de la culture
          </h2>
          <div className="divider" />

          <div className="space-y-5 mb-12">
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.9, fontSize: '0.9rem' }} className="text-texte">
              Fondée au cœur de Cotonou, Senan Concept est une maison artisanale dédiée à la valorisation du patrimoine culturel béninois à travers la création de tenues artistiques d'exception. Chaque pièce que nous concevons est une ode à l'histoire, au sacré et à la beauté.
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.9, fontSize: '0.9rem' }} className="text-texte">
              Nos créations ont habillé les plus grandes cérémonies du Bénin — des costumes de cour de la royauté Fon aux tenues rituelles des Vodouns Days, en passant par les parures du Festival des Masques. Chaque événement est une occasion de tisser l'art et la mémoire.
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, lineHeight: 1.9, fontSize: '0.9rem' }} className="text-texte">
              Au-delà de la costumerie, Senan Concept investit également la décoration d'intérieure et la fabrication artisanale de poufs, apportant la chaleur et l'authenticité de l'artisanat africain dans vos espaces de vie.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6"
                style={{ border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <p
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: '2.8rem', color: '#C9A84C', lineHeight: 1 }}
                >
                  {stat.value}
                </p>
                <p
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.4rem' }}
                >
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
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative"
          style={{ height: '500px', border: '1px solid rgba(201,168,76,0.2)', background: '#1A1A1A' }}
        >
          {/* SVG décoratif silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="200" height="320" viewBox="0 0 200 320" fill="none" style={{ opacity: 0.1 }}>
              {/* Corps */}
              <ellipse cx="100" cy="60" rx="28" ry="35" stroke="#C9A84C" strokeWidth="1.5" />
              {/* Torse */}
              <path d="M72 90 C60 120 55 160 60 200 L140 200 C145 160 140 120 128 90 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
              {/* Robe évasée */}
              <path d="M60 200 C40 240 30 280 35 310 L165 310 C170 280 160 240 140 200 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
              {/* Bras gauche */}
              <path d="M72 100 C55 115 45 140 50 165" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              {/* Bras droit */}
              <path d="M128 100 C145 115 155 140 150 165" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              {/* Motifs décoratifs */}
              <path d="M70 220 Q100 210 130 220" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" />
              <path d="M65 240 Q100 228 135 240" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" />
              <path d="M62 260 Q100 248 138 260" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" />
              {/* Couronne */}
              <path d="M78 30 L82 15 L90 25 L100 10 L110 25 L118 15 L122 30 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Citation en bas */}
          <div
            className="absolute bottom-0 left-0 right-0 px-8 py-6"
            style={{ borderTop: '1px solid rgba(201,168,76,0.2)', background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)' }}
          >
            <p
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', color: '#E8D5A0', lineHeight: 1.6 }}
            >
              "Habiller une culture, c'est honorer une identité."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
