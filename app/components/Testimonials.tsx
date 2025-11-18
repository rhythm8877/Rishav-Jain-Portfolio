"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rishabh Gautam",
      text: "This app is a commendable step. In times of emergency, I can easily rely on the app.",
      image: "/testimonal1.jpeg",
    },
    {
      name: "Anup Das",
      text: "A very helpful app indeed. The Hornbill Festival comes very handy in times of trouble. It's very useful while exploration.",
      image: "/testimonal2.jpeg",
    },
    {
      name: "Nikhil Singh",
      text: "Amazing experience! Cool design & great functionality. The DYRS app is very helpful and comes with various services.",
      image: "/testimonal3.jpeg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("testimonials");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 bg-gradient-to-b from-white via-purple-50/30 to-white py-24 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-200/40 via-transparent to-transparent dark:from-violet-900/20" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-violet-500 dark:text-violet-300">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            What People Say
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Real feedback from users who have experienced our products and services.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="flex items-center gap-6 lg:gap-12">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="flex-shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20 shadow-lg shadow-violet-500/20 dark:shadow-violet-500/10 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Carousel Content */}
            <div className="flex-1 relative h-[240px] md:h-[280px] overflow-hidden">
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (currentIndex + 1) % testimonials.length;

                let transform = "translateX(100%)";
                if (isActive) transform = "translateX(0)";
                else if (isPrev) transform = "translateX(-100%)";

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    style={{
                      transform,
                      transitionDuration: "600ms",
                    }}
                  >
                    <div className="h-full rounded-[28px] border border-white/60 bg-white/80 dark:border-white/10 dark:bg-white/5 p-6 md:p-8 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.4)] dark:shadow-[0_30px_100px_-60px_rgba(0,0,0,0.95)] backdrop-blur-xl flex flex-col justify-between">
                      {/* Testimonial Text */}
                      <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-6 italic flex-1">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image || "/placeholder-user.jpg"}
                          alt={testimonial.name}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-violet-500/40 dark:border-violet-400/30"
                        />
                        <div>
                          <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="flex-shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20 shadow-lg shadow-violet-500/20 dark:shadow-violet-500/10 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-violet-500 dark:bg-violet-400"
                    : "w-2.5 bg-violet-500/30 dark:bg-violet-400/30 hover:bg-violet-500/50 dark:hover:bg-violet-400/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
