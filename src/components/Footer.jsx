import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import StockImg from "../assets/bharat-stock-screener.png";

const Footer = () => {
  const { isDark } = useContext(ThemeContext);

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/support/about' },
      { name: 'Contact', path: '/pages/contact' },
      { name: 'Feedback', path: '/pages/feedback' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/support/privacy-policy' },
      { name: 'Terms & Conditions', path: '/support/terms-conditions' }
    ],
    resources: [
      { name: 'Stock Calculator', path: '/' },
      { name: 'Methodology', path: '/#methodology' },
      { name: 'Benchmarks', path: '/#benchmarks' }
    ]
  };

  const socialLinks = [
    { icon: Github, url: 'https://github.com/pankajkori', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/pankajkori', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com/pankajkori', label: 'Twitter' },
    { icon: Mail, url: 'mailto:your-email@example.com', label: 'Email' }
  ];

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-12 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={StockImg} className="w-12 h-12" alt="Stock Logo" />
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Bharat Stock Screener
                </h3>
              </div>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Your trusted platform for identifying potential multibagger stocks using a comprehensive 20-parameter weighted scoring system.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gray-800 text-gray-400 hover:text-indigo-400 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  } transition`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 uppercase tracking-wider`}>
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`text-sm ${
                      isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
                    } transition`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 uppercase tracking-wider`}>
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`text-sm ${
                      isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
                    } transition`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 uppercase tracking-wider`}>
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`text-sm ${
                      isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'
                    } transition`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center md:text-left`}>
              <p className="mb-1">
                © {new Date().getFullYear()} Bharat Stock Screener. All rights reserved.
              </p>
              <p className="text-xs">
                Created with ❤️ by <span className="font-semibold text-indigo-600">@pankajkori</span>
              </p>
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} text-center md:text-right`}>
              <p className="font-medium mb-1">⚠️ Disclaimer</p>
              <p>This is not financial advice. Please consult a professional advisor.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
