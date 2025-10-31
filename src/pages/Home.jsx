import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import PartnerBand from '../components/PartnerBand'

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
  }

  const slides = [
    {
      image: '/Eco_factory_nature_scene_f4ad2bf6.png',
      title: 'ÉCO-MAT Portugal',
      description: 'Transformons les déchets en opportunités pour un avenir durable.',
    },
    {
      image: '/Sorted_plastic_recycling_facility_f1402ba9.png',
      title: 'REDONNEZ VIE AUX DÉCHETS PLASTIQUES',
      description: 'Nous collectons, trions et transformons les plastiques pour leur donner une seconde vie.',
    },
    {
      image: '/Waste_sorting_industrial_process_75cdeb88.png',
      title: 'RECYCLAGE DES ORDURES',
      description: 'Réinventons la gestion des déchets pour construire un Portugal plus propre et plus vert.',
    },
  ]

  const objectives = [
    {
      image: '/Recycled_plastic_granules_closeup_7e365a55.png',
      title: 'Réduire la pollution plastique',
      description: 'Nous luttons activement contre les déchets plastiques non recyclés en collectant et traitant les matériaux pour leur donner une seconde vie utile.',
      icon: 'bx-recycle',
      iconText: 'Recyclage efficace'
    },
    {
      image: '/Recycling_team_workshop_collaboration_a4789468.png',
      title: 'Créer des emplois verts',
      description: 'Notre projet génère des opportunités d\'emploi locales durables dans le secteur du recyclage et de la valorisation des déchets.',
      icon: 'bx-group',
      iconText: 'Emplois locaux'
    },
    {
      image: '/Waste_sorting_industrial_process_75cdeb88.png',
      title: 'Valoriser les déchets',
      description: 'Nous transformons les déchets plastiques et textiles en ressources précieuses pour l\'industrie et la construction durable.',
      icon: 'bx-cog',
      iconText: 'Transformation'
    },
    {
      image: '/Hands_planting_tree_seedling_bc7f113f.png',
      title: "Promouvoir l'économie circulaire",
      description: 'Sensibilisation et éducation du public aux pratiques de recyclage et à l\'importance d\'une économie circulaire pour notre planète.',
      icon: 'bx-leaf',
      iconText: 'Développement durable'
    },
  ]

  const problems = [
    'Pollution plastique',
    'Déchets industriels non traités',
    'Manque de sensibilisation au recyclage',
    'Dépendance aux matières premières vierges',
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-screen">
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-center mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-open-sans text-center max-w-3xl mb-8">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/project"
                    className="bg-green-nature hover:bg-green-hover text-white px-8 py-3 rounded-full font-montserrat font-semibold transition-colors"
                  >
                    Découvrir le projet
                  </Link>
                  <Link
                    to="/contribute"
                    className="bg-blue-ocean hover:bg-blue-600 text-white px-8 py-3 rounded-full font-montserrat font-semibold transition-colors"
                  >
                    Contribuer
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-deep">
            Nos Objectifs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((obj, index) => (
              <Card
                key={index}
                image={obj.image}
                title={obj.title}
                description={obj.description}
                icon={obj.icon}
                iconText={obj.iconText}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep">
              À propos d'ÉCO-MAT Portugal
            </h2>
            <p className="text-lg font-open-sans text-text-gray mb-8 leading-relaxed">
              ÉCO-MAT Portugal est un projet innovant dédié à la transformation des déchets en ressources réutilisables. 
              Nous croyons en un avenir plus propre, où chaque geste compte.
            </p>
            <Link
              to="/about"
              className="inline-block bg-green-nature hover:bg-green-hover text-white px-8 py-3 rounded-full font-montserrat font-semibold transition-colors"
            >
              En savoir plus →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-12 text-green-deep">
            Les problèmes que nous résolvons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center"
              >
                <span className="text-3xl mr-4">✓</span>
                <span className="font-open-sans text-lg text-text-gray">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-deep text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Participez dès aujourd'hui à la construction d'un Portugal plus propre
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/contribute"
              className="bg-green-nature hover:bg-green-hover text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contribuer maintenant 💚
            </Link>
            <Link
              to="/contact"
              className="bg-blue-ocean hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Devenir partenaire 🤝
            </Link>
          </div>
        </div>
      </section>

      <PartnerBand />

      <Footer />
    </div>
  )
}

export default Home
