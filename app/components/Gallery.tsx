import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

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

  const filteredImages = images.filter(img => 
    selectedFilter === 'ALL' || img.category === selectedFilter
  );

  return (
    <section id="gallery" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

        {/* Gallery Grid */}
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
                className="relative group"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="relative overflow-hidden rounded-xl h-[400px] flex items-center justify-center bg-white dark:bg-[#1a2237]">
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
      </div>
    </section>
  );
};

export default Gallery;