import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import PartnerBand from '../components/PartnerBand'

const About = () => {
  const gallerySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const galleryImages = [
    { src: '/Waste_collection_truck_neighborhood_b4e34dfc.png', alt: 'Collecte de plastiques' },
    { src: '/Plastic_washing_facility_equipment_18611b8e.png', alt: 'Traitement et lavage' },
    { src: '/Recycled_plastic_granules_closeup_7e365a55.png', alt: 'Production de granules' },
    { src: '/Textile_recycling_production_line_f246795a.png', alt: 'Filière textile recyclée' },
    { src: '/Recycling_team_workshop_collaboration_a4789468.png', alt: 'Équipe de recyclage' },
    { src: '/Waste_sorting_industrial_process_75cdeb88.png', alt: 'Tri sélectif' },
  ]

  const objectives = [
    'Réduire la pollution plastique et textile.',
    'Mettre en place des circuits de collecte locaux.',
    'Produire des matériaux recyclés commercialisables.',
    'Sensibiliser et former les communautés locales.',
    'Générer des emplois durables.',
  ]

  const advantages = [
    {
      image: '/Portuguese_countryside_landscape_c53d6ded.png',
      title: 'Impact environnemental',
      description: 'Réduction significative des déchets dirigés vers les décharges et la mer, protection des écosystèmes naturels et diminution de l\'empreinte carbone au Portugal.',
      icon: 'bx-world',
      iconText: 'Protection environnementale'
    },
    {
      image: '/Recycling_team_workshop_collaboration_a4789468.png',
      title: 'Impact social',
      description: 'Création d\'emplois verts durables, inclusion des communautés locales et formation professionnelle dans le secteur du recyclage et de l\'économie circulaire.',
      icon: 'bx-group',
      iconText: 'Emplois et formation'
    },
    {
      image: '/Recycled_plastic_granules_closeup_7e365a55.png',
      title: 'Impact économique',
      description: 'Création d\'une filière de valorisation locale rentable, développement de produits recyclés commercialisables et stimulation de l\'économie circulaire régionale.',
      icon: 'bx-bar-chart-alt-2',
      iconText: 'Croissance économique'
    },
    {
      image: '/Eco_factory_nature_scene_f4ad2bf6.png',
      title: 'Innovation',
      description: 'Développement et implémentation de technologies avancées de recyclage, transfert de savoir-faire et positionnement du Portugal comme leader en économie circulaire.',
      icon: 'bx-bulb',
      iconText: 'Technologies vertes'
    },
  ]

  const limits = [
    'Dépendance initiale au financement pour l\'achat d\'équipements lourds.',
    'Complexité logistique de collecte à grande échelle (zones rurales).',
    'Besoin de partenariats techniques pour certaines technologies (extrusion, filage).',
    'Besoin d\'une forte sensibilisation publique pour assurer le tri à la source.',
  ]

  const solutions = [
    'Recherche de financements Européens (fonds verts, subventions UE, PNUD).',
    'Partenariats avec municipalités et entreprises locales pour points de collecte.',
    'Programmes de formation professionnelle et actions de sensibilisation.',
    'Phasage du projet : commencer par une usine pilote régionale avant montée en échelle.',
    'Mise en place d\'un suivi KPI transparent (quantité collectée, emplois créés, CO₂ évités).',
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="/Recycling_team_workshop_collaboration_a4789468.png"
          alt="À propos ÉCO-MAT"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <p className="text-blue-ocean font-montserrat uppercase tracking-wider mb-4">QUI SOMMES-NOUS ?</p>
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            ÉCO-MAT Portugal — Transformar resíduos em recursos
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Nous sommes une initiative dédiée à la transformation des déchets en matières réutilisables, 
            basée au Portugal et soutenue par des partenaires institutionnels et privés.
          </p>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-4 text-green-deep">L'idée du projet</h2>
              <p className="text-text-gray font-open-sans leading-relaxed">
                L'idée du projet ÉCO-MAT est née suite aux aléas climatiques observés et aggravés par la pollution 
                massive de nos terres et de nos eaux. Face à la multiplication des inondations, des perturbations 
                agricoles et à la dégradation des écosystèmes, nous avons voulu répondre par une action concrète : 
                transformer les déchets en ressources utiles.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-4 text-green-deep">Notre mission</h2>
              <p className="text-text-gray font-open-sans leading-relaxed">
                Transformer les déchets plastiques, textiles et organiques en matériaux réutilisables et produits 
                finis (vêtements recyclés, granules plastiques, pavés, sacs, fibres). Promouvoir l'économie circulaire, 
                réduire l'empreinte carbone et créer des emplois verts au Portugal.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-4 text-green-deep">Notre vision</h2>
              <p className="text-text-gray font-open-sans leading-relaxed">
                Faire du Portugal un modèle d'économie circulaire au niveau européen — une filière locale qui valorise 
                le déchet, soutient les communautés et protège notre climat.
              </p>
            </div>

            <div className="bg-green-nature/10 border-l-4 border-green-nature p-6 rounded">
              <p className="text-xl font-montserrat font-semibold text-green-deep italic">
                "Chaque déchet est une opportunité — notre défi est de le transformer."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-deep">Nos objectifs</h2>
          <ul className="max-w-3xl mx-auto space-y-4">
            {objectives.map((obj, index) => (
              <li key={index} className="flex items-start">
                <i className='bx bx-check-circle text-green-nature text-2xl mr-4'></i>
                <span className="text-text-gray text-lg">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-deep">
            Ce que nous apportons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <Card
                key={index}
                image={adv.image}
                title={adv.title}
                description={adv.description}
                icon={adv.icon}
                iconText={adv.iconText}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-deep">Nos limites</h2>
          <ul className="max-w-3xl mx-auto space-y-4">
            {limits.map((limit, index) => (
              <li key={index} className="flex items-start">
                <i className='bx bx-error text-yellow-500 text-2xl mr-4'></i>
                <span className="text-text-gray">{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-deep">Solutions envisagées</h2>
          <ul className="max-w-3xl mx-auto space-y-4">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start">
                <i className='bx bx-right-arrow-alt text-blue-ocean text-2xl mr-4'></i>
                <span className="text-text-gray">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-12 text-green-deep">Galerie</h2>
          <Slider {...gallerySettings}>
            {galleryImages.map((img, index) => (
              <div key={index} className="px-2">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                    <p className="text-white font-open-sans text-center">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="py-20 bg-green-nature text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vous voulez soutenir ÉCO-MAT ?
          </h2>
          <p className="text-xl mb-8">Rejoignez-nous — contribuez ou devenez partenaire.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contribute"
              className="bg-white text-green-nature hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contribuer maintenant
            </Link>
            <Link
              to="/contact"
              className="bg-blue-ocean hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <PartnerBand />

      <Footer />
    </div>
  )
}

export default About
