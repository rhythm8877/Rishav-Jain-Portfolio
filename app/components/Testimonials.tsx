"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rishabh Gautam",
      text: "This app is a commendable step. In times of emergency, I can easily rely on the app.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Anup Das",
      text: "A very helpful app indeed. The Hornbill Festival comes very handy in times of trouble. It's very useful while exploration.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Nikhil Singh",
      text: "Amazing experience! Cool design & great functionality. The DYRS app is very helpful and comes with various services.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextTestimonial]); // Added nextTestimonial to dependencies

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white opacity-0 animate-[slideInUp_1s_ease-out_forwards]">
          What People Say
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
            <div className="group bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8
              hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 
              transition-all duration-300"
            >
              <div className="flex items-center mb-6 opacity-0 animate-[slideInLeft_1s_ease-out_0.6s_forwards]">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {testimonials[currentIndex].name}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4 italic opacity-0 animate-[slideInRight_1s_ease-out_0.9s_forwards]">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>
              <div className="flex justify-center mt-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === currentIndex
                        ? "bg-violet-500 dark:bg-sky-900"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-violet-500 dark:bg-sky-900 text-white p-2 rounded-full 
                hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 
                transition-all duration-300 opacity-0 animate-[slideInLeft_1s_ease-out_1.5s_forwards]"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-violet-500 dark:bg-sky-900 text-white p-2 rounded-full 
                hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 
                transition-all duration-300 opacity-0 animate-[slideInRight_1s_ease-out_1.5s_forwards]"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
