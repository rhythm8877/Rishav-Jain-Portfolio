import { motion } from 'framer-motion';

export default function VideoGallery() {
  const videos = [
    {
      title: "Hornbill Festival",
      description: "Inaugurated by Hon'ble Chief Minister Shri Neiphiu Rio, Government of Nagaland",
      src: "/videos/hornbill.mp4",
    },
    {
      title: "Blood Connect",
      description: "Inaugurated by Hon'ble Governor Shri La Ganesan, Government of Nagaland",
      src: "/videos/blood_connect.mp4",
    },
  ]

  return (
    <motion.section 
      id="video-gallery" 
      className="py-20 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Video Gallery
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              whileHover={{ 
                scale: 1.02,
                transition: { 
                  scale: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }
                }
              }}
              animate={{ 
                scale: 1,
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="relative"
                onMouseEnter={(e) => {
                  const videoEl = e.currentTarget.querySelector('video');
                  if (videoEl) {
                    videoEl.muted = true;
                    videoEl.play();
                  }
                }}
                onMouseLeave={(e) => {
                  const videoEl = e.currentTarget.querySelector('video');
                  if (videoEl && videoEl.muted) {
                    videoEl.pause();
                    videoEl.currentTime = 0;
                  }
                }}
                onClick={(e) => {
                  const videoEl = e.currentTarget.querySelector('video');
                  if (videoEl) {
                    videoEl.muted = false;
                    videoEl.play();
                  }
                }}
              >
                <video 
                  src={video.src} 
                  controls 
                  className="w-full h-64 object-cover cursor-pointer" 
                  playsInline
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{video.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

