


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';
import  ThemeProvider from './context/ThemeContext';

const App=()=> {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;