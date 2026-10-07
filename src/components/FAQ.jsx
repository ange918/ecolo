import { useState } from 'react'

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
    <section className="section section-alt" id="faq">
      <div className="wrap">
        <div className="section-head center">
          <p className="eyebrow">FAQ</p>
          <h2>Tout ce que vous voulez savoir</h2>
        </div>
        <div className="faq">
          {faqs.map((faq, i) => (
            <div className="faq-item" key={faq.q}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <h4>{faq.q}</h4>
                <span className="plus">{open === i ? '–' : '+'}</span>
              </button>
              {open === i && <p className="a">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
