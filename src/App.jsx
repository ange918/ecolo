import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Project from './pages/Project'
import Contribute from './pages/Contribute'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App
