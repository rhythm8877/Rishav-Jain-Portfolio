import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Hero() {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash
      window.history.pushState({}, '', `/#${id}`);
      // Force a re-render of the contact section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="pt-20 md:pt-40 pb-20 bg-gradient-to-r from-purple-700/40 to-pink-700/40 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4 opacity-0 animate-[slideInLeft_1s_ease-out_forwards] hover:scale-105 hover:text-yellow-300 transition-all duration-300 cursor-pointer"
          >
            Hello, I'm Er. Rishav Sethi
          </h1>
          <p 
            className="text-xl mb-8 opacity-0 animate-[slideInUp_1s_ease-out_0.3s_forwards] hover:translate-x-2 hover:text-violet-500 dark:hover:text-blue-200 transition-all duration-300"
          >
            A visionary leader innovating in education and technology, empowering youth and fostering entrepreneurship.
          </p>
          <div 
            className="flex space-x-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]"
          >
            <button
              onClick={() => handleClick('contact')}
              className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300"
            >
              Get in Touch
            </button>
            <a
              href="/#projects"
              className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300"
            >
              View Projects
            </a>
          </div>
          <div 
            className="flex mt-8 space-x-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]"
          >
            <a href="https://www.facebook.com/share/FvE8oW89jkwMdGtg/?mibextid=qi2Omg" className="text-white hover:scale-125 hover:text-violet-500 dark:hover:text-blue-200 transition-all duration-300">
              <Facebook size={24} />
            </a>
            <a href="https://www.linkedin.com/in/rishav-sethi-714b1797" className="text-white hover:scale-125 hover:text-violet-500 dark:hover:text-blue-200 transition-all duration-300">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com/er_sethizzz?t=1hfOKwRctUwOftz6hzZKnA&s=09" className="text-white hover:scale-125 hover:text-violet-500 dark:hover:text-blue-200 transition-all duration-300">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/er_sethizzz?igsh=MXhjZnZ6MXhrbzkzaQ==" className="text-white hover:scale-125 hover:text-violet-500 dark:hover:text-blue-200 transition-all duration-300">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="/home.png"
            alt="A person in a white vest and glasses"
            className="rounded-full border-4 border-white shadow-lg opacity-0 animate-[slideInRight_1s_ease-out_0.3s_forwards] hover:scale-105 hover:shadow-2xl hover:border-violet-500 dark:hover:border-blue-200 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  )
}