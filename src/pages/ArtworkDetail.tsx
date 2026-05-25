import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArtworkBySlug, getAdjacentArtworks } from '@/data/artworks';
import type { Artwork } from '@/data/artworks';

export default function ArtworkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [adjacent, setAdjacent] = useState<{ prev: Artwork; next: Artwork } | null>(null);

  useEffect(() => {
    if (!slug) return;
    const found = getArtworkBySlug(slug);
    if (found) {
      setArtwork(found);
      setAdjacent(getAdjacentArtworks(slug));
    }
  }, [slug]);

  if (!artwork) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: '#1b1b1b' }}>
        <p style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a', fontSize: '13px' }}>Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh]" style={{ background: '#1b1b1b', paddingTop: '90px' }}>
      <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-10">
        {/* Back Link */}
        <a href="#/" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[1px] mb-8 transition-colors hover:text-[#DFFF00]"
          style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>
          <span>&larr;</span><span>Back to Gallery</span>
        </a>

        {/* Phase Label */}
        <p className="text-[9px] uppercase tracking-[1.5px] mb-3" style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}>
          {artwork.phase}
        </p>

        {/* Title */}
        <h1 className="font-extrabold mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#e8e8e8' }}>
          {artwork.title}
        </h1>

        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] uppercase tracking-[1px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#a0a0a0' }}>
            <span style={{ color: '#DFFF00' }}>&bull;</span> {artwork.category}
          </span>
          {artwork.date && (
            <span className="text-[10px] uppercase tracking-[1px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>
              {artwork.date}
            </span>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative mb-10 overflow-hidden" style={{ border: '1px solid #2a2a2a', borderRadius: '2px' }}>
          <div className="absolute top-3 left-3 w-4 h-4 z-10" style={{ borderTop: '1px solid rgba(223,255,0,0.3)', borderLeft: '1px solid rgba(223,255,0,0.3)' }} />
          <div className="absolute top-3 right-3 w-4 h-4 z-10" style={{ borderTop: '1px solid rgba(223,255,0,0.3)', borderRight: '1px solid rgba(223,255,0,0.3)' }} />
          <div className="absolute bottom-3 left-3 w-4 h-4 z-10" style={{ borderBottom: '1px solid rgba(223,255,0,0.3)', borderLeft: '1px solid rgba(223,255,0,0.3)' }} />
          <div className="absolute bottom-3 right-3 w-4 h-4 z-10" style={{ borderBottom: '1px solid rgba(223,255,0,0.3)', borderRight: '1px solid rgba(223,255,0,0.3)' }} />
          <img src={artwork.image} alt={artwork.title} className="w-full h-auto transition-transform duration-500 hover:scale-[1.02]" />
        </div>

        {/* Description */}
        <p className="mb-8" style={{ fontSize: '15px', lineHeight: 1.7, color: '#a0a0a0' }}>
          {artwork.description}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6" style={{ background: '#151515', border: '1px solid #2a2a2a' }}>
          <div>
            <p className="text-[9px] uppercase tracking-[1.5px] mb-2" style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}>Palette</p>
            <p className="text-[13px]" style={{ color: '#a0a0a0' }}>{artwork.colors}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[1.5px] mb-2" style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}>Style</p>
            <p className="text-[13px]" style={{ color: '#a0a0a0' }}>{artwork.style}</p>
          </div>
        </div>

        {/* Prev / Next Navigation */}
        {adjacent && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid #2a2a2a' }}>
            <button onClick={() => navigate(`/artwork/${adjacent.prev.slug}`)}
              className="flex items-center gap-3 text-left group transition-colors">
              <span className="text-[#6a6a6a] group-hover:text-[#DFFF00] transition-colors text-lg">&larr;</span>
              <div>
                <p className="text-[9px] uppercase tracking-[1.5px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>Previous</p>
                <p className="text-[14px] font-medium group-hover:text-[#DFFF00] transition-colors" style={{ color: '#e8e8e8' }}>{adjacent.prev.title}</p>
              </div>
              <img src={adjacent.prev.image} alt={adjacent.prev.title} className="w-12 h-12 object-cover rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>

            <button onClick={() => navigate(`/artwork/${adjacent.next.slug}`)}
              className="flex items-center gap-3 text-right group transition-colors flex-row-reverse">
              <span className="text-[#6a6a6a] group-hover:text-[#DFFF00] transition-colors text-lg">&rarr;</span>
              <div>
                <p className="text-[9px] uppercase tracking-[1.5px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>Next</p>
                <p className="text-[14px] font-medium group-hover:text-[#DFFF00] transition-colors" style={{ color: '#e8e8e8' }}>{adjacent.next.title}</p>
              </div>
              <img src={adjacent.next.image} alt={adjacent.next.title} className="w-12 h-12 object-cover rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
