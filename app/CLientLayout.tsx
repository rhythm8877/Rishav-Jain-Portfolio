'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Header from './components/Header'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {children}
      </div>
    </>
  )
}