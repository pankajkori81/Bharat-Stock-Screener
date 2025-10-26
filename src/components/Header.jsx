import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, MessageSquare, Moon, Sun, Info } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import StockImg from "../assets/bharat-stock-screener.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // Close mobile menu when link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={handleLinkClick}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center">
              <img src={StockImg} className='w-full h-full object-contain' alt="Stock Logo" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={`text-sm sm:text-base md:text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Bharat Stock Screener
              </h1>
              <p className={`text-xs hidden sm:block ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>
                Explore Potential Multibagger Stocks
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link to="/" className={`${isDark ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition`}>
              Home
            </Link>
            <Link to="/support/about" className={`${isDark ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition flex items-center gap-1`}>
              <Info size={16} /> About
            </Link>
            <Link to="/pages/contact" className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-indigo-400' : 'bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'} transition font-medium`}>
              <Mail size={16} /> Contact
            </Link>
            <Link to="/pages/feedback" className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium`}>
              <MessageSquare size={16} /> Feedback
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className={`p-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav - Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute left-0 right-0 top-20 sm:top-24 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b shadow-lg`}>
            <div className="px-4 py-3 space-y-1">
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className={`block px-4 py-3 rounded-lg font-medium transition ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
              >
                Home
              </Link>
              
              <Link 
                to="/support/about" 
                onClick={handleLinkClick}
                className={`block px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
              >
                <Info size={18} /> About
              </Link>
              
              <Link 
                to="/pages/contact" 
                onClick={handleLinkClick}
                className={`block px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
              >
                <Mail size={18} /> Contact
              </Link>
              
              <Link 
                to="/pages/feedback" 
                onClick={handleLinkClick}
                className={`block px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700`}
              >
                <MessageSquare size={18} /> Feedback
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
