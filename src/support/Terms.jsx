import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FileText, AlertTriangle, Scale, CheckCircle, XCircle, Info } from 'lucide-react';
import SEO from '../components/SEO';

const Terms = () => {
  const { isDark } = useContext(ThemeContext);

  const bgClass = isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = isDark ? 'text-gray-300' : 'text-gray-700';

  const sections = [
    {
      icon: Info,
      title: 'Acceptance of Terms',
      content: 'By accessing and using Bharat Stock Screener ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.'
    },
    {
      icon: CheckCircle,
      title: 'Use of Service',
      points: [
        'You must be at least 18 years old to use this Service.',
        'You agree to use the Service only for lawful purposes and in accordance with these Terms.',
        'You are responsible for maintaining the confidentiality of any data you enter into the Service.',
        'You agree not to use the Service in any way that could damage, disable, or impair the platform.',
        'You shall not attempt to gain unauthorized access to any portion of the Service or any systems or networks.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Investment Disclaimer',
      content: 'IMPORTANT: Bharat Stock Screener is an educational tool and calculator designed to assist in fundamental stock analysis. It is NOT financial advice, investment advice, or a recommendation to buy, sell, or hold any security. The information provided by this Service should not be relied upon for making investment decisions.',
      points: [
        'Stock market investments involve substantial risk of loss.',
        'Past performance is not indicative of future results.',
        'The scores and ratings generated are based on the parameters you input and our predefined methodology.',
        'We do not verify the accuracy of any data you enter into the calculator.',
        'You should conduct your own due diligence and consult with a qualified financial advisor before making any investment decisions.',
        'We are not registered investment advisors, brokers, or financial planners.'
      ]
    },
    {
      icon: XCircle,
      title: 'Limitation of Liability',
      content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW:',
      points: [
        'The Service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either express or implied.',
        'We do not guarantee the accuracy, completeness, or timeliness of any information provided through the Service.',
        'We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Service.',
        'We are not responsible for any investment losses, financial damages, or other losses incurred based on information from this Service.',
        'We do not warrant that the Service will be uninterrupted, error-free, or free from viruses or other harmful components.',
        'Your use of the Service is at your sole risk.'
      ]
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      points: [
        'All content, features, and functionality of the Service are owned by Bharat Stock Screener and are protected by copyright, trademark, and other intellectual property laws.',
        'You may not reproduce, distribute, modify, or create derivative works without our express written permission.',
        'The scoring methodology, algorithms, and design elements are proprietary to Bharat Stock Screener.',
        'You may use the Service for personal, non-commercial purposes only.'
      ]
    },
    {
      icon: Scale,
      title: 'User Data & Privacy',
      points: [
        'Your use of the Service is also governed by our Privacy Policy.',
        'Data you enter is stored locally in your browser and is under your control.',
        'We use third-party services (like Formspree) for contact forms, subject to their respective privacy policies.',
        'You are responsible for maintaining the security of your device and browser.',
        'We recommend not entering sensitive personal or financial information beyond stock analysis data.'
      ]
    }
  ];

  return (

    <>
    
       
     <SEO 
        title="Terms & Conditions"
        description="Terms and Conditions for using Bharat Stock Screener. Important disclaimer: This is an educational tool, not financial advice. Read our complete terms before using the platform."
        keywords="terms and conditions, terms of service, disclaimer, legal, investment disclaimer, stock market risks"
        url="/support/terms-conditions"
        type="article"
      />
      
  


    <div className={`min-h-screen ${bgClass} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
              <FileText className="text-indigo-600" size={32} />
            </div>
          </div>
          <h1 className={`text-4xl font-bold ${textPrimary} mb-4`}>
            Terms & Conditions
          </h1>
          <p className={`text-sm ${textSecondary}`}>
            Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <p className={`${textTertiary} leading-relaxed`}>
            Welcome to Bharat Stock Screener. These Terms and Conditions ("Terms") govern your use of our stock screening calculator and related services. Please read these Terms carefully before using our Service.
          </p>
        </div>

        {/* Main Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
                <section.icon className="text-indigo-600" size={24} />
              </div>
              <h2 className={`text-2xl font-bold ${textPrimary}`}>
                {section.title}
              </h2>
            </div>
            
            {section.content && (
              <p className={`${textTertiary} leading-relaxed mb-4`}>
                {section.content}
              </p>
            )}
            
            {section.points && (
              <ul className={`space-y-3 ${textTertiary}`}>
                {section.points.map((point, pointIdx) => (
                  <li key={pointIdx} className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Additional Terms */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>
            Additional Terms
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Third-Party Links
              </h3>
              <p className={`${textSecondary} leading-relaxed`}>
                The Service may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party websites is at your own risk.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Indemnification
              </h3>
              <p className={`${textSecondary} leading-relaxed`}>
                You agree to indemnify and hold harmless Bharat Stock Screener, its creators, and affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of the Service or violation of these Terms.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Termination
              </h3>
              <p className={`${textSecondary} leading-relaxed`}>
                We reserve the right to terminate or suspend your access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Governing Law
              </h3>
              <p className={`${textSecondary} leading-relaxed`}>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Severability
              </h3>
              <p className={`${textSecondary} leading-relaxed`}>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                Changes to Terms
              </h3>
              <p className={`${textSecondary} leading-relaxed`}>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </div>
          </div>
        </div>

        {/* Critical Warning */}
        <div className={`${isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-300'} border-2 rounded-xl p-8 mb-8`}>
          <div className="flex items-start gap-4">
            <AlertTriangle className={`${isDark ? 'text-red-400' : 'text-red-600'} flex-shrink-0`} size={32} />
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-red-400' : 'text-red-900'} mb-3`}>
                ⚠️ Critical Investment Warning
              </h3>
              <p className={`${isDark ? 'text-red-200' : 'text-red-800'} leading-relaxed mb-3`}>
                <strong>This is NOT financial advice.</strong> Bharat Stock Screener is purely an educational calculator. Stock market investments involve significant risk, and you could lose your entire investment.
              </p>
              <p className={`${isDark ? 'text-red-200' : 'text-red-800'} leading-relaxed`}>
                Always consult with a qualified, registered financial advisor before making any investment decisions. We accept NO responsibility for any financial losses incurred based on use of this tool.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'} border rounded-xl p-8`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'} mb-3`}>
            Questions About These Terms?
          </h2>
          <p className={`${isDark ? 'text-indigo-200' : 'text-indigo-800'} mb-4`}>
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <ul className={`space-y-2 ${isDark ? 'text-indigo-200' : 'text-indigo-800'}`}>
            <li>• Email: your-email@example.com</li>
            <li>• Contact Form: Use our <a href="/contact" className="underline font-semibold">Contact Page</a></li>
          </ul>
          <p className={`${isDark ? 'text-indigo-300' : 'text-indigo-700'} mt-6 text-sm`}>
            By using Bharat Stock Screener, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
      </>
  );
};

export default Terms;
