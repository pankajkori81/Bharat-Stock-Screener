import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ContactPage from './pages/ContactPage'
import FeedbackPage from './pages/FeedbackPage'
import ThemeProvider from './context/ThemeContext'
import Footer from './components/Footer'
import PrivacyPolicyPage from './support/PrivacyPolicyPage'
import Terms from './support/Terms'
import AboutPage from './support/AboutPage'

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/contact" element={<ContactPage />} />
        <Route path="/pages/feedback" element={<FeedbackPage />} />
        <Route path="/support/about" element={<AboutPage />} />
        <Route path="/support/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/support/terms-conditions" element={<Terms />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  )
}

export default App
