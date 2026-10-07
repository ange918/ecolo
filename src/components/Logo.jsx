import { Link } from 'react-router-dom'

export default function Logo({ small = false }) {
  return (
    <Link to="/" className="logo" aria-label="Senan Concept — accueil">
      <img src="/logo.jpg" alt="" style={small ? { width: 40, height: 40 } : undefined} />
      <div className="wm">
        SENAN CONCEPT
        <small>Maison · Costumerie · Déco</small>
      </div>
    </Link>
  )
}
