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
    <section id="blog" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white ${
          isVisible ? 'animate-fade-up' : 'opacity-0'
        }`}>
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allBlogPosts.map((post, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 
                transform transition-all duration-300 hover:scale-105
                ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-sm text-violet-600 dark:text-sky-500 font-semibold">{post.category}</span>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{post.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className={`px-6 py-3 bg-violet-500 dark:bg-sky-900 text-white rounded-lg 
              transition-all duration-300 font-semibold
              hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20
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

