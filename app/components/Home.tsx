import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { href: "https://www.facebook.com/share/FvE8oW89jkwMdGtg/?mibextid=qi2Omg", icon: Facebook, label: "Facebook" },
  { href: "https://www.linkedin.com/in/rishav-sethi-714b1797", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/er_sethizzz?t=1hfOKwRctUwOftz6hzZKnA&s=09", icon: Twitter, label: "Twitter" },
  { href: "https://www.instagram.com/er_sethizzz?igsh=MXhjZnZ6MXhrbzkzaQ==", icon: Instagram, label: "Instagram" }
];

export default function Hero() {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    window.history.pushState({}, '', id === 'home' ? '/#' : `/#${id}`);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-purple-800/70 via-indigo-800/60 to-pink-700/70 text-white"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-6xl flex-col-reverse gap-12 px-4 pb-16 pt-28 sm:px-6 md:flex-row md:items-center md:justify-between md:pb-20 md:pt-32 lg:pt-36">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-violet-200 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
            Visionary Leader
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            <span className="block opacity-0 animate-[slideInLeft_1s_ease-out_forwards]">Hello,</span>
            <span className="block whitespace-nowrap opacity-0 animate-[slideInLeft_1s_ease-out_0.1s_forwards]">
              I'm Er. Rishav Sethi
            </span>
          </h1>
          <p className="mt-6 text-lg text-purple-50 opacity-0 animate-[slideInUp_1s_ease-out_0.25s_forwards] md:text-xl">
            A visionary leader innovating in education and technology, empowering youth and fostering entrepreneurship.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.45s_forwards] sm:flex-row md:items-start">
            <button
              onClick={() => handleClick('contact')}
              className="w-full rounded-full border border-transparent bg-white/90 px-8 py-3 text-base font-semibold text-purple-700 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:w-auto"
            >
              Get in Touch
            </button>
            <a
              href="/#projects"
              className="w-full rounded-full border border-white/70 px-8 py-3 text-base font-semibold text-white transition hover:-translate-y-1 hover:border-white hover:bg-white/10 sm:w-auto"
            >
              View Projects
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.65s_forwards] md:justify-start">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition hover:scale-110 hover:border-white hover:text-violet-200"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div
              className="relative aspect-square rounded-[48px] bg-gradient-to-br from-purple-900/40 via-indigo-900/50 to-purple-700/40 p-4 shadow-2xl shadow-purple-900/30"
            >
              <div className="absolute inset-6 rounded-[32px] border border-white/15" aria-hidden="true" />
              <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-violet-500/40 via-fuchsia-500/40 to-sky-400/40" aria-hidden="true" />
              <div className="relative flex h-full items-center justify-center rounded-[32px] bg-gradient-to-br from-indigo-600/40 to-purple-700/40 p-3 backdrop-blur">
                <img
                  src="/home.png"
                  alt="Portrait of Er. Rishav Sethi"
                  className="h-full w-full rounded-[26px] border border-white/10 object-cover shadow-xl transition duration-700 ease-in-out hover:scale-105 hover:shadow-2xl"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-x-10 bottom-6 flex justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                <span>Vision</span>
                <span>Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}