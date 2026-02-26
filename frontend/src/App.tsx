import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">Przejdź do treści</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aktualnosci/:slug" element={<NewsDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
