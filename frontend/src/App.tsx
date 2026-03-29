import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';

const TeamPage = lazy(() => import('./pages/TeamPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const StomatologiaZachowawczaPage = lazy(() => import('./pages/StomatologiaZachowawczaPage'));
const ChirurgiaStomatologicznaPage = lazy(() => import('./pages/ChirurgiaStomatologicznaPage'));
const StomatologiaEstetycznaPage = lazy(() => import('./pages/StomatologiaEstetycznaPage'));
const ProtetykaPage = lazy(() => import('./pages/ProtetykaPage'));
const ImplantologiaPage = lazy(() => import('./pages/ImplantologiaPage'));
const OrtodoncjaPage = lazy(() => import('./pages/OrtodoncjaPage'));
const RadiowizjografiaPage = lazy(() => import('./pages/RadiowizjografiaPage'));
const FizjoterapiaPage = lazy(() => import('./pages/FizjoterapiaPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const KartaRodzinnaPage = lazy(() => import('./pages/KartaRodzinnaPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NewsListPage = lazy(() => import('./pages/NewsListPage'));

function PageLoader() {
  return <div className="page-loading">Ładowanie…</div>;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">Przejdź do treści</a>
      <Header />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/o-nas/zespol" element={<TeamPage />} />
            <Route path="/o-nas/certyfikaty" element={<CertificatesPage />} />
            <Route path="/o-nas/szczecinska-karta-rodzinna" element={<KartaRodzinnaPage />} />
            <Route path="/o-nas/polityka-prywatnosci" element={<PrivacyPolicyPage />} />
            <Route path="/oferta/stomatologia-zachowawcza" element={<StomatologiaZachowawczaPage />} />
            <Route path="/oferta/stomatologia-estetyczna" element={<StomatologiaEstetycznaPage />} />
            <Route path="/oferta/chirurgia-stomatologiczna" element={<ChirurgiaStomatologicznaPage />} />
            <Route path="/oferta/protetyka" element={<ProtetykaPage />} />
            <Route path="/oferta/implantologia" element={<ImplantologiaPage />} />
            <Route path="/oferta/ortodoncja" element={<OrtodoncjaPage />} />
            <Route path="/oferta/radiowizjografia-rtg" element={<RadiowizjografiaPage />} />
            <Route path="/fizjoterapia" element={<FizjoterapiaPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/aktualnosci" element={<NewsListPage />} />
            <Route path="/aktualnosci/:slug" element={<NewsDetailPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
