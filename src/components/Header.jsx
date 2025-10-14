


import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, MessageSquare, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import StockImg from "../assets/bharat-stock-screener.png";
const Header=()=> {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 shadow-sm">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <div className="w-11 h-11   rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">

                <img src={StockImg} className='' alt="Stock " />
              </span>
              
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Bharat Stock Screener</h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Explore Potential Multibagger Stocks</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${isDark ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition`}>Home</Link>
            <Link to="/contact" className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-indigo-400' : 'bg-gray-50 text-gray-700 hover:bg-indigo-50'} transition font-medium`}>
              <Mail size={18} /> Contact
            </Link>
            <Link to="/feedback" className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium`}>
              <MessageSquare size={18} /> Feedback
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition`}
              title="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 space-y-2 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <Link to="/" className={`block px-4 py-2 rounded ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-indigo-50'}`}>Home</Link>
            <Link to="/contact" className={`block px-4 py-2 rounded flex items-center gap-2 ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-indigo-50'}`}>
              <Mail size={18} /> Contact
            </Link>
            <Link to="/feedback" className={`block px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded flex items-center gap-2 font-medium`}>
              <MessageSquare size={18} /> Feedback
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;