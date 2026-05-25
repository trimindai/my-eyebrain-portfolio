import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import ArtworkDetail from '@/pages/ArtworkDetail';

export default function App() {
  return (
    <div style={{ background: '#1b1b1b', minHeight: '100dvh' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artwork/:slug" element={<ArtworkDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
