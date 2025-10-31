import React from 'react'

const Card = ({ image, title, description, icon, iconText }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-green-deep">{title}</h3>
        <p className="text-gray-600 mb-3 flex-1">{description}</p>
        {icon && (
          <div className="flex items-center text-green-700 font-medium mt-auto">
            <i className={`bx ${icon} text-2xl mr-2`}></i>
            {iconText && <span>{iconText}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
