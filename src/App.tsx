import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from '@/context/SiteContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { HomePage } from '@/pages/HomePage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { QuotePage } from '@/pages/QuotePage';
import { ContactPage } from '@/pages/ContactPage';
import { BriefingPage } from '@/pages/BriefingPage';
import { AdminPage } from '@/pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <SiteProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/orcamento" element={<QuotePage />} />
              <Route path="/briefing" element={<BriefingPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </SiteProvider>
  );
}

export default App;
