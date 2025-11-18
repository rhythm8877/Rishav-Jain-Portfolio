'use client'

import { Award, Compass, Lightbulb, MapPin } from 'lucide-react'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useEffect, useRef, useState } from 'react'

const quickFacts = [
  { title: 'Education', content: 'B.Tech • Computer Science', icon: Award },
  { title: 'Experience', content: '7+ Years Leadership', icon: Compass },
  { title: 'Focus', content: 'Innovation & Entrepreneurship', icon: Lightbulb },
  { title: 'Base', content: 'Dimapur, Nagaland', icon: MapPin }
]

const impactPoints = [
  'Championing technology-first solutions that amplify youth voices across Northeast India.',
  'Designing entrepreneurship programs that nurture confidence, creativity, and ownership.',
  'Building strategic alliances between industry, academia, and government stakeholders.',
  'Mentoring early-stage founders to launch sustainable ventures with measurable outcomes.'
]

export default function About() {
  useScrollPosition()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
  
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white py-24 text-gray-900 transition-colors duration-300 dark:bg-[#0f1425] dark:text-white"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-purple-900/10 to-transparent dark:from-purple-900/20 md:block" />
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-20">
        <div className={`relative w-full max-w-lg self-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} lg:w-1/2`}>
          <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-violet-500/30 to-pink-500/20 blur-3xl dark:from-violet-500/40 dark:to-sky-500/20" aria-hidden="true" />
          <div className="group relative overflow-hidden rounded-[40px] border border-white/20 bg-gradient-to-br from-purple-800/50 via-indigo-800/40 to-purple-900/40 p-6 shadow-2xl shadow-purple-900/40 transition duration-700 hover:-translate-y-1 hover:shadow-purple-900/60 dark:border-white/10">
            <div className="rounded-[28px] bg-gradient-to-br from-indigo-600/40 to-purple-700/40 p-3 backdrop-blur transition duration-700 group-hover:scale-[1.02] group-hover:translate-y-[-4px]">
              <img
                src="/about.jpg"
                alt="Portrait of Er. Rishav Sethi"
                className="h-full w-full rounded-[22px] object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-105"
                loading="lazy"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/70 dark:bg-white/5">
              <span>Education</span>
              <span>Innovation</span>
              <span>Community</span>
            </div>
          </div>
        </div>

        <div className={`w-full transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} lg:w-1/2`}>
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">
            About
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Architecting purposeful change through technology, empathy, and bold leadership.
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            I am Er. Rishav Sethi, a mission-driven leader blending engineering rigor with grassroots insight.
            My work centers on empowering youth to build resilient communities—whether through digital education,
            entrepreneurial mentorship, or large-scale social innovation campaigns.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {quickFacts.map(({ title, content, icon: Icon }) => (
              <div
                key={title}
                className={`flex items-start gap-4 rounded-3xl border border-purple-100/70 bg-white/70 p-5 shadow-lg shadow-purple-200/30 transition duration-500 hover:-translate-y-1 hover:border-purple-400 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:border-violet-500/50 ${isVisible ? 'opacity-100 delay-200' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-violet-700 dark:text-violet-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{title}</p>
                  <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-10 rounded-3xl border border-purple-100/70 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg shadow-purple-200/20 transition-all duration-700 dark:border-white/5 dark:bg-gradient-to-br dark:from-[#181f33] dark:to-[#131a2b] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-semibold text-purple-700 dark:text-violet-300">Impact Highlights</h3>
            <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-200">
              {impactPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}