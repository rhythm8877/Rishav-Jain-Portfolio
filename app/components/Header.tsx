"use client"

import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    setDarkMode(false)
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    const headerOffset = 120

    const handleScroll = () => {
      // Don't update active section if we're in the middle of a navigation click
      if (isNavigatingRef.current) {
        return
      }

      const scrollPosition = window.scrollY + headerOffset
      let currentSection = 'home'

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      // Set navigation flag to prevent scroll handler from interfering
      isNavigatingRef.current = true
      
      // Update active section immediately on click
      setActiveSection(id)
      
      // Update URL hash
      window.history.pushState({}, '', id === 'home' ? '/#' : `/#${id}`)
      
      const headerOffset = 80 // Height of your fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Re-enable scroll-based updates after scroll animation completes
      // Smooth scroll typically takes ~500-1000ms, using 1500ms to be safe
      setTimeout(() => {
        isNavigatingRef.current = false
        // Verify the active section matches the final scroll position
        const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
        const scrollPosition = window.scrollY + 120
        let currentSection = 'home'
        sections.forEach((section) => {
          if (scrollPosition >= section.offsetTop) {
            currentSection = section.id
          }
        })
        // Update to match final scroll position
        setActiveSection(currentSection)
      }, 1500)
    }
  }

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent hover:from-violet-500 hover:to-indigo-500 dark:hover:from-violet-300 dark:hover:to-indigo-300 transition-all duration-300">
            Er. Rishav Sethi
          </span>
        </a>
        <nav className="hidden md:flex space-x-6">
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, 'home')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'home' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleClick(e, 'about')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'about' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleClick(e, 'services')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'services' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            Services
          </a>
          <a 
            href="#projects" 
            onClick={(e) => handleClick(e, 'projects')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'projects' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            Projects
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => handleClick(e, 'gallery')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'gallery' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            Gallery
          </a>
          <a 
            href="#timeline" 
            onClick={(e) => handleClick(e, 'timeline')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'timeline' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            Timeline
          </a>
          <a 
            href="#blog" 
            onClick={(e) => handleClick(e, 'blog')}
            className={`text-gray-700 dark:text-gray-300 hover:text-violet-500 dark:hover:text-blue-200 
              ${activeSection === 'blog' ? 'border-b-2 border-violet-500 dark:border-blue-200' : ''}`}
          >
            Blog
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
              hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {['home','about','services','projects','gallery','timeline','blog'].map((sectionId) => (
              <a
                key={sectionId}
                href={`#${sectionId}`}
                onClick={(e) => {
                  handleClick(e, sectionId)
                  setMenuOpen(false)
                }}
                className={`capitalize text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 ${activeSection === sectionId ? 'font-semibold text-violet-500 dark:text-blue-200' : ''}`}
              >
                {sectionId}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

