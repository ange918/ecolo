import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import PartnerBand from '../components/PartnerBand'

const PayPalButtonWrapper = ({ amount, label }) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: 'EUR',
          },
          description: `Contribution ÉCO-MAT Portugal - ${label}`,
        },
      ],
    })
  }

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture()
      setSuccess(true)
      setError(null)
      console.log('Payment successful:', order)
    } catch (err) {
      setError('Erreur lors du paiement. Veuillez réessayer.')
      console.error('Payment error:', err)
    }
  }

  const onError = (err) => {
    setError('Erreur lors de la transaction. Veuillez réessayer.')
    console.error('PayPal error:', err)
  }

  if (success) {
    return (
      <div className="bg-green-nature/10 border-2 border-green-nature rounded-lg p-4 text-center">
        <p className="text-green-nature font-montserrat font-semibold">✅ Merci pour votre contribution!</p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm">
          {error}
        </div>
      )}
      <PayPalButtons
        style={{ layout: 'vertical', label: 'donate' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  )
}

const Contribute = () => {
  const [selectedAmount, setSelectedAmount] = useState(null)

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
      image: '/Sorted_plastic_recycling_facility_f1402ba9.png',
      title: 'Recyclage',
      description: 'Chaque euro aide à financer la collecte, le tri et le traitement des déchets plastiques et textiles pour leur donner une seconde vie.',
      icon: 'bx-recycle',
      iconText: 'Impact direct'
    },
    {
      image: '/Eco_factory_nature_scene_f4ad2bf6.png',
      title: 'Infrastructure',
      description: 'Votre soutien finance l\'installation des machines de transformation et la construction d\'une usine éco-responsable moderne au Portugal.',
      icon: 'bx-building',
      iconText: 'Équipements durables'
    },
    {
      image: '/Recycling_team_workshop_collaboration_a4789468.png',
      title: 'Emploi local',
      description: 'Vous contribuez à créer des postes durables et qualifiés pour les communautés locales dans le secteur de l\'économie verte.',
      icon: 'bx-group',
      iconText: 'Développement social'
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

  const paypalOptions = {
    'client-id': 'test',
    currency: 'EUR',
    intent: 'capture',
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
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 flex items-center justify-center gap-3 flex-wrap">
            <i className='bx bx-world text-green-300'></i>
            CONTRIBUEZ À UN AVENIR PLUS VERT
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Soutenez ÉCO-MAT Portugal et aidez-nous à transformer les déchets en ressources durables.
          </p>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-xl text-text-gray">
              Chaque don contribue à la construction d'une usine éco-responsable au Portugal. 
              Ensemble, nous pouvons réduire la pollution, créer des emplois et redonner vie aux déchets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                image={benefit.image}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
                iconText={benefit.iconText}
              />
            ))}
          </div>
        </div>
      </section>

      <PayPalScriptProvider options={paypalOptions}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-4 text-green-deep">
              Choisissez votre montant de contribution
            </h2>
            <p className="text-xl text-center text-text-gray mb-4">
              Votre soutien, quel qu'il soit, fait la différence.
            </p>
            <p className="text-sm text-center text-text-gray mb-12">
              Note: Pour utiliser PayPal en production, remplacez le client-id 'test' par votre vrai client-id PayPal dans le code.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {amounts.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white border-2 rounded-xl p-6 text-center transition-all ${
                    selectedAmount === item.amount
                      ? 'border-green-nature shadow-lg'
                      : 'border-gray-200 hover:border-green-nature hover:shadow-lg'
                  }`}
                >
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <div className="text-3xl font-montserrat font-bold text-green-nature mb-2">
                    {item.amount} €
                  </div>
                  <p className="text-sm font-open-sans text-text-gray mb-4">{item.label}</p>
                  {selectedAmount === item.amount ? (
                    <PayPalButtonWrapper amount={item.amount} label={item.label} />
                  ) : (
                    <button
                      onClick={() => setSelectedAmount(item.amount)}
                      className="w-full bg-blue-ocean hover:bg-blue-600 text-white px-6 py-2 rounded-full font-montserrat font-semibold transition-colors"
                    >
                      Sélectionner
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </PayPalScriptProvider>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-8 text-green-deep">
            Transparence et impact
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <i className='bx bx-check-circle text-green-nature text-2xl mr-4'></i>
              <p className="text-text-gray text-lg">
                100 % des contributions sont utilisées pour financer les équipements, la formation et la construction de l'usine.
              </p>
            </div>
            <div className="flex items-start">
              <i className='bx bx-check-circle text-green-nature text-2xl mr-4'></i>
              <p className="text-text-gray text-lg">
                Chaque trimestre, un rapport public sera publié.
              </p>
            </div>
            <div className="flex items-start">
              <i className='bx bx-check-circle text-green-nature text-2xl mr-4'></i>
              <p className="text-text-gray text-lg">
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
          <h2 className="text-3xl font-bold mb-4">
            Chaque don compte. Ensemble, construisons l'usine ÉCO-MAT Portugal.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="#contribution-section"
              className="bg-green-nature hover:bg-green-hover px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contribuer maintenant via PayPal
            </a>
            <Link
              to="/contact"
              className="bg-blue-ocean hover:bg-blue-600 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Devenir partenaire institutionnel
            </Link>
          </div>
        </div>
      </section>

      <PartnerBand />

      <Footer />
    </div>
  )
}

export default Contribute
