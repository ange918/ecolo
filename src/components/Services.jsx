import { Link } from 'react-router-dom'
import { CREATIONS, DOMAINES } from '../lib/offerings'

export function Creations() {
  return (
      <section className="section" id="services" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Ce que nous créons</h2>
            </div>
            <p>Quatre domaines d'excellence pour habiller, décorer, transmettre et scénographier.</p>
          </div>
          <div className="grid-4">
            {CREATIONS.map(item => (
              <Link key={item.id} to={item.href} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="ph"><img src={item.img} alt={item.alt} /></div>
                <div className="body">
                  <div className="num">{item.num}</div>
                  <h3>{item.titre}</h3>
                  <p>{item.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}

export function Domaines() {
  return (
      <section className="section" id="domaines">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Domaines</p>
              <h2>Nos domaines de création</h2>
            </div>
          </div>
          <div className="grid-3">
            {DOMAINES.map(item => (
              <article key={item.id} className="card pad">
                <div className="num">{item.num}</div>
                <h3 style={{ fontSize: 24, margin: '8px 0 12px' }}>{item.titre}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  )
}

export default function Services() {
  return (
    <>
      <Creations />
      <Domaines />
    </>
  )
}
