import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    titre: 'Consultation initiale',
    desc: "Nous prenons le temps de vous écouter : votre projet, votre vision, l'événement, le contexte culturel. Chaque détail compte pour créer quelque chose d'unique.",
    duree: '1 – 2 jours',
  },
  {
    num: '02',
    titre: 'Conception & esquisse',
    desc: "Christelle FASSINOU et son équipe élaborent des esquisses détaillées de votre création. Les matières, couleurs et motifs sont sélectionnés avec soin selon la tradition.",
    duree: '3 – 5 jours',
  },
  {
    num: '03',
    titre: 'Validation du design',
    desc: "Vous validez les esquisses et proposez vos ajustements. Cette étape collaborative garantit que la création finale vous ressemble parfaitement.",
    duree: '1 – 3 jours',
  },
  {
    num: '04',
    titre: 'Fabrication artisanale',
    desc: "La création prend vie dans notre atelier. Chaque couture, broderie et ornement est réalisé à la main avec une précision et une passion exceptionnelles.",
    duree: '7 – 21 jours',
  },
  {
    num: '05',
    titre: 'Essayage & finitions',
    desc: "Un essayage est organisé pour les tenues personnalisées. Les finitions sont peaufinées jusqu'à ce que chaque détail soit parfait.",
    duree: '1 – 2 jours',
  },
  {
    num: '06',
    titre: 'Livraison',
    desc: "Votre création est livrée avec soin, emballée avec élégance. Nous restons disponibles pour tout ajustement post-livraison.",
    duree: 'J convenu',
  },
]

export default function Process() {
  return (
    <section id="processus" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">Comment on travaille</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Notre <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>processus</span> de création
          </h2>
        </motion.div>

        <div className="relative">
          {/* Ligne verticale connectant les étapes */}
          <div className="hidden lg:block absolute left-[2.2rem] top-8 bottom-8"
            style={{ width: '1px', background: 'linear-gradient(to bottom, rgba(201,168,76,0), rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.3) 80%, rgba(201,168,76,0))' }} />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex gap-8 items-start py-8"
                style={{ borderBottom: i < steps.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}
              >
                {/* Numéro cercle */}
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center"
                  style={{ border: '1px solid rgba(201,168,76,0.35)', borderRadius: '50%', background: '#111111' }}>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#C9A84C' }}>{step.num}</span>
                </div>

                {/* Contenu */}
                <div className="flex-1 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start pt-3">
                  <div className="lg:col-span-2">
                    <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#F5F0E8', marginBottom: '0.5rem' }}>{step.titre}</h3>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', lineHeight: 1.85 }}>{step.desc}</p>
                  </div>
                  <div className="mt-3 lg:mt-0 lg:text-right">
                    <span style={{
                      display: 'inline-block',
                      fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.72rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)',
                      padding: '0.25rem 0.8rem', borderRadius: '9999px',
                    }}>
                      {step.duree}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
