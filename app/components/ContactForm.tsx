"use client"

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import { useScrollPosition } from "../hooks/useScrollPosition"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    username: "",
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

    if (!formData.username || !formData.email || !formData.phone || !formData.message) {
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
          name: formData.username,
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
      setFormData({ username: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setValidationError(error instanceof Error ? error.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-900 py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white ${
          isVisible ? 'animate-fade-up' : 'opacity-0'
        }`}>
          Contact Me
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 lg:px-12">

          {/* Left Side - Contact Info */}
          <div className={`text-gray-800 dark:text-white space-y-6 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Let's get in touch</h2>
            <p className="text-lg leading-7">Hello, I am Er. Rishav Sethi.<br/>Please feel free to reach out to me for any inquiries or assistance.</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <p>Marwari Patti, Dimapur, 797112</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <p>rishav.sethi1806@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <p>+91 7005291593</p>
              </div>
            </div>

            <div>
              <p className="font-medium mb-8">Connect with me :</p>
              <div className="flex gap-6 mt-6">
                <a href="https://www.facebook.com/share/FvE8oW89jkwMdGtg/?mibextid=qi2Omg" className="text-purple-600 dark:text-purple-500 hover:scale-125 transition-all duration-300">
                  <Facebook size={30} />
                </a>
                <a href="https://www.linkedin.com/in/rishav-sethi-714b1797" className="text-purple-600 dark:text-purple-500 hover:scale-125 transition-all duration-300">
                  <Linkedin size={30} />
                </a>
                <a href="https://twitter.com/er_sethizzz?t=1hfOKwRctUwOftz6hzZKnA&s=09" className="text-purple-600 dark:text-purple-500 hover:scale-125 transition-all duration-300">
                  <Twitter size={30} />
                </a>
                <a href="https://www.instagram.com/er_sethizzz?igsh=MXhjZnZ6MXhrbzkzaQ==" className="text-purple-600 dark:text-purple-500 hover:scale-125 transition-all duration-300">
                  <Instagram size={30} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`bg-purple-600 dark:bg-purple-500 text-white rounded-2xl p-8 shadow-lg relative ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`} style={{ animationDelay: '400ms' }}>
            {showSuccess && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm" role="alert">
                ✅ Your message has been sent.
              </div>
            )}
            {validationError && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm" role="alert">
                ⚠️ {validationError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {['username', 'email', 'phone'].map((field) => (
                <div key={field}>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full rounded-full py-3.5 px-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  className="w-full rounded-2xl py-3.5 px-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-white text-purple-600 dark:text-purple-500 text-lg font-semibold rounded-lg shadow hover:bg-purple-50 hover:text-purple-800 dark:hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitStatus === "error" && (
                <p className="text-red-500 text-sm mt-2">An error occurred. Please try again.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm
