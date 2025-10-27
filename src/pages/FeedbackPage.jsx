


import React, { useState, useContext } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import SEO from '../components/SEO';

 const  FeedbackPage=()=> {
  const { isDark } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'suggestion',
    rating: 5,
    message: '',
    stockSymbol: ''
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
      const response = await fetch('https://formspree.io/f/xovkyqqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `New Feedback: ${formData.feedbackType} - Rating: ${formData.rating}/5`,
          ...formData,
          timestamp: new Date().toLocaleString(),
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: '✅ Feedback submitted successfully!' });
        setFormData({ name: '', email: '', feedbackType: 'suggestion', rating: 5, message: '', stockSymbol: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({ type: 'error', message: 'Failed to submit feedback' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error submitting feedback' });
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    
     <SEO 
        title="Share Your Feedback"
        description="Help us improve Bharat Stock Screener. Share your feedback, report bugs, or request new features. Your input helps us build better tools for Indian stock market investors."
        keywords="feedback, suggestions, bug report, feature request, improve stock screener"
        url="/pages/feedback"
      />
    

  

    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Share Your Feedback</h1>
        <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg mb-12`}>Help us improve your stock screening experience</p>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-8 transition-colors duration-300`}>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Feedback Type</label>
                <select
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="suggestion">Suggestion</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="improvement">Improvement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Rating (1-5)</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Stock Symbol (Optional)</label>
              <input
                type="text"
                name="stockSymbol"
                value={formData.stockSymbol}
                onChange={handleChange}
                placeholder="e.g., TCS, HAL, HDFC"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Your Feedback *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you think about our platform..."
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
              {loading ? 'Sending...' : <><Send size={20} /> Submit Feedback</>}
            </button>
          </form>
        </div>
      </div>
    </div>

      </>
  );
}


export default FeedbackPage;
