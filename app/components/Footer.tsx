import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700/40 to-pink-700/40 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Rishav Sethi</h3>
            <p className="mt-2">Innovating for a better tomorrow</p>
          </div>
          <div className="flex mt-8 space-x-4 animate-[fadeIn_1.8s_ease-in]">
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
        <hr className="my-8 border-pink-700/40" />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Rishav Sethi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

