
import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const  ContactPage=()=> {
  const { isDark } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill all required fields' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/mqaywkkl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `New Contact Query: ${formData.subject}`,
          ...formData,
          timestamp: new Date().toLocaleString(),
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: '✅ Message sent successfully!' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({ type: 'error', message: 'Failed to send message' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error sending message' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Get in Touch</h1>
        <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg mb-12`}>We'd love to hear from you</p>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-8 transition-colors duration-300`}>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Mail, label: 'Email', value: 'your-email@example.com' },
              { icon: Phone, label: 'Phone', value: '+91 XXXXX XXXXX' },
              { icon: MapPin, label: 'Location', value: 'India' }
            ].map((item, idx) => (
              <div key={idx} className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-indigo-50 border-indigo-200'} p-4 rounded-lg border transition-colors duration-300`}>
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="text-indigo-600" size={20} />
                  <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{item.label}</span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {status && (
            <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
              status.type === 'success' 
                ? isDark ? 'bg-green-900 border border-green-700 text-green-200' : 'bg-green-100 border border-green-300 text-green-800'
                : isDark ? 'bg-red-900 border border-red-700 text-red-200' : 'bg-red-100 border border-red-300 text-red-800'
            } transition-colors duration-300`}>
              {status.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                rows="6"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : <><Send size={20} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default ContactPage;