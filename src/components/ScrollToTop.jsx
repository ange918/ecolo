import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-nature hover:bg-green-hover text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110"
          aria-label="Retour en haut de la page"
        >
          <i className='bx bx-chevron-up text-2xl'></i>
        </button>
      )}
    </>
  )
}

export default ScrollToTop
