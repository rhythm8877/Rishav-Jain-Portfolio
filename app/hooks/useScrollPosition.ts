'use client'

import { useEffect } from 'react'

export function useScrollPosition() {
  useEffect(() => {
    // Get the stored scroll position or current position
    const storedScrollPosition = sessionStorage.getItem('scrollPosition')
    const scrollPosition = storedScrollPosition ? parseInt(storedScrollPosition) : window.scrollY

    // Restore scroll position
    window.scrollTo(0, scrollPosition)

    // Save scroll position before unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
} 