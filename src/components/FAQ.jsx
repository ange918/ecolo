import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: "Dans quels délais réalisez-vous une tenue artistique ?",
    a: "Le délai varie selon la complexité de la création. Une tenue standard prend entre 10 et 15 jours. Pour des costumes royaux ou de festival très élaborés, comptez 3 à 5 semaines. Nous vous conseillons de nous contacter au moins 4 semaines avant la date de votre événement.",
  },
  {
    q: "Travaillez-vous uniquement au Bénin ?",
    a: "Nous sommes basés à Porto Novo, Bénin, mais nous acceptons des commandes depuis l'international. La livraison à l'étranger est possible selon les modalités à convenir ensemble. Certaines cérémonies de prise de mesure peuvent se faire par visioconférence avec guide de mensuration.",
  },
  {
    q: "Quels types d'événements couvrez-vous ?",
    a: "Nous intervenons pour tous types d'événements culturels et privés : festivals, cérémonies traditionnelles, galas, mariages, tournages, spectacles, défilés de mode, et bien plus. Chaque projet est traité de manière unique.",
  },
  {
    q: "Est-il possible de visiter votre atelier ?",
    a: "Oui, nous vous accueillons sur rendez-vous dans notre atelier. C'est même recommandé pour les projets importants. Vous pourrez découvrir notre processus de création, toucher les matières et échanger directement avec Christelle FASSINOU.",
  },
  {
    q: "Proposez-vous des retouches après livraison ?",
    a: "Absolument. Nous accompagnons nos clients jusqu'à parfaite satisfaction. Un essayage final est systématiquement proposé pour les tenues personnalisées, et des ajustements mineurs post-livraison sont pris en charge dans les 7 jours suivant la réception.",
  },
  {
    q: "Quelles matières utilisez-vous pour vos créations ?",
    a: "Nous sélectionnons des matières nobles et authentiques : wax, bazin, soie, velours, tissu kente, broderies fil or et argent, perles artisanales, plumes naturelles selon les besoins. Tous nos fournisseurs sont choisis pour la qualité et l'authenticité de leurs matériaux.",
  },
  {
    q: "Comment se déroule la première consultation ?",
    a: "La première consultation peut se faire en personne ou par visioconférence. Nous discutons de votre projet, de l'événement, de vos inspirations. Aucun frais n'est demandé pour ce premier échange. Un devis est ensuite établi dans les 48h.",
  },
  {
    q: "Acceptez-vous les commandes groupées ?",
    a: "Oui, nous acceptons les commandes groupées pour tous nos articles. Des tarifs préférentiels sont appliqués à partir de 12 pièces. Contactez-nous pour un devis personnalisé selon votre projet.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="section-label" style={{ textAlign: 'center' }}>Questions fréquentes</p>
          <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Tout ce que vous <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>voulez savoir</span>
          </h2>
        </motion.div>

        <div
          className="flex flex-col px-6 sm:px-10"
          style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '28px' }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-6 flex items-center justify-between gap-4"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '1rem', color: open === i ? '#F5F0E8' : '#B8B0A0', transition: 'color 0.2s' }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C9A84C', fontSize: '1.1rem', fontWeight: 300,
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s',
                }}>+</span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.93rem', color: '#B8B0A0', lineHeight: 1.9, paddingBottom: '1.5rem' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
