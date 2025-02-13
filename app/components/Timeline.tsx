'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollPosition } from '../hooks/useScrollPosition'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: string
  image?: string
  category?: string
}

export default function Timeline() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timelineComponentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use the scroll position hook
  useScrollPosition()

  useEffect(() => {
    // Create intersection observer to trigger animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once visible
          }
        });
      },
      {
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );

    // Start observing the timeline component
    if (timelineComponentRef.current) {
      observer.observe(timelineComponentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateProgressBar = () => {
      if (!progressBarRef.current || !timelineComponentRef.current) return;

      const timeline = timelineComponentRef.current;
      const timelineTop = timeline.offsetTop;
      const timelineHeight = timeline.offsetHeight;
      const scrollPosition = window.scrollY - timelineTop;
      
      const progress = (scrollPosition / timelineHeight) * 100;
      const clampedProgress = Math.min(Math.max(progress, 0), 100);
      
      progressBarRef.current.style.height = `${clampedProgress}%`;
    };

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();

    return () => window.removeEventListener('scroll', updateProgressBar);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      date: "2020",
      title: "Joined NITI",
      description: "Began professional career by joining NITI.",
      icon: "bxs-business",
      category: "Career",
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      date: "2019",
      title: "Sports Manager",
      description: "Appointed as Sports Manager of the DTU Sports Council.",
      icon: "bx-medal",
      category: "Leadership",
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      date: "2018",
      title: "Brand Ambassador",
      description: "Became the Brand Ambassador for RedBull",
      icon: "bxs-user-pin",
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      date: "2018",
      title: "General Secretary",
      description: "Appointed as the General Secretary, DTU Student Association.",
      icon: "bxs-copy-alt",
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      date: "2016",
      title: "Class 12",
      description: "Completed Class 12 (Science) with 96%.",
      icon: "bx-file",
      image: "/blood.jpeg?height=200&width=400"
    },
    {
      date: "2014",
      title: "Class 10",
      description: "Completed Class 10 with 10 CGPA.",
      icon: "bxs-book",
      image: "/placeholder.svg?height=200&width=400"
    }
  ]

  return (
    <section 
    id="timeline" 
    className="page-wrapper scroll-mt-20 relative min-h-screen py-20 bg-gray-50 dark:bg-gray-900"
    style={{ scrollMarginTop: '80px' }}
    >
      <div className="section-timeline-heading">
        <div className="container">
          <div className="padding-vertical-xlarge">
            <div className={`timeline-main_heading-wrapper ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="margin-bottom-medium">
                <h2 className="section-heading">My Journey</h2>
              </div>
              <p className="paragraph-large text-gray-600 dark:text-gray-400">
                My journey through education and professional growth
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-timeline">
        <div className="container">
          <div className="timeline_component" ref={timelineComponentRef}>
            <div className="timeline_progress">
              <div className="timeline_progress-bar" ref={progressBarRef}></div>
            </div>
            
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`timeline_item ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* For even indices (0, 2, 4...), date on left and content on right */}
                {index % 2 === 0 ? (
                  <>
                    <div className="timeline_date timeline_date-left">
                      <div className="timeline_date-text hover-gradient-text">
                        {event.date}
                      </div>
                    </div>
                    <div className="timeline_centre">
                      <div className="timeline_circle"></div>
                    </div>
                    <div className="timeline_content timeline_content-right">
                      <div className="margin-bottom-xlarge">
                        <div className="timeline_text hover-gradient-text">
                          <h3 className="timeline_event__title">{event.title}</h3>
                          <p className="timeline_event__description">{event.description}</p>
                        </div>
                        {event.image && (
                          <div className="timeline_image-wrapper mt-4 hover-gradient-border">
                            <img 
                              src={event.image}
                              alt={`${event.title} illustration`}
                              className="rounded-lg shadow-lg w-full max-w-md"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* For odd indices (1, 3, 5...), content on left and date on right */
                  <>
                    <div className="timeline_content timeline_content-left">
                      <div className="margin-bottom-xlarge">
                        <div className="timeline_text hover-gradient-text">
                          <h3 className="timeline_event__title">{event.title}</h3>
                          <p className="timeline_event__description">{event.description}</p>
                        </div>
                        {event.image && (
                          <div className="timeline_image-wrapper mt-4 hover-gradient-border">
                            <img 
                              src={event.image}
                              alt={`${event.title} illustration`}
                              className="rounded-lg shadow-lg w-full max-w-md"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="timeline_centre">
                      <div className="timeline_circle"></div>
                    </div>
                    <div className="timeline_date timeline_date-right">
                      <div className="timeline_date-text hover-gradient-text">
                        {event.date}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}