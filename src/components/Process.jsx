const steps = [
  { num: '01', titre: 'Consultation initiale', desc: "Nous prenons le temps de vous écouter : votre projet, votre vision, l'événement, le contexte culturel. Chaque détail compte pour créer quelque chose d'unique.", duree: '1 – 2 jours' },
  { num: '02', titre: 'Conception & esquisse', desc: "Christelle FASSINOU et son équipe élaborent des esquisses détaillées de votre création. Les matières, couleurs et motifs sont sélectionnés avec soin selon la tradition.", duree: '3 – 5 jours' },
  { num: '03', titre: 'Validation du design', desc: "Vous validez les esquisses et proposez vos ajustements. Cette étape collaborative garantit que la création finale vous ressemble parfaitement.", duree: '1 – 3 jours' },
  { num: '04', titre: 'Fabrication artisanale', desc: "La création prend vie dans notre atelier. Chaque couture, broderie et ornement est réalisé à la main avec une précision et une passion exceptionnelles.", duree: '7 – 21 jours' },
  { num: '05', titre: 'Essayage & finitions', desc: "Un essayage est organisé pour les tenues personnalisées. Les finitions sont peaufinées jusqu'à ce que chaque détail soit parfait.", duree: '1 – 2 jours' },
  { num: '06', titre: 'Livraison', desc: "Votre création est livrée avec soin, emballée avec élégance. Nous restons disponibles pour tout ajustement post-livraison.", duree: 'J convenu' },
]

export default function Process() {
  return (
    <section className="section" id="processus">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Processus</p>
            <h2>Notre processus de création</h2>
          </div>
          <p>Six étapes, de la consultation initiale à la livraison soignée.</p>
        </div>
        <div className="grid-3">
          {steps.map(step => (
            <article key={step.num} className="step">
              <div className="n">{step.num}</div>
              <h3>{step.titre}</h3>
              <p>{step.desc}</p>
              <div className="dur">{step.duree}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
