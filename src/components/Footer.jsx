import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../lib/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <Logo small />
            <p style={{ marginTop: 16, maxWidth: 360 }}>
              Maison de mode d'excellence basée à Porto-Novo, Bénin. Tenues artistiques sur mesure, décoration d'événements et d'intérieurs à l'africaine et formations, au service des cultures et des mémoires.
            </p>
            <div className="social">
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <div>
            <h4>Navigation</h4>
            <Link className="foot-link" to="/services">Nos services</Link>
            <Link className="foot-link" to="/realisations">Réalisations</Link>
            <Link className="foot-link" to="/formation">Formations</Link>
            <Link className="foot-link" to="/#temoignages">Témoignages</Link>
            <Link className="foot-link" to="/#faq">FAQ</Link>
            <Link className="foot-link" to="/evenementiel">Événementiel · IFA</Link>
            <Link className="foot-link" to="/qui-sommes-nous">Qui sommes-nous</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{SITE.city}</p>
            <a className="foot-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a className="foot-link" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
            <p>{SITE.hours}</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Senan Concept · Tous droits réservés · Porto-Novo, Bénin</span>
          <span>
            Fondée par {SITE.founder}
            {' · '}
            <Link to="/mentions-legales">Mentions légales</Link>
            {' · '}
            <a href="https://angeakonde-dev.vercel.app/" target="_blank" rel="noreferrer">Réalisé par Ange Akonde</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
