import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectDescription: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectDescription) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    try {
      // Create mailto link for manual email
      const subject = `DRICE Inquiry: ${formData.firstName} ${formData.lastName}`;
      const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Project: ${formData.projectDescription}

Submitted via DRICE Website Contact Form
      `.trim();
      
      const mailtoLink = `mailto:drice@daystar.ac.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Store for backup
      localStorage.setItem('last_drice_inquiry', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));
      
      // Show success message
      setFormSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        projectDescription: ''
      });
      
      // Open email client for user to send
      setTimeout(() => {
        window.open(mailtoLink, '_blank');
      }, 500);
      
      // Hide success message after 10 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 10000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try emailing us directly at drice@daystar.ac.ke');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      projectDescription: ''
    });
  };

  return (
    <section className="bg-daystar-dark text-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h3 className="text-4xl font-bold">Ready to Start? <br/> <span className="text-daystar-blue">Let's Talk.</span></h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full"><Mail className="text-daystar-blue"/></div>
              <div>
                <p className="text-sm text-gray-400">Email us at</p>
                <p className="font-bold">
                  <a href="mailto:drice@daystar.ac.ke" className='hover:text-daystar-blue'>
                    drice@daystar.ac.ke
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full"><MapPin className="text-daystar-blue"/></div>
              <div>
                <p className="text-sm text-gray-400">Visit us at</p>
                <p className="font-bold">Athi River Campus, Machakos County</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {formSubmitted ? (
          <div className="bg-white md:p-10 rounded-3xl shadow-2xl space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="text-green-500 w-16 h-16" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
            <p className="text-gray-600">
              Your inquiry has been submitted successfully. 
            </p>
            <button
              onClick={resetForm}
              className="w-full bg-daystar-blue text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white md:p-10 rounded-3xl shadow-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                value={formData.firstName}
                onChange={handleInputChange}
                className="p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue" 
                required
                disabled={loading}
              />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={handleInputChange}
                className="p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue" 
                required
                disabled={loading}
              />
            </div>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue" 
              required
              disabled={loading}
            />
            <textarea 
              name="projectDescription"
              placeholder="Tell us about your project..." 
              rows="4" 
              value={formData.projectDescription}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border rounded-xl text-black outline-none focus:ring-2 focus:ring-daystar-blue"
              required
              disabled={loading}
            ></textarea>
            <button 
              type="submit" 
              className="w-full bg-daystar-blue text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;