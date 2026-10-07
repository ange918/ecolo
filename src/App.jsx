import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CollectionPage from './pages/CollectionPage'
import EvenementielPage from './pages/EvenementielPage'
import ServicesPage from './pages/ServicesPage'
import RealisationsPage from './pages/RealisationsPage'
import ContactPage from './pages/ContactPage'
import FormationPage from './pages/FormationPage'
import MentionsPage from './pages/MentionsPage'
import AdminPage from './pages/AdminPage'

function HashScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    scroll()
    const t1 = window.setTimeout(scroll, 120)
    const t2 = window.setTimeout(scroll, 450)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname, hash])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/andychris')

  return (
    <>
      <HashScroll />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/qui-sommes-nous" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/formation" element={<FormationPage />} />
          <Route path="/realisations" element={<RealisationsPage />} />
          <Route path="/galerie/:slug" element={<CollectionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/evenementiel" element={<EvenementielPage />} />
          <Route path="/mentions-legales" element={<MentionsPage />} />
          <Route path="/andychris" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
