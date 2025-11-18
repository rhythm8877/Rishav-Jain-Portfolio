import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/40 bg-gradient-to-b from-white via-purple-50/20 to-white py-16 dark:border-white/10 dark:from-[#0f1425] dark:via-[#141c33] dark:to-[#0f1425]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-200/30 via-transparent to-transparent dark:from-violet-900/15" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Er. Rishav Sethi</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Innovating for a better tomorrow
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/FvE8oW89jkwMdGtg/?mibextid=qi2Omg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/rishav-sethi-714b1797"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/er_sethizzz?t=1hfOKwRctUwOftz6hzZKnA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/er_sethizzz?igsh=MXhjZnZ6MXhrbzkzaQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent dark:via-violet-400/20" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Rishav Sethi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

