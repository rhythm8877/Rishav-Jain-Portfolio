"use client"

import { motion } from "framer-motion"
import { BarChart, Code, Smartphone } from "lucide-react"

const services = [
  {
    icon: Smartphone,
    title: "Tech Blog",
    description:
      "Translating complex software, hardware, and AI breakthroughs into accessible stories that spark curiosity."
  },
  {
    icon: BarChart,
    title: "Finance Blog",
    description:
      "Demystifying personal finance, investments, and budgeting with actionable playbooks for every stage."
  },
  {
    icon: Code,
    title: "Product Development",
    description:
      "Building thoughtful web and mobile experiences that connect communities and scale purposeful ideas."
  }
]

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/60 to-white py-24 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-200/50 to-transparent dark:from-purple-900/20" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">
            Services
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Where strategy, storytelling, and code converge.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Every engagement blends deep research, hands-on mentoring, and high-velocity execution to move ideas into
            measurable impact.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-white bg-white/80 p-8 shadow-xl shadow-purple-200/30 transition duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-sky-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-4">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-pink-500/15 text-violet-600 dark:text-violet-200">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  <div className="mt-6 border-t border-gray-100 pt-4 text-sm font-semibold uppercase tracking-[0.4em] text-violet-400 dark:border-white/10">
                    Explore
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}