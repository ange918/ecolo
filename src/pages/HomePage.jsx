import Hero from '../components/Hero'
import AboutSnippet from '../components/AboutSnippet'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Realisations from '../components/Realisations'
import Gallery from '../components/Gallery'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Realisations />
      <Gallery />
      <FAQ />
      <Contact />
    </>
  )
}
