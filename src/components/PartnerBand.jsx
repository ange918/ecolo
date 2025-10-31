import React from 'react'

const PartnerBand = () => {
  const partners = [
    { name: 'Union Européenne', icon: 'bx-world', color: 'text-blue-600' },
    { name: 'Portugal', icon: 'bx-flag', color: 'text-green-600' },
    { name: 'PNUD', icon: 'bxs-planet', color: 'text-blue-500' },
    { name: 'BAD', icon: 'bx-building', color: 'text-orange-600' },
    { name: 'ONG Partenaire', icon: 'bx-group', color: 'text-purple-600' },
  ]

  return (
    <section className="bg-green-50 py-8 overflow-hidden relative border-t border-b border-green-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-green-deep flex items-center justify-center gap-2">
          <i className='bx bx-leaf text-green-nature'></i>
          Nos partenaires
        </h2>
        <div className="relative overflow-hidden">
          <div className="partner-scroll w-max">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow min-w-[150px]"
              >
                <i className={`bx ${partner.icon} ${partner.color} text-5xl mb-2`}></i>
                <span className="text-sm font-semibold text-gray-700 text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnerBand
