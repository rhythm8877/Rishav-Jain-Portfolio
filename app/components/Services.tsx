"use client"

import { motion } from "framer-motion"
import { BarChart, Code, Smartphone } from "lucide-react"

export default function Services() {
  return (
    <motion.section 
      id="services" 
      className="py-20 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Smartphone className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />,
              title: "Tech Blog",
              description: "Sharing insights on technology, covering topics like software, gadgets, and trends. Simplifying complex concepts and fostering discussions in the tech world."
            },
            {
              icon: <BarChart className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />,
              title: "Finance Blog",
              description: "Providing insights on personal finance, investments, budgeting, and market trends. Promoting financial literacy and guiding informed decisions."
            },
            {
              icon: <Code className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />,
              title: "Development",
              description: "Creating websites and mobile applications to enhance user experiences and streamline processes. Connecting users, businesses, and services efficiently in the digital world."
            }
          ].map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg p-8 relative group overflow-hidden"
              whileHover={{ 
                scale: 1.05,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                {service.icon}
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

