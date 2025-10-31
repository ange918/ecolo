import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PartnerBand from '../components/PartnerBand'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitted(false)
      }, 3000)
    }
  }

  const socialLinks = [
    { name: 'Site web', icon: 'bx bxs-globe', url: '#', color: 'text-green-600' },
    { name: 'Facebook', icon: 'bx bxl-facebook-circle', url: 'https://facebook.com/ecomatportugal', color: 'text-blue-600' },
    { name: 'Twitter', icon: 'bx bxl-twitter', url: 'https://twitter.com/ecomatpt', color: 'text-sky-500' },
    { name: 'Instagram', icon: 'bx bxl-instagram', url: 'https://instagram.com/ecomat.pt', color: 'text-pink-600' },
    { name: 'LinkedIn', icon: 'bx bxl-linkedin-square', url: 'https://linkedin.com/company/ecomatportugal', color: 'text-blue-700' },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-green-deep/60 z-10"></div>
        <img
          src="/Portuguese_countryside_landscape_c53d6ded.png"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 flex items-center justify-center gap-3">
            <i className='bx bx-leaf text-green-300'></i>
            CONTACTEZ-NOUS
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Une question, une idée ou une envie de contribuer ? L'équipe ÉCO-MAT Portugal est à votre écoute.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep">
                Informations de contact
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <i className='bx bxs-map text-green-nature text-3xl mr-4'></i>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                    <p className="text-text-gray">
                      Av. da Liberdade 100<br />
                      1250-140 Lisboa, Portugal
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className='bx bxs-phone text-green-nature text-3xl mr-4'></i>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                    <p className="text-text-gray">+351 912 345 678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className='bx bxs-envelope text-green-nature text-3xl mr-4'></i>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-text-gray">contact@eco-mat.pt</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className='bx bxs-time text-green-nature text-3xl mr-4'></i>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Horaires</h3>
                    <p className="text-text-gray">Lundi - Vendredi : 9h - 18h</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep">
                Notre localisation
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.9709936764394!2d-9.145863984681084!3d38.7222524796155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19347f3d1c3d51%3A0x6b82f18752eab0bb!2sAv.%20da%20Liberdade%2C%20Lisboa%2C%20Portugal!5e0!3m2!1sfr!2spt!4v1635789456789"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Carte de localisation ÉCO-MAT Portugal"
                  className="w-full h-80"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-4 text-green-deep flex items-center justify-center gap-3">
              <i className='bx bx-envelope-open text-green-nature'></i>
              Envoyez-nous un message
            </h2>
            <p className="text-text-gray font-open-sans">
              Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-nature/10 border-l-4 border-green-nature p-6 rounded mb-6">
              <p className="text-green-nature font-montserrat font-semibold">
                ✅ Merci ! Votre message a bien été envoyé.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block font-montserrat font-semibold mb-2 text-text-gray">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-nature focus:outline-none font-open-sans"
                placeholder="Votre nom"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block font-montserrat font-semibold mb-2 text-text-gray">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-nature focus:outline-none font-open-sans"
                placeholder="votre@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block font-montserrat font-semibold mb-2 text-text-gray">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-nature focus:outline-none font-open-sans"
                placeholder="Sujet de votre message"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block font-montserrat font-semibold mb-2 text-text-gray">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-nature focus:outline-none font-open-sans resize-none"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-nature hover:bg-green-hover text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep">
            Suivez notre aventure écologique
          </h2>
          <p className="text-text-gray font-open-sans mb-8 text-lg">
            Restez informé de nos avancées et rejoignez notre communauté.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 w-32 group"
              >
                <i className={`${social.icon} ${social.color} text-5xl mb-2 group-hover:scale-110 transition-transform`}></i>
                <span className="font-semibold text-text-gray">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-deep text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Envie de soutenir notre mission ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/project"
              className="bg-white text-green-deep hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Découvrir le projet
            </Link>
            <Link
              to="/contribute"
              className="bg-green-nature hover:bg-green-hover px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contribuer maintenant
            </Link>
          </div>
        </div>
      </section>

      <PartnerBand />

      <Footer />
    </div>
  )
}

export default Contact
