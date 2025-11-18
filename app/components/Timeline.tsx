'use client'

import { BookOpen, Briefcase, CalendarDays, FileText, Medal, Megaphone, UsersRound } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useScrollPosition } from '../hooks/useScrollPosition'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: string
  image?: string
  category?: string
}

type IconComponent = typeof Briefcase

const iconMap: Record<string, IconComponent> = {
  'bxs-business': Briefcase,
  'bx-medal': Medal,
  'bxs-user-pin': UsersRound,
  'bxs-copy-alt': Megaphone,
  'bx-file': FileText,
  'bxs-book': BookOpen
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "2020",
    title: "Joined NITI",
    description: "Began professional career by joining NITI.",
    icon: "bxs-business",
    category: "Career",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    date: "2019",
    title: "Sports Manager",
    description: "Appointed as Sports Manager of the DTU Sports Council.",
    icon: "bx-medal",
    category: "Leadership",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    date: "2018",
    title: "Brand Ambassador",
    description: "Became the Brand Ambassador for RedBull",
    icon: "bxs-user-pin",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    date: "2018",
    title: "General Secretary",
    description: "Appointed as the General Secretary, DTU Student Association.",
    icon: "bxs-copy-alt",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    date: "2016",
    title: "Class 12",
    description: "Completed Class 12 (Science) with 96%.",
    icon: "bx-file",
    image: "/placeholder.svg?height=200&width=400"
  },
  {
    date: "2014",
    title: "Class 10",
    description: "Completed Class 10 with 10 CGPA.",
    icon: "bxs-book",
    image: "/placeholder.svg?height=200&width=400"
  }
]

export default function Timeline() {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const timelineTrackRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useScrollPosition()

  // Initial visibility check - runs synchronously before paint
  useLayoutEffect(() => {
    const track = timelineTrackRef.current
    if (!track) return

    const rect = track.getBoundingClientRect()
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
    if (isInViewport) {
      setIsVisible(true)
    }
  }, [])

  // IntersectionObserver for scroll-based visibility
  useEffect(() => {
    if (isVisible) return // Already visible, no need for observer

    const track = timelineTrackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '50px' }
    )

    observer.observe(track)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    const updateProgressBar = () => {
      if (!progressBarRef.current || !timelineTrackRef.current) return

      const sectionTop = timelineTrackRef.current.offsetTop
      const sectionHeight = timelineTrackRef.current.offsetHeight
      const viewportBottom = window.scrollY + window.innerHeight

      const progress = (viewportBottom - sectionTop) / (sectionHeight + window.innerHeight)
      const clampedProgress = Math.min(Math.max(progress, 0), 1)

      progressBarRef.current.style.height = `${clampedProgress * 100}%`
    }

    window.addEventListener('scroll', updateProgressBar)
    window.addEventListener('resize', updateProgressBar)
    updateProgressBar()

    return () => {
      window.removeEventListener('scroll', updateProgressBar)
      window.removeEventListener('resize', updateProgressBar)
    }
  }, [])

  return (
    <section
      id="timeline"
      className="relative scroll-mt-24 bg-gradient-to-b from-white via-purple-50/30 to-white py-24 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425]"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-200/40 via-transparent to-transparent dark:from-violet-900/20" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">Milestones</p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">My Journey</h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Tracing the path through education, leadership, and meaningful community impact across the years.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <div
            ref={timelineTrackRef}
            className="relative pl-8 lg:pl-0"
          >
            <div
              className="absolute left-6 top-0 bottom-0 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-white/50 via-violet-200/60 to-white/30 dark:from-white/10 dark:via-white/40 dark:to-white/10 lg:left-1/2"
              aria-hidden="true"
            >
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_20px_rgba(124,58,237,0.6)]"
                style={{ height: "0%" }}
              />
            </div>

            <div className="space-y-12 lg:space-y-20">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0
                const Icon = iconMap[event.icon] ?? CalendarDays
                return (
                  <article
                    key={`${event.title}-${event.date}`}
                    className={`relative mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 rounded-3xl border border-white/40 bg-white/75 p-4 shadow-[0_12px_45px_-30px_rgba(124,58,237,0.45)] transition-all duration-700 ease-out dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_70px_-55px_rgba(0,0,0,0.9)] lg:grid-cols-[1fr_auto_1fr] lg:items-center ${
                      isVisible ? "translate-y-0 opacity-100 visible" : "translate-y-6 opacity-0 invisible pointer-events-none"
                    } ${isEven ? "lg:pr-6" : "lg:pl-6"}`}
                    style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
                  >
                    <div className={`flex flex-col gap-2 rounded-2xl bg-gradient-to-br from-violet-500/10 via-pink-500/5 to-sky-400/10 p-3 ${isEven ? "lg:items-end lg:text-right" : "lg:order-3 lg:text-left"}`}>
                      <div className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-300">
                        <Icon className="h-5 w-5" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-violet-400 dark:text-violet-200">
                          {event.category ?? "Milestone"}
                        </span>
                      </div>
                      <span className="text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">{event.date}</span>
                    </div>

                    <div className="relative mx-auto hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-[2px] lg:flex">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white/95 shadow-inner shadow-white/30 dark:bg-gray-900/90">
                        <Icon className="h-5 w-5 text-violet-600 dark:text-violet-200" />
                      </div>
                      <span className="absolute inset-y-14 w-px bg-gradient-to-b from-violet-500/0 via-violet-500/35 to-violet-500/0" aria-hidden="true" />
                    </div>

                    <div className={`space-y-4 ${isEven ? "lg:order-3" : "lg:order-1"}`}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white md:text-xl">{event.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                      {event.image && (
                        <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/50 shadow-md shadow-violet-900/10 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/10 h-52 sm:h-56">
                          <img
                            src={event.image}
                            alt={`${event.title} visual`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}