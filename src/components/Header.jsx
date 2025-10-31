import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/project', label: 'Projets' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <div className="bg-white h-[50px] border-b border-gray-200 hidden md:flex items-center justify-between px-8">
        <img src="/eu-flag.svg" alt="Union Européenne" className="h-8" onError={(e) => {
          e.target.style.display = 'none'
          e.target.insertAdjacentHTML('afterend', '<span class="text-blue-600 font-semibold">🇪🇺 UE</span>')
        }} />
        <img src="/pt-flag.svg" alt="Portugal" className="h-8" onError={(e) => {
          e.target.style.display = 'none'
          e.target.insertAdjacentHTML('afterend', '<span class="text-green-600 font-semibold">🇵🇹 PT</span>')
        }} />
      </div>
      
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-montserrat font-bold">
              <span className="text-green-nature">ÉCO</span>
              <span className="text-blue-ocean">-MAT</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-open-sans font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-green-nature'
                      : 'text-text-gray hover:text-green-nature'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contribute"
                className="bg-green-nature text-white px-6 py-2 rounded-full font-montserrat font-semibold hover:bg-green-hover transition-colors"
              >
                Contribuer 💚
              </Link>
            </div>

            <button
              className="md:hidden text-green-nature focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <i className='bx bx-x text-3xl'></i>
              ) : (
                <i className='bx bx-menu text-3xl'></i>
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block font-open-sans font-medium py-2 ${
                    isActive(link.path) ? 'text-green-nature' : 'text-text-gray'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contribute"
                className="block bg-green-nature text-white px-6 py-2 rounded-full font-montserrat font-semibold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contribuer 💚
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}

export default Header
