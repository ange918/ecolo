import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import PartnerBand from '../components/PartnerBand'

const Project = () => {
  const productionSteps = [
    {
      image: '/Waste_collection_truck_neighborhood_b4e34dfc.png',
      title: 'Collecte et tri des déchets',
      description: 'Collaboration avec municipalités, ONG et particuliers pour la mise en place de points de collecte stratégiques à travers le Portugal. Tri sélectif des plastiques et textiles.',
      icon: 'bx-recycle',
      iconText: 'Collecte responsable'
    },
    {
      image: '/Plastic_washing_facility_equipment_18611b8e.png',
      title: 'Nettoyage et broyage',
      description: 'Lavage industriel des plastiques et textiles avec technologies écologiques. Broyage en paillettes ou fibres pour faciliter la transformation ultérieure.',
      icon: 'bx-water',
      iconText: 'Traitement écologique'
    },
    {
      image: '/Sorted_plastic_recycling_facility_f1402ba9.png',
      title: 'Transformation',
      description: 'Plastiques transformés en granules puis en objets moulés (bancs, seaux, pavés). Textiles convertis en fils recyclés puis en tissus ou vêtements durables.',
      icon: 'bx-cog',
      iconText: 'Production innovante'
    },
    {
      image: '/Textile_recycling_production_line_f246795a.png',
      title: 'Conception et vente',
      description: 'Fabrication d\'articles finis de haute qualité, commercialisation locale et internationale avec focus sur la durabilité et l\'économie circulaire.',
      icon: 'bx-shopping-bag',
      iconText: 'Commercialisation'
    },
  ]

  const staff = [
    { poste: 'Directeur de projet', nombre: 1, description: 'Supervision globale' },
    { poste: 'Ingénieurs environnement', nombre: 2, description: 'Gestion technique du recyclage' },
    { poste: 'Techniciens de production', nombre: 10, description: 'Opération machines' },
    { poste: 'Ouvriers de tri', nombre: 15, description: 'Collecte et tri' },
    { poste: 'Responsable qualité', nombre: 1, description: 'Contrôle de conformité' },
    { poste: 'Comptable / RH', nombre: 1, description: 'Administration' },
    { poste: 'Agents commerciaux', nombre: 3, description: 'Vente et distribution' },
  ]

  const budget = [
    { poste: 'Terrain et construction', cout: '200 000' },
    { poste: 'Machines et équipements', cout: '450 000' },
    { poste: 'Véhicules de collecte', cout: '75 000' },
    { poste: 'Salaires première année', cout: '120 000' },
    { poste: 'Formation et sensibilisation', cout: '25 000' },
    { poste: 'Électricité, eau, maintenance', cout: '40 000' },
    { poste: 'Fonds de roulement', cout: '40 000' },
  ]

  const calendar = [
    { etape: 'Étude de faisabilité', duree: '2 mois' },
    { etape: 'Recherche de financement', duree: '4 mois' },
    { etape: 'Construction de l\'usine', duree: '6–8 mois' },
    { etape: 'Installation des équipements', duree: '2 mois' },
    { etape: 'Recrutement et formation', duree: '1 mois' },
    { etape: 'Lancement officiel', duree: 'Mois 15' },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="/Eco_factory_nature_scene_f4ad2bf6.png"
          alt="Notre Projet"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <p className="text-blue-ocean font-montserrat uppercase tracking-wider mb-4">NOTRE PROJET</p>
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            ÉCO-MAT — Redonner vie aux déchets
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Un projet industriel éco-responsable dédié à la transformation des déchets plastiques, 
            textiles et organiques en ressources réutilisables.
          </p>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep flex items-center">
            <i className='bx bx-building text-4xl mr-3 text-green-nature'></i> Présentation générale du projet
          </h2>
          <div className="space-y-4 text-text-gray font-open-sans">
            <p><strong>Nom du projet :</strong> ÉCO-MAT (Écologie & Matières Transformées)</p>
            <p><strong>Nature du projet :</strong> Création d'une usine industrielle éco-responsable dédiée à la valorisation des déchets plastiques, textiles et organiques en produits réutilisables : vêtements recyclés, sacs, fibres, objets utilitaires, etc.</p>
            <p><strong>Objectif global :</strong> Réduire la pollution par les déchets et créer une économie circulaire qui transforme les déchets en ressources valorisables.</p>
            <p><strong>Localisation proposée :</strong> Zone industrielle proche d'un grand centre urbain (Portugal — région à définir selon la faisabilité locale).</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep flex items-center">
            <i className='bx bx-world text-4xl mr-3 text-green-nature'></i> Problématique
          </h2>
          <ul className="space-y-3 text-text-gray font-open-sans">
            <li>• Les déchets plastiques et textiles représentent une menace majeure pour l'environnement.</li>
            <li>• Le taux de recyclage en Europe du Sud reste faible.</li>
            <li>• La population produit de plus en plus de déchets non traités.</li>
            <li>• Le manque d'infrastructures modernes pour la transformation freine l'économie circulaire.</li>
          </ul>
          <div className="mt-8 bg-blue-ocean/10 border-l-4 border-blue-ocean p-6 rounded">
            <p className="text-xl font-montserrat font-semibold text-blue-ocean italic">
              "Recycler n'est plus une option — c'est une urgence climatique."
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-green-deep flex items-center justify-center">
            <i className='bx bx-cog text-4xl mr-3'></i> Processus de production
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionSteps.map((step, index) => (
              <Card
                key={index}
                image={step.image}
                title={step.title}
                description={step.description}
                icon={step.icon}
                iconText={step.iconText}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center bg-green-nature hover:bg-green-hover text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              En savoir plus sur notre approche
              <i className='bx bx-right-arrow-alt ml-2 text-xl'></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep flex items-center">
            <span className="text-4xl mr-3">👥</span> Ressources humaines
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-light-bg rounded-lg overflow-hidden">
              <thead className="bg-green-nature text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-montserrat">Poste</th>
                  <th className="px-6 py-3 text-center font-montserrat">Nombre</th>
                  <th className="px-6 py-3 text-left font-montserrat">Description</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-6 py-4 font-open-sans">{row.poste}</td>
                    <td className="px-6 py-4 text-center font-open-sans font-semibold">{row.nombre}</td>
                    <td className="px-6 py-4 font-open-sans">{row.description}</td>
                  </tr>
                ))}
                <tr className="bg-green-nature/20 font-semibold">
                  <td className="px-6 py-4 font-montserrat">Total</td>
                  <td className="px-6 py-4 text-center font-montserrat">33</td>
                  <td className="px-6 py-4 font-montserrat">Personnel initial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep flex items-center">
            <span className="text-4xl mr-3">💰</span> Budget prévisionnel (en euros)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-green-deep text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-montserrat">Poste</th>
                  <th className="px-6 py-3 text-right font-montserrat">Coût estimé (€)</th>
                </tr>
              </thead>
              <tbody>
                {budget.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-6 py-4 font-open-sans">{row.poste}</td>
                    <td className="px-6 py-4 text-right font-open-sans font-semibold">{row.cout} €</td>
                  </tr>
                ))}
                <tr className="bg-yellow-solar/20 font-bold text-lg">
                  <td className="px-6 py-4 font-montserrat">Total estimé</td>
                  <td className="px-6 py-4 text-right font-montserrat text-green-deep">≈ 1 200 000 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-montserrat font-bold mb-6 text-green-deep flex items-center">
            <span className="text-4xl mr-3">🧩</span> Calendrier de mise en œuvre
          </h2>
          <div className="space-y-4">
            {calendar.map((item, index) => (
              <div key={index} className="bg-light-bg rounded-lg p-4 flex justify-between items-center">
                <span className="font-open-sans text-text-gray">{item.etape}</span>
                <span className="font-montserrat font-semibold text-green-nature">{item.duree}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-deep text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Envie de soutenir la transition écologique au Portugal ?
          </h2>
          <p className="text-xl mb-8">Contribuez dès aujourd'hui à la réalisation du projet ÉCO-MAT.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contribute"
              className="bg-green-nature hover:bg-green-hover px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contribuer maintenant
            </Link>
            <Link
              to="/contact"
              className="bg-blue-ocean hover:bg-blue-600 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Devenir partenaire
            </Link>
          </div>
        </div>
      </section>

      <PartnerBand />

      <Footer />
    </div>
  )
}

export default Project
