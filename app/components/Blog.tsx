'use client'

import { useEffect, useState } from 'react'
import { useScrollPosition } from '../hooks/useScrollPosition'

export default function Blog() {
  const [showMore, setShowMore] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Use scroll position hook
  useScrollPosition()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1
      }
    )

    const blogSection = document.getElementById('blog')
    if (blogSection) {
      observer.observe(blogSection)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const initialBlogPosts = [
    {
      title: "How to become a Web Developer",
      category: "Web Development",
      description:
        "Empowering ideas through code—your go-to hub for tips, trends, and insights in the world of web development.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Nov 13, 2024",
      author: "Rishav Sethi",
    },
    {
      title: "How to become an Entrepreneur",
      category: "Entrepreneurship",
      description:
        "Empowering dreamers to turn ideas into reality—insights, tips, and inspiration for entrepreneurs building the future of business.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Jan 13, 2025",
      author: "Rishav Sethi",
    },
    {
      title: "Get to know more about Social Marketing",
      category: "Social Marketing",
      description:
        "Empower your brand with expert insights, trends, and strategies to dominate the digital space through impactful social marketing.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Jan 13, 2025",
      author: "Rishav Sethi",
    },
  ]

  const additionalBlogPosts = [
    {
      title: "Explore the world of Digital Marketing",
      category: "Digital Marketing",
      description:
        "Discover how digital marketing is transforming businesses around the globe with innovative strategies and technologies.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Feb 5, 2025",
      author: "Rishav Sethi",
    },
    {
      title: "Unlock the power of Stock Market",
      category: "Stock Marketing",
      description:
        "Empower your financial journey with insights, tips, and trends to master the art of stock market investing and trading.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Mar 10, 2025",
      author: "Rishav Sethi",
    },
    {
      title: "Learn more about App Development",
      category: "App Development",
      description:
        "Stay ahead in tech with expert insights, trends, and tips for building innovative, user-friendly, and scalable app solutions.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Apr 15, 2025",
      author: "Rishav Sethi",
    },
  ]

  const allBlogPosts = showMore 
    ? [...initialBlogPosts, ...additionalBlogPosts]
    : initialBlogPosts

  return (
    <section
      id="blog"
      className="relative scroll-mt-24 bg-gradient-to-b from-white via-purple-50/20 to-white py-24 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-200/40 via-transparent to-transparent dark:from-violet-900/20" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">
            Insights
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Latest Blog Posts</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Thoughts on leadership, innovation, and building enduring products for the region and beyond.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {allBlogPosts.map((post, index) => (
            <div 
              key={index} 
              className={`group rounded-[28px] border border-white/50 bg-white/80 p-1 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_-45px_rgba(99,102,241,0.65)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_25px_90px_-60px_rgba(0,0,0,0.9)]
                ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="h-full rounded-[24px] bg-gradient-to-b from-white via-purple-50/40 to-white p-1 dark:from-[#151b2f] dark:via-[#1a2237] dark:to-[#121728]">
                <div className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white/90 transition-colors duration-500 group-hover:bg-gradient-to-br group-hover:from-violet-500/10 group-hover:via-pink-500/10 group-hover:to-sky-400/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40 opacity-0 transition duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-white/80">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex grow flex-col gap-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-200">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-gray-600 dark:text-gray-300">{post.description}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.date}</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className={`rounded-full border border-transparent bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition-all duration-300 hover:from-violet-500 hover:to-pink-400 dark:from-sky-900 dark:to-purple-700
              ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: `${allBlogPosts.length * 200}ms` }}
          >
            {showMore ? 'Show Less' : 'View More'}
          </button>
        </div>
      </div>
    </section>
  )
}

