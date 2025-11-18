'use client'

import { motion } from "framer-motion"

const projects = [
  {
    title: "Hornbill Festival",
    description: "A one-stop platform for the 'Festival of Festivals', making trips seamless and unforgettable.",
    image: "/project1.jpeg",
    links: {
      ios: "https://apps.apple.com/in/app/hornbill-festival/id6737766797",
      android: "https://play.google.com/store/apps/details?id=hornbill.festival.nagaland",
    },
  },
  {
    title: "DYRS Nagaland",
    description: "An Attendance Tracking System for the Department of Youth Resources & Sports, Nagaland.",
    image: "/project2.jpeg",
    links: {
      android: "https://play.google.com/store/apps/details?id=com.dyrs.nagaland",
    },
  },
  {
    title: "Blood Connect",
    description:
      "An app connecting blood donors with those in need, also providing information on nearest hospitals and emergency services.",
    image: "/project3.jpeg",
    links: {
      ios: "https://apps.apple.com/in/app/blood-connect/id6738615621",
      android: "https://play.google.com/store/apps/details?id=blood.connect.niti",
    },
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/40 to-white py-24 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-200/40 to-transparent opacity-80 dark:from-purple-900/20" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">
            Projects
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Purpose-built products for the region and beyond.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Each release blends design, policy, and technology to solve challenges unique to Northeast India while setting
            new standards globally.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group h-[420px] cursor-pointer [perspective:1200px]"
            >
              <div className="relative h-full w-full rounded-[32px] border border-white/30 bg-white/70 shadow-2xl shadow-purple-200/20 transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-sky-400/15 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Front */}
                <div className="absolute inset-0 overflow-hidden rounded-[30px] [backface-visibility:hidden]">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-700/20 to-transparent transition duration-300 group-hover:opacity-90" />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-6 text-left text-white">
                    <p className="text-sm uppercase tracking-[0.4em]">Impact</p>
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white via-purple-50/80 to-white p-8 text-center text-gray-900 shadow-xl shadow-purple-200/40 transition-colors dark:from-purple-900/90 dark:via-indigo-900/80 dark:to-sky-900/70 dark:text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex h-full flex-col items-center justify-center gap-10 py-6">
                    <div className="text-center">
                      <p className="text-sm uppercase tracking-[0.5em] text-violet-500 dark:text-violet-200">Impact</p>
                      <h3 className="mt-3 text-2xl font-bold">{project.title}</h3>
                      <p className="mt-4 text-sm text-gray-600 dark:text-white/90">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                    {project.links.ios && (
                      <a
                        href={project.links.ios}
                        target="_blank"
                        rel="noopener noreferrer"
                          className="rounded-full border border-violet-200 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-700 transition hover:bg-violet-50 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                      >
                        iOS
                      </a>
                    )}
                    {project.links.android && (
                      <a
                        href={project.links.android}
                        target="_blank"
                        rel="noopener noreferrer"
                          className="rounded-full border border-violet-200 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-700 transition hover:bg-violet-50 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                      >
                        Android
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

