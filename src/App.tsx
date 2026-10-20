import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoModal from '@/components/ui/VideoModal';
import WhatsAppModal from '@/components/ui/WhatsAppModal';
import AdminPage from '@/pages/AdminPage';
import { AboutPage, CategoryPage, ContactPage, HomePage, IndustriesPage, ProductDetailPage, ProductsPage } from '@/pages/PublicPages';
import type { VideoShowcaseItem } from '@/data/machineryData';

function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicSite() {
  const [selectedVideo, setSelectedVideo] = useState<VideoShowcaseItem | null>(null);
  const [waOpen, setWaOpen] = useState(false);
  const [message, setMessage] = useState<string>();
  const openWhatsApp = (next?: string) => { setMessage(next); setWaOpen(true); };
  const actions = { openWhatsApp, openVideo: setSelectedVideo };
  return <div className="min-h-screen bg-ivory font-sans text-graphite">
    <ScrollRestoration />
    <Header onWhatsAppClick={openWhatsApp} />
    <main><Routes>
      <Route index element={<HomePage {...actions} />} />
      <Route path="products" element={<ProductsPage openWhatsApp={openWhatsApp} />} />
      <Route path="products/:slug" element={<ProductDetailPage openWhatsApp={openWhatsApp} />} />
      <Route path="categories/:slug" element={<CategoryPage openWhatsApp={openWhatsApp} />} />
      <Route path="about" element={<AboutPage openWhatsApp={openWhatsApp} />} />
      <Route path="industries" element={<IndustriesPage openWhatsApp={openWhatsApp} />} />
      <Route path="contact" element={<ContactPage openWhatsApp={openWhatsApp} />} />
    </Routes></main>
    <Footer onWhatsAppClick={openWhatsApp} />
    <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} onEnquire={() => { const video = selectedVideo; setSelectedVideo(null); openWhatsApp(video ? `Hello Duke Enterprises, I would like to discuss a demonstration of ${video.title}.` : undefined); }} />
    <WhatsAppModal isOpen={waOpen} initialMessage={message} onClose={() => setWaOpen(false)} />
  </div>;
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/admin/*" element={<AdminPage />} />
    <Route path="/*" element={<PublicSite />} />
  </Routes></BrowserRouter>;
}
