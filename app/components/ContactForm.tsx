import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { firestore } from '../firebaseConfig';
import { time } from 'console';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    message: '',
    time: `${new Date().toLocaleString()}`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.username || !formData.email || !formData.phone || !formData.message) {
      setValidationError('Please fill in all the details first');
      return;
    }
  
    setIsSubmitting(true);
  
    // Update the time of message sent
    const updatedFormData = {
      ...formData,
      time: new Date().toLocaleString()
    };
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!response.ok) throw new Error('Failed to send email');
  
      console.log('Email sent successfully');
      setSubmitStatus('success');
      setShowSuccess(true);
  
      setTimeout(() => setShowSuccess(false), 3000);
  
      setFormData({ username: '', email: '', phone: '', message: '', time: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  
    // Store in Firestore
    firestore.collection('messages')
      .add(updatedFormData)  // Use the updated form data with the correct time
      .catch((error) => console.error('Error saving data:', error));
  };
  
  

  return (
    <section 
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 scroll-mt-[80px] relative z-10"
    >
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-[fadeInOut_3s_ease-in-out]">
          Message sent successfully!
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row max-w-6xl mx-auto">
          {/* Left Section */}
          <div className="p-8 md:p-12 md:w-1/2 bg-white dark:bg-gray-800">
            <h2 className="text-4xl font-bold text-purple-600 mb-6">Let's get in touch</h2>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
              Hello, I am Er. Rishav Sethi.<br />
              Please feel free to reach out to me for any inquiries or assistance.
            </p>

            {/* Contact Information */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <MapPin className="text-purple-600 w-6 h-6" />
                <span className="text-gray-700 dark:text-gray-300">Marwari Patti, Dimapur, 797112</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-purple-600 w-6 h-6" />
                <span className="text-gray-700 dark:text-gray-300">rishav.sethi1806@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-purple-600 w-6 h-6" />
                <span className="text-gray-700 dark:text-gray-300">+91 7005291593</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 text-lg mb-4">Connect with me :</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/share/FvE8oW89jkwMdGtg/?mibextid=qi2Omg" 
                  className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/rishav-sethi-714b1797" 
                  className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/er_sethizzz?t=1hfOKwRctUwOftz6hzZKnA&s=09" 
                  className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/er_sethizzz?igsh=MXhjZnZ6MXhrbzkzaQ==" 
                  className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 md:p-12 md:w-1/2 bg-purple-600">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Contact Me
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-6 py-4 rounded-full bg-purple-500/50 text-white placeholder-purple-200 border-2 border-purple-400/50 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-6 py-4 rounded-full bg-purple-500/50 text-white placeholder-purple-200 border-2 border-purple-400/50 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-6 py-4 rounded-full bg-purple-500/50 text-white placeholder-purple-200 border-2 border-purple-400/50 focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  className="w-full px-6 py-4 rounded-3xl bg-purple-500/50 text-white placeholder-purple-200 border-2 border-purple-400/50 focus:border-white focus:outline-none resize-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-[200px] mx-auto py-3 px-6 rounded-lg 
                    bg-white dark:bg-sky-900 
                    hover:bg-gray-100 dark:hover:bg-sky-800 
                    text-purple-600 dark:text-white 
                    font-medium flex items-center justify-center gap-2 
                    transition-all duration-300 
                    border-2 border-transparent hover:border-white ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-purple-600 dark:border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {validationError && (
                  <p className="text-red-500 dark:text-red-400 text-center mt-4">
                    {validationError}
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-500 dark:text-red-400 text-center mt-4">
                    Failed to send message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;