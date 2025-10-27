import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Target, Users, TrendingUp, Shield, Award, Sparkles } from 'lucide-react';
import StockImg from "../assets/bharat-stock-screener.png";
import SEO from '../components/SEO';

const AboutPage = () => {
  const { isDark } = useContext(ThemeContext);

  const features = [
    {
      icon: Target,
      title: '20-Parameter Analysis',
      description: 'Comprehensive evaluation covering profitability, financial health, valuation, growth, and cash flow metrics.'
    },
    {
      icon: TrendingUp,
      title: 'Weighted Scoring System',
      description: 'Intelligent algorithm that prioritizes critical parameters to identify high-quality investment opportunities.'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Built-in safety checks focusing on debt levels, interest coverage, and liquidity ratios.'
    },
    {
      icon: Award,
      title: 'Quality Rating',
      description: 'Clear recommendations from Strong Buy to Sell based on comprehensive scoring methodology.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Investor-First Approach',
      description: 'Designed by investors, for investors. Every feature is built to help you make informed decisions.'
    },
    {
      icon: Sparkles,
      title: 'Transparency',
      description: 'Open methodology with clear explanations of every parameter and its weightage in the scoring system.'
    }
  ];

  const bgClass = isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = isDark ? 'text-gray-300' : 'text-gray-700';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  return (

    <>
    
      <SEO 
        title="About Us - Stock Analysis Methodology"
        description="Learn about Bharat Stock Screener's 20-parameter weighted scoring system. Discover how we help Indian investors identify quality stocks through systematic fundamental analysis."
        keywords="about stock screener, methodology, fundamental analysis, stock scoring, investment strategy, 20 parameters, ROE, ROCE, P/E ratio"
        url="/support/about"
      />
    
 

    <div className={`min-h-screen ${bgClass} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src={StockImg} className="w-20 h-20" alt="Stock Logo" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
            About Bharat Stock Screener
          </h1>
          <p className={`text-lg ${textSecondary} max-w-3xl mx-auto`}>
            Empowering Indian investors with data-driven insights to identify potential multibagger stocks through systematic fundamental analysis.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${cardBg} rounded-2xl shadow-xl p-8 md:p-12 mb-12`}>
          <h2 className={`text-3xl font-bold ${textPrimary} mb-6 text-center`}>
            Our Mission
          </h2>
          <p className={`text-lg ${textTertiary} leading-relaxed mb-6`}>
            In the complex world of stock investing, we believe that every investor deserves access to professional-grade analysis tools. Bharat Stock Screener was born from a simple idea: to democratize fundamental stock analysis and make it accessible to retail investors across India.
          </p>
          <p className={`text-lg ${textTertiary} leading-relaxed`}>
            Our mission is to help investors move beyond speculation and embrace systematic, data-driven investing. We provide a comprehensive framework that evaluates stocks across 20 critical parameters, giving you the confidence to make informed investment decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8 text-center`}>
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`${cardBg} border ${borderColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center mb-4`}>
                  <feature.icon className="text-indigo-600" size={24} />
                </div>
                <h3 className={`text-xl font-bold ${textPrimary} mb-3`}>
                  {feature.title}
                </h3>
                <p className={textSecondary}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className={`${cardBg} rounded-2xl shadow-xl p-8 md:p-12 mb-12`}>
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8 text-center`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center flex-shrink-0`}>
                  <value.icon className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>
                    {value.title}
                  </h3>
                  <p className={textSecondary}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className={`${cardBg} rounded-2xl shadow-xl p-8 md:p-12 mb-12`}>
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8 text-center`}>
            How It Works
          </h2>
          <div className="space-y-6">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>
                    Enter Stock Details
                  </h3>
                  <p className={textSecondary}>
                    Input the stock name and evaluate it against 20 fundamental parameters organized into 6 categories.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>
                    Weighted Scoring
                  </h3>
                  <p className={textSecondary}>
                    Our algorithm assigns weighted scores based on parameter importance. Profitability (25%) and Financial Health (20%) carry the highest weights.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>
                    Get Actionable Insights
                  </h3>
                  <p className={textSecondary}>
                    Receive a comprehensive score (0-100) with clear recommendations: Strong Buy (85+), Buy (70+), Hold (55+), or Sell (&lt;55).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`${isDark ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-300'} border rounded-xl p-6`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-900'} mb-3`}>
            ⚠️ Important Disclaimer
          </h3>
          <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'} leading-relaxed`}>
            Bharat Stock Screener is an educational tool designed to assist in fundamental analysis. It is NOT financial advice. Stock market investments carry inherent risks, and past performance does not guarantee future results. Always conduct your own research and consult with a qualified financial advisor before making investment decisions. We are not responsible for any investment losses incurred based on information provided by this tool.
          </p>
        </div>

        {/* Creator Section */}
        <div className="mt-12 text-center">
          <p className={`text-sm ${textSecondary} mb-2`}>
            Built with passion for the Indian investor community
          </p>
          <p className={`font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Created by @pankajkori
          </p>
        </div>
      </div>
    </div>

       </>
  );
};

export default AboutPage
