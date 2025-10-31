import React from 'react'
import { Link } from 'react-router-dom'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Contribute = () => {
  const amounts = [
    { amount: 50, label: 'petit soutien symbolique', emoji: '💚' },
    { amount: 100, label: 'ami de la planète', emoji: '🌱' },
    { amount: 200, label: 'protecteur vert', emoji: '🌿' },
    { amount: 500, label: 'ambassadeur durable', emoji: '🌍' },
    { amount: 1000, label: 'bâtisseur éco-responsable', emoji: '🏗️' },
    { amount: 5000, label: 'partenaire or', emoji: '🌟' },
    { amount: 10000, label: 'investisseur vert', emoji: '💼' },
    { amount: 100000, label: 'grand mécène', emoji: '🌳' },
  ]

  const benefits = [
    {
      icon: '♻️',
      title: 'Recyclage',
      description: 'Chaque euro aide à collecter et trier les déchets.',
    },
    {
      icon: '🏭',
      title: 'Infrastructure',
      description: 'Votre soutien finance l\'installation des machines de transformation.',
    },
    {
      icon: '👷',
      title: 'Emploi local',
      description: 'Vous contribuez à créer des postes durables pour les communautés locales.',
    },
  ]

  const testimonials = [
    {
      text: 'Contribuer à ÉCO-MAT, c\'est participer à un projet concret pour la planète.',
      author: 'Inês P., Lisbonne',
    },
    {
      text: 'Une initiative écologique et inspirante, fière d\'en faire partie.',
      author: 'João M., Porto',
    },
    {
      text: 'Un vrai projet d\'avenir. Bravo à l\'équipe !',
      author: 'Clara D., Paris',
    },
  ]

  const handlePayPalClick = (amount) => {
    window.open(
      `https://www.paypal.com/donate?business=eco-mat@portugal.org&amount=${amount}&currency_code=EUR`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-green-deep/70 z-10"></div>
        <img
          src="/Hands_planting_tree_seedling_bc7f113f.png"
          alt="Contribuer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            CONTRIBUEZ À UN AVENIR PLUS VERT 🌍
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Soutenez ÉCO-MAT Portugal et aidez-nous à transformer les déchets en ressources durables.
          </p>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className="text-xl font-open-sans text-text-gray mb-12">
            Chaque don contribue à la construction d'une usine éco-responsable au Portugal. 
            Ensemble, nous pouvons réduire la pollution, créer des emplois et redonner vie aux déchets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-montserrat font-semibold mb-3 text-green-nature">{benefit.title}</h3>
                <p className="text-text-gray font-open-sans">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-4 text-green-deep">
            Choisissez votre montant de contribution
          </h2>
          <p className="text-xl text-center text-text-gray mb-12">
            Votre soutien, quel qu'il soit, fait la différence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {amounts.map((item, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-green-nature hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-3">{item.emoji}</div>
                <div className="text-3xl font-montserrat font-bold text-green-nature mb-2">
                  {item.amount} €
                </div>
                <p className="text-sm font-open-sans text-text-gray mb-4">{item.label}</p>
                <button
                  onClick={() => handlePayPalClick(item.amount)}
                  className="w-full bg-blue-ocean hover:bg-blue-600 text-white px-6 py-2 rounded-full font-montserrat font-semibold transition-colors"
                >
                  Contribuer via PayPal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-8 text-green-deep">
            Transparence et impact
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-green-nature text-2xl mr-4">✅</span>
              <p className="text-text-gray font-open-sans text-lg">
                100 % des contributions sont utilisées pour financer les équipements, la formation et la construction de l'usine.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-green-nature text-2xl mr-4">✅</span>
              <p className="text-text-gray font-open-sans text-lg">
                Chaque trimestre, un rapport public sera publié.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-green-nature text-2xl mr-4">✅</span>
              <p className="text-text-gray font-open-sans text-lg">
                Vous recevrez une attestation de contribution éco-citoyenne.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12 text-green-deep">
            Témoignages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-light-bg rounded-xl p-6 shadow-md">
                <p className="text-text-gray font-open-sans italic mb-4">"{testimonial.text}"</p>
                <p className="text-green-nature font-montserrat font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-deep text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">
            Chaque don compte. Ensemble, construisons l'usine ÉCO-MAT Portugal.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => handlePayPalClick(100)}
              className="bg-green-nature hover:bg-green-hover px-8 py-3 rounded-full font-montserrat font-semibold transition-colors"
            >
              Contribuer maintenant via PayPal
            </button>
            <Link
              to="/contact"
              className="bg-blue-ocean hover:bg-blue-600 px-8 py-3 rounded-full font-montserrat font-semibold transition-colors"
            >
              Devenir partenaire institutionnel
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contribute
