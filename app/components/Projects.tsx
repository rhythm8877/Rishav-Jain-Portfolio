import { motion } from "framer-motion"

export default function Projects() {
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
  ]

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Latest Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group h-[400px] [perspective:1000px] cursor-pointer"
            >
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <div className="h-full rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={project.image || "/placeholder.svg"} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 
                      opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="h-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-8 
                    flex flex-col justify-center items-center text-center text-black dark:text-white/90 shadow-xl">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="mb-8 text-black dark:text-white/90">{project.description}</p>
                    <div className="flex space-x-4">
                      {project.links.ios && (
                        <a
                          href={project.links.ios}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 backdrop-blur-sm border border-white/20 text-black dark:text-white/90 px-6 py-2 
                            rounded-full text-sm font-semibold hover:bg-white/20 transition duration-300"
                        >
                          iOS
                        </a>
                      )}
                      {project.links.android && (
                        <a
                          href={project.links.android}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 backdrop-blur-sm border border-white/20 text-black dark:text-white/90 px-6 py-2 
                            rounded-full text-sm font-semibold hover:bg-white/20 transition duration-300"
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

