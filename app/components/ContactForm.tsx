"use client"

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { useScrollPosition } from "../hooks/useScrollPosition"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showSuccess, setShowSuccess] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Use scroll position hook
  useScrollPosition()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1
      }
    )

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      observer.observe(contactSection)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setValidationError("Please fill in all the details first")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const functionUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8888/.netlify/functions/submit-form'
        : '/.netlify/functions/submit-form';

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);

      const responseData = JSON.parse(rawResponse);
      if (!response.ok) throw new Error(responseData.message || 'Failed to submit form');

      setSubmitStatus("success")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setValidationError(error instanceof Error ? error.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
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
            Contact
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Get In Touch
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Feel free to reach out for inquiries, collaborations, or just to say hello.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          {/* Left Side - Contact Info */}
          <div
            className={`transition-all duration-700 flex ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-full rounded-[28px] border border-white/60 bg-white/80 dark:border-white/10 dark:bg-white/5 p-8 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.4)] dark:shadow-[0_30px_100px_-60px_rgba(0,0,0,0.95)] backdrop-blur-xl flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Hello, I am Er. Rishav Sethi. Please feel free to reach out to me for any inquiries or assistance.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">Marwari Patti, Dimapur, 797112</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <a
                    href="mailto:rishav.sethi1806@gmail.com"
                    className="text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    rishav.sethi1806@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <a
                    href="tel:+917005291593"
                    className="text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    +91 7005291593
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/40 dark:border-white/10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500 dark:text-violet-300 mb-6">
                  Connect With Me
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/share/FvE8oW89jkwMdGtg/?mibextid=qi2Omg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rishav-sethi-714b1797"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://twitter.com/er_sethizzz?t=1hfOKwRctUwOftz6hzZKnA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://www.instagram.com/er_sethizzz?igsh=MXhjZnZ6MXhrbzkzaQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-violet-500/40 bg-white/80 dark:bg-white/5 text-violet-600 dark:text-violet-300 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:scale-110 hover:border-violet-500/60 dark:hover:bg-gradient-to-r dark:hover:from-purple-600/20 dark:hover:to-pink-600/20"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className={`transition-all duration-700 flex ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="w-full rounded-[28px] border border-white/60 bg-white/80 dark:border-white/10 dark:bg-white/5 p-8 shadow-[0_25px_80px_-40px_rgba(124,58,237,0.4)] dark:shadow-[0_30px_100px_-60px_rgba(0,0,0,0.95)] backdrop-blur-xl flex flex-col">
              {showSuccess && (
                <div
                  className="mb-6 rounded-xl border border-green-500/40 bg-green-50/80 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-3 text-sm"
                  role="alert"
                >
                  ✅ Your message has been sent successfully.
                </div>
              )}
              {validationError && (
                <div
                  className="mb-6 rounded-xl border border-red-500/40 bg-red-50/80 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 text-sm"
                  role="alert"
                >
                  ⚠️ {validationError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5 flex flex-col flex-1">
                {["name", "email", "phone"].map((field) => (
                  <div key={field}>
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/60 bg-white/60 dark:bg-white/5 dark:border-white/10 py-3.5 px-5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/60 bg-white/60 dark:bg-white/5 dark:border-white/10 py-3.5 px-5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-base font-semibold rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:from-violet-500 hover:to-pink-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-300 dark:from-sky-900 dark:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Send Message"}
                  </button>
                </div>
                {submitStatus === "error" && (
                  <p className="text-center text-red-500 dark:text-red-400 text-sm mt-2">
                    An error occurred. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
