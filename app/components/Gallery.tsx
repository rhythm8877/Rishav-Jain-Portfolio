import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { useState } from 'react';

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const filters = [
    { id: 'ALL', label: 'ALL' },
    { id: 'COLLEGE', label: 'COLLEGE' },
    { id: 'INTERVIEW', label: 'INTERVIEW' },
    { id: 'APP_LAUNCH', label: 'APP LAUNCH' }
  ];

  const images = [
    { id: 1, category: 'COLLEGE', src: '/college1.jpeg', title: 'Student Association' },
    { id: 2, category: 'COLLEGE', src: '/pic5.jpeg', title: 'Campus Style' },
    { id: 3, category: 'COLLEGE', src: '/college3.jpeg', title: 'Celebration' },
    { id: 4, category: 'COLLEGE', src: '/college4.jpeg', title: 'Campus Event' },
    { id: 5, category: 'INTERVIEW', src: '/interview1.jpeg', title: 'Media Interview' },
    { id: 6, category: 'INTERVIEW', src: '/interview2.jpeg', title: 'Press Conference' },
    { id: 7, category: 'INTERVIEW', src: '/interview3.jpeg', title: 'TV Interview' },
    { id: 8, category: 'APP_LAUNCH', src: '/blood.jpeg', title: 'Blood Connect Launch' },
    { id: 9, category: 'APP_LAUNCH', src: '/blood2.jpeg', title: 'Blood Connect Event' }
  ];

  const videos = [
    {
      id: 'hornbill',
      title: "Hornbill Festival",
      description: "Inaugurated by Hon'ble Chief Minister Shri Neiphiu Rio, Government of Nagaland",
      src: "/videos/hornbill.mp4",
      poster: "/project1.jpeg",
    },
    {
      id: 'blood-connect',
      title: "Blood Connect",
      description: "Inaugurated by Hon'ble Governor Shri La Ganesan, Government of Nagaland",
      src: "/videos/blood_connect.mp4",
      poster: "/blood.jpeg",
    },
  ]

  const filteredImages = images.filter(img => 
    selectedFilter === 'ALL' || img.category === selectedFilter
  );

  const playVideoMuted = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return
    videoEl.muted = true
    videoEl.play().catch(() => {})
  }

  const pauseVideo = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return
    videoEl.pause()
    videoEl.currentTime = 0
  }

  const unmuteVideo = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return
    videoEl.muted = false
    videoEl.play().catch(() => {})
  }

  return (
    <section
      id="gallery"
      className="relative scroll-mt-24 border-t border-white/40 bg-gradient-to-b from-white via-purple-50/30 to-white dark:border-white/10 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425] transition-colors duration-300"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-900/10 to-transparent dark:from-gray-900/30" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            My Gallery
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedFilter === filter.id 
                    ? 'bg-violet-500 dark:bg-sky-900 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-white hover:bg-gradient-to-r from-purple-600/20 to-pink-600/20'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map(image => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group rounded-[28px] border border-white/50 bg-white/80 p-1 shadow-[0_20px_60px_-30px_rgba(124,58,237,0.6)] transition-all duration-300 dark:border-white/10 dark:bg-[#161f35]"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="relative overflow-hidden rounded-[24px] h-[380px] flex items-center justify-center bg-gradient-to-br from-white via-purple-50/40 to-white dark:from-[#1a2237] dark:via-[#1c2644] dark:to-[#151b2f]">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="max-w-[95%] max-h-[380px] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                    transition-opacity duration-300
                    ${hoveredImage === image.id ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">{image.title}</h3>
                        <ArrowUpRight className="text-white w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Video Gallery */}
        <div className="mt-20 border-t border-white/50 pt-16 dark:border-white/10">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">Gallery</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4">
              Video Highlights
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Immersive clips capturing key launches and milestones. Hover to preview, click to listen with audio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="group rounded-[32px] border border-white/40 bg-white/85 p-6 shadow-[0_16px_40px_-30px_rgba(79,70,229,0.45)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_70px_-40px_rgba(99,102,241,0.75)] dark:border-white/10 dark:bg-[#161f35] dark:shadow-[0_30px_80px_-50px_rgba(15,10,40,0.95)] dark:hover:shadow-[0_35px_90px_-55px_rgba(15,10,40,1)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-purple-50/40 to-white dark:from-[#1a2237] dark:via-[#1c2a45] dark:to-[#131b31]"
                  onMouseEnter={(e) => {
                    setHoveredVideo(video.id)
                    const videoEl = e.currentTarget.querySelector('video')
                    playVideoMuted(videoEl)
                  }}
                  onMouseLeave={(e) => {
                    setHoveredVideo(null)
                    const videoEl = e.currentTarget.querySelector('video')
                    pauseVideo(videoEl)
                  }}
                  onClick={(e) => {
                    const videoEl = e.currentTarget.querySelector('video')
                    unmuteVideo(videoEl)
                  }}
                >
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full h-64 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    style={{ backgroundColor: "#0f1425" }}
                  />

                  <div className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white transition-opacity duration-300 ${hoveredVideo === video.id ? 'opacity-100' : 'opacity-0'}`}>
                    <Play className="w-12 h-12" />
                    <p className="text-sm tracking-[0.4em] uppercase">Preview</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{video.title}</h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;