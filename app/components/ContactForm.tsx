"use client"

import type React from "react"
import { useState } from "react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
    time: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showSuccess, setShowSuccess] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

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
      // Use full URL in development, relative in production
      const functionUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8888/.netlify/functions/submit-form'
        : '/.netlify/functions/submit-form';

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      // Log the raw response for debugging
      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);

      let responseData;
      try {
        responseData = JSON.parse(rawResponse);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit form');
      }

      console.log("Form submitted successfully")
      setSubmitStatus("success")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setFormData({ username: "", email: "", phone: "", message: "", time: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      setValidationError(error instanceof Error ? error.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white py-12 lg:py-24">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact us</h2>
        <p className="mx-auto mt-2 max-w-xl text-lg leading-8 text-gray-300">We'd love to hear from you!</p>
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your message has been sent.</span>
          </div>
        )}
        {validationError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {validationError}</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          <div>
            <label htmlFor="username" className="block text-left text-sm font-medium leading-6 text-white">
              Your Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-left text-sm font-medium leading-6 text-white">
              Phone
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-left text-sm font-medium leading-6 text-white">
              Message
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {submitStatus === "error" && (
              <p className="mt-2 text-sm text-red-500">An error occurred. Please try again.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm

