import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    nom: 'EFAMBE',
    titre: 'Artiste & Performeur',
    texte: "Senan Concept a transformé ma vision artistique en réalité. Les tenues créées pour ma performance étaient d'une précision et d'une beauté à couper le souffle. AndyChris a su capturer l'essence de mon univers. Je ne travaillerai avec personne d'autre.",
    tag: 'Tenue artistique',
  },
  {
    nom: 'Pepe Oleka',
    titre: 'Artiste musical',
    texte: "Pour mon dernier clip, j'avais besoin de costumes qui parlent d'Afrique sans clichés. Senan Concept a répondu au-delà de mes espérances — des pièces modernes, ancrées dans la tradition. Un travail d'orfèvre.",
    tag: 'Costumerie',
  },
  {
    nom: 'Sagbohan Danialou',
    titre: 'Artiste & Musicien traditionnel',
    texte: "Les tenues réalisées pour mes prestations scéniques incarnent parfaitement la fierté culturelle du Bénin. Senan Concept comprend la profondeur de notre héritage et sait le magnifier avec talent et respect.",
    tag: 'Tenue de scène',
  },
  {
    nom: 'Stéphanie MONTCHO',
    titre: 'Organisatrice d\'événements',
    texte: "J'ai fait appel à Senan Concept pour plusieurs événements haut de gamme. Chaque fois, la qualité est irréprochable, les délais respectés et le soin apporté au client exceptionnel. C'est ma référence absolue pour la costumerie au Bénin.",
    tag: 'Événementiel',
  },
  {
    nom: 'Maeva Gomez',
    titre: 'Créatrice de mode',
    texte: "En tant que professionnelle du secteur, je suis exigeante. Senan Concept m'a impressionnée par la finesse de ses finitions, la qualité des matières choisies et surtout par la créativité débordante d'AndyChris. Un talent rare.",
    tag: 'Mode artisanale',
  },
  {
    nom: 'Trône de Béhanzin',
    titre: 'Maison royale du Bénin',
    texte: "Les costumes de cour réalisés par Senan Concept pour les cérémonies du Trône de Béhanzin honorent dignement notre royauté. Chaque pièce témoigne d'une connaissance profonde et d'un respect sincère pour notre histoire.",
    tag: 'Costumerie royale',
  },
  {
    nom: 'Festival des Masques',
    titre: 'Direction artistique',
    texte: "Depuis notre collaboration avec Senan Concept, nos participants se présentent avec des tenues qui racontent une histoire. L'authenticité des créations contribue à l'âme même de notre festival. Un partenariat que nous renouvelons chaque année.",
    tag: 'Festival culturel',
  },
  {
    nom: 'Vodouns Days',
    titre: 'Comité d\'organisation',
    texte: "Les parures et tenues cérémonielles créées par Senan Concept pour les Vodouns Days ont élevé notre célébration à un niveau de beauté et de sacralité inédit. AndyChris comprend le spirituel autant que l'esthétique.",
    tag: 'Cérémonie spirituelle',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const goTo = (index) => {
    setDir(index > active ? 1 : -1)
    setActive(index)
  }
  const prev = () => goTo(active === 0 ? testimonials.length - 1 : active - 1)
  const next = () => goTo(active === testimonials.length - 1 ? 0 : active + 1)

  const t = testimonials[active]

  return (
    <section id="temoignages" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">Témoignages</p>
          <h2 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: '#F5F0E8' }}>
            Ce que disent <span style={{ color: '#C9A84C' }}>nos clients</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste témoins */}
          <div className="flex flex-col gap-2">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  textAlign: 'left', padding: '0.9rem 1.2rem',
                  background: active === i ? '#1A1A1A' : 'transparent',
                  borderLeft: `2px solid ${active === i ? '#C9A84C' : 'rgba(201,168,76,0.1)'}`,
                  cursor: 'pointer', border: 'none', transition: 'all 0.25s',
                  borderLeftWidth: '2px', borderLeftStyle: 'solid',
                }}
              >
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: active === i ? 600 : 400, fontSize: '0.9rem', color: active === i ? '#F5F0E8' : '#B8B0A0' }}>
                  {t.nom}
                </p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.72rem', color: active === i ? '#C9A84C' : 'rgba(184,176,160,0.5)', marginTop: '0.15rem' }}>
                  {t.tag}
                </p>
              </button>
            ))}
          </div>

          {/* Témoignage actif */}
          <div className="lg:col-span-2 relative overflow-hidden" style={{ minHeight: '280px' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4 }}
                className="p-8 lg:p-12 h-full flex flex-col justify-between"
                style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.12)' }}
              >
                {/* Guillemet décoratif */}
                <div>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '5rem', color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: '-1rem' }}>"</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1.05rem', color: '#D0C8B8', lineHeight: 1.9, fontStyle: 'italic' }}>
                    {t.texte}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6"
                  style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                  <div>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#F5F0E8' }}>{t.nom}</p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#C9A84C', marginTop: '0.2rem' }}>{t.titre}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={prev} style={{ width: '38px', height: '38px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50%', background: 'transparent', cursor: 'pointer', color: '#C9A84C', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>←</button>
                    <button onClick={next} style={{ width: '38px', height: '38px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50%', background: 'transparent', cursor: 'pointer', color: '#C9A84C', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>→</button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
