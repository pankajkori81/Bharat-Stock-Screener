import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicyPage = () => {
  const { isDark } = useContext(ThemeContext);

  const bgClass = isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = isDark ? 'text-gray-300' : 'text-gray-700';

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you contact us or submit feedback, we collect your name, email address, phone number (optional), and any other information you choose to provide.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about your device, browser type, IP address, and how you interact with our platform through cookies and similar technologies.'
        },
        {
          subtitle: 'Stock Analysis Data',
          text: 'Stock names and analysis data you enter are stored locally in your browser using localStorage. This data remains on your device and is not transmitted to our servers unless you explicitly choose to save your analysis history.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'To provide, maintain, and improve our stock screening calculator and related services.'
        },
        {
          subtitle: 'Communication',
          text: 'To respond to your inquiries, feedback, and support requests submitted through our contact forms.'
        },
        {
          subtitle: 'Analytics',
          text: 'To understand how users interact with our platform and identify areas for improvement.'
        },
        {
          subtitle: 'Legal Compliance',
          text: 'To comply with applicable laws, regulations, and legal processes.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'Data Storage & Security',
      content: [
        {
          subtitle: 'Local Storage',
          text: 'Your stock analysis data and history are stored locally in your browser using localStorage. We do not have access to this data, and it remains entirely under your control.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'Contact and feedback forms are processed through Formspree (formspree.io). Please review their privacy policy for information on how they handle your data.'
        },
        {
          subtitle: 'Security Measures',
          text: 'We implement reasonable technical and organizational measures to protect your information from unauthorized access, alteration, or destruction.'
        }
      ]
    },
    {
      icon: Users,
      title: 'Data Sharing & Disclosure',
      content: [
        {
          subtitle: 'No Sale of Data',
          text: 'We do not sell, trade, or rent your personal information to third parties.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share information with trusted service providers (like Formspree for form processing) who assist in operating our platform, subject to confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, court order, or governmental authority.'
        }
      ]
    }
  ];

  return (

    <>
    
       <SEO 
        title="Privacy Policy"
        description="Privacy Policy for Bharat Stock Screener. Learn how we collect, use, and protect your data. Your privacy and data security are our top priorities."
        keywords="privacy policy, data protection, user privacy, data security, GDPR compliance"
        url="/support/privacy-policy"
        type="article"
      />
    


    <div className={`min-h-screen ${bgClass} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
              <Shield className="text-indigo-600" size={32} />
            </div>
          </div>
          <h1 className={`text-4xl font-bold ${textPrimary} mb-4`}>
            Privacy Policy
          </h1>
          <p className={`text-sm ${textSecondary}`}>
            Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <p className={`${textTertiary} leading-relaxed mb-4`}>
            At Bharat Stock Screener, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our stock screening platform.
          </p>
          <p className={`${textTertiary} leading-relaxed`}>
            By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
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
            <div className="space-y-6">
              {section.content.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                    {item.subtitle}
                  </h3>
                  <p className={`${textSecondary} leading-relaxed`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Your Rights */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>
            Your Rights & Choices
          </h2>
          <ul className={`space-y-3 ${textTertiary}`}>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span><strong>Access & Update:</strong> You can access and update your locally stored data by clearing your browser's localStorage for our site.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span><strong>Delete Data:</strong> You can delete your analysis history at any time using the "Clear All" button in the History section.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span><strong>Opt-Out:</strong> You can opt-out of certain data collection by disabling cookies in your browser settings.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span><strong>Contact Preferences:</strong> You can unsubscribe from promotional communications at any time.</span>
            </li>
          </ul>
        </div>

        {/* Cookies */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-4`}>
            Cookies & Tracking Technologies
          </h2>
          <p className={`${textTertiary} leading-relaxed mb-4`}>
            We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
          <p className={`${textSecondary} text-sm`}>
            Types of cookies we use: Essential cookies (required for platform functionality), Analytics cookies (to understand usage patterns), and Preference cookies (to remember your settings like dark mode).
          </p>
        </div>

        {/* Children's Privacy */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-4`}>
            Children's Privacy
          </h2>
          <p className={`${textTertiary} leading-relaxed`}>
            Our service is not intended for use by children under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className={`${cardBg} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-4`}>
            Changes to This Privacy Policy
          </h2>
          <p className={`${textTertiary} leading-relaxed`}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        {/* Contact Section */}
        <div className={`${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'} border rounded-xl p-8`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'} flex items-center justify-center flex-shrink-0`}>
              <Mail className="text-indigo-600" size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'} mb-3`}>
                Questions About Privacy?
              </h2>
              <p className={`${isDark ? 'text-indigo-200' : 'text-indigo-800'} mb-4`}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className={`space-y-2 ${isDark ? 'text-indigo-200' : 'text-indigo-800'}`}>
                <li>• Email: your-email@example.com</li>
                <li>• Contact Form: Use our <a href="/contact" className="underline font-semibold">Contact Page</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
  );
};

export default PrivacyPolicyPage;
