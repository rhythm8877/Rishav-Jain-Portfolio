'use client'

import { useScrollPosition } from '../hooks/useScrollPosition'

export default function About() {
  useScrollPosition()
  
  return (
    <section 
      id="about" 
      className="relative py-20 min-h-screen bg-white dark:bg-[#1a2237] transition-colors duration-300"
    >
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white opacity-0 animate-[slideInUp_1s_ease-out_forwards]">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/about.jpg"
              alt="About Rishav Sethi"
              loading="eager"
              className="rounded-full w-96 h-96 md:w-[450px] md:h-[450px] object-cover mx-auto shadow-lg 
              hover:scale-105 hover:shadow-2xl transition-all duration-500 
              border-2 border-transparent hover:border-blue-200
              opacity-0 animate-[slideInLeft_1s_ease-out_0.3s_forwards]"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-purple-600 dark:text-purple-400 opacity-0 animate-[slideInRight_1s_ease-out_0.3s_forwards]">
              Hi, I'm Er. Rishav Sethi
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg opacity-0 animate-[slideInUp_1s_ease-out_0.6s_forwards]">
              As a visionary leader and trailblazer in education and technology, I passionately drive innovation to
              empower the youth. My focus is on fostering entrepreneurship and cultivating a spirit of self-reliance,
              with transformative initiatives that uplift communities. My impactful work is reshaping Northeast India,
              creating opportunities, and paving the way for sustainable growth.
            </p>
            <div className="grid grid-cols-2 gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
              {[
                { title: "Education", content: "B.Tech in Computer Science" },
                { title: "Experience", content: "5+ years in Tech Leadership" },
                { title: "Skills", content: "Project Management, Innovation" },
                { title: "Location", content: "Dimapur, Nagaland" }
              ].map(({ title, content }) => (
                <div key={title}>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3 text-xl">
                    {title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}