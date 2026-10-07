const reasons = [
  { num: '01', tag: 'Tradition', titre: 'Savoir-faire ancestral', desc: "Chaque création puise dans des techniques transmises de génération en génération, garantissant une authenticité et une qualité irréprochables." },
  { num: '02', tag: 'Sur-mesure', titre: 'Créations 100% sur-mesure', desc: "Nous n'utilisons aucun patron standard. Chaque pièce est pensée, discutée et façonnée exclusivement pour vous, selon vos besoins et votre vision." },
  { num: '03', tag: 'Légitimité', titre: 'Référence culturelle reconnue', desc: "Nos réalisations pour le Trône de Béhanzin, le Festival des Masques et les Vodouns Days témoignent de notre légitimité au cœur du patrimoine béninois." },
  { num: '04', tag: 'Fiabilité', titre: 'Délais respectés', desc: "Que ce soit pour un festival, une cérémonie royale ou un événement privé, nous livrons dans les délais convenus, sans jamais sacrifier la qualité." },
  { num: '05', tag: 'Proximité', titre: 'Accompagnement personnalisé', desc: "De la première consultation à la livraison finale, Christelle FASSINOU et son équipe vous accompagnent à chaque étape pour une expérience unique et mémorable." },
  { num: '06', tag: 'Qualité', titre: 'Matières nobles & durables', desc: "Nous sélectionnons rigoureusement des tissus de qualité, des fils brodés et des matériaux durables pour des créations qui traversent le temps." },
]

export default function WhyUs() {
  return (
    <section className="section section-alt" id="pourquoi-nous">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Pourquoi nous</p>
            <h2>Ce qui nous rend uniques</h2>
          </div>
          <p>Depuis plus de 5 ans, Senan Concept s'est imposée comme la maison de mode de référence pour les créations culturelles au Bénin.</p>
        </div>
        <div className="grid-3">
          {reasons.map(r => (
            <article key={r.num} className="why">
              <div className="pt">Point {r.num} · {r.tag}</div>
              <h3>{r.titre}</h3>
              <p>{r.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
