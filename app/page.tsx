"use client"

import About from "@/app/components/About"
import Blog from "@/app/components/Blog"
import Gallery from "@/app/components/Gallery"
import Header from "@/app/components/Header"
import Hero from "@/app/components/Home"
import Projects from "@/app/components/Projects"
import Services from "@/app/components/Services"
import Timeline from "@/app/components/Timeline"
import { useEffect, useState } from "react"
import ContactForm from './components/ContactForm'
import Footer from "./components/Footer"
import Testimonials from "./components/Testimonials"
import VideoGallery from "./components/VideoGallery"
import { firestore } from "./firebaseConfig"

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      return savedMode ? JSON.parse(savedMode) : false
    }
    return false
  })

  useEffect(() => {
    // Update localStorage and class when darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Gallery />
        <VideoGallery />
        <Timeline />
        <Blog />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

