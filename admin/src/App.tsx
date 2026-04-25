import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import GalleryPage from './pages/GalleryPage'
import PricingPage from './pages/PricingPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import BookingsPage from './pages/BookingsPage'
import BannerPage from './pages/BannerPage'
import MessagesPage from './pages/MessagesPage'
import TeamAdminPage from './pages/TeamAdminPage'
import ServicesAdminPage from './pages/ServicesAdminPage'
import SeoPage from './pages/SeoPage'
import TestimonialsAdminPage from './pages/TestimonialsAdminPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/settings" replace />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/banner" element={<BannerPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/team" element={<TeamAdminPage />} />
            <Route path="/services" element={<ServicesAdminPage />} />
            <Route path="/testimonials" element={<TestimonialsAdminPage />} />
            <Route path="/seo" element={<SeoPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
