import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getArtworkBySlug, getAdjacentArtworks } from '@/data/artworks';
import type { Artwork } from '@/data/artworks';

/* Studio-Dialect-style plus crosshair. Inherits color via currentColor. */
function Cross({ size = 24 }: { size?: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full" style={{ height: 1, background: 'currentColor' }} />
      <span className="absolute top-0 left-1/2 -translate-x-1/2 h-full" style={{ width: 1, background: 'currentColor' }} />
    </span>
  );
}

export default function ArtworkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [adjacent, setAdjacent] = useState<{ prev: Artwork; next: Artwork } | null>(null);

  // Zoom lightbox state
  const [zoomOpen, setZoomOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  useEffect(() => {
    if (!slug) return;
    const found = getArtworkBySlug(slug);
    if (found) {
      setArtwork(found);
      setAdjacent(getAdjacentArtworks(slug));
    }
    window.scrollTo({ top: 0 });
  }, [slug]);

  const closeZoom = useCallback(() => {
    setZoomOpen(false);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setScale((s) => {
      const next = Math.min(4, Math.max(1, +(s + delta).toFixed(2)));
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Keyboard + body scroll lock while zoomed
  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom();
      else if (e.key === '+' || e.key === '=') zoomBy(0.3);
      else if (e.key === '-' || e.key === '_') zoomBy(-0.3);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomOpen, closeZoom, zoomBy]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 0.3 : -0.3);
  }, [zoomBy]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setOffset({ x: dragStart.current.ox + (e.clientX - dragStart.current.x), y: dragStart.current.oy + (e.clientY - dragStart.current.y) });
  };
  const onPointerUp = () => { dragging.current = false; };

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
        <a href="#/gallery" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[1px] mb-8 transition-colors hover:text-[#DFFF00]"
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

        {/* Hero Image — click to zoom, framed with + crosses */}
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="group relative mb-10 block w-full overflow-hidden cursor-zoom-in"
          style={{ border: '1px solid #2a2a2a', borderRadius: '2px' }}
          aria-label="Zoom artwork"
        >
          <span className="absolute top-3 left-3 z-10" style={{ color: 'rgba(223,255,0,0.45)' }}><Cross size={16} /></span>
          <span className="absolute top-3 right-3 z-10" style={{ color: 'rgba(223,255,0,0.45)' }}><Cross size={16} /></span>
          <span className="absolute bottom-3 left-3 z-10" style={{ color: 'rgba(223,255,0,0.45)' }}><Cross size={16} /></span>
          <span className="absolute bottom-3 right-3 z-10" style={{ color: 'rgba(223,255,0,0.45)' }}><Cross size={16} /></span>
          <img src={artwork.image} alt={artwork.title} className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 text-[9px] uppercase tracking-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ fontFamily: "'Geist Mono', monospace", color: '#1b1b1b', background: '#DFFF00', borderRadius: '2px' }}>
            Click to Zoom
          </span>
        </button>

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

        {/* Prev / Next — Studio-Dialect plus-shape navigation */}
        {adjacent && (
          <div className="flex items-stretch justify-between gap-4 pt-8" style={{ borderTop: '1px solid #2a2a2a' }}>
            <button onClick={() => navigate(`/artwork/${adjacent.prev.slug}`)}
              className="group flex items-center gap-4 text-left transition-colors"
              style={{ color: '#6a6a6a' }}>
              <span className="shrink-0 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 group-hover:text-[#DFFF00]"><Cross size={26} /></span>
              <span className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[1.5px]" style={{ fontFamily: "'Geist Mono', monospace" }}>Previous</span>
                <span className="text-[14px] font-medium transition-colors group-hover:text-[#DFFF00]" style={{ color: '#e8e8e8' }}>{adjacent.prev.title}</span>
              </span>
            </button>

            <button onClick={() => navigate(`/artwork/${adjacent.next.slug}`)}
              className="group flex items-center gap-4 text-right transition-colors flex-row-reverse"
              style={{ color: '#6a6a6a' }}>
              <span className="shrink-0 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 group-hover:text-[#DFFF00]"><Cross size={26} /></span>
              <span className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[1.5px]" style={{ fontFamily: "'Geist Mono', monospace" }}>Next</span>
                <span className="text-[14px] font-medium transition-colors group-hover:text-[#DFFF00]" style={{ color: '#e8e8e8' }}>{adjacent.next.title}</span>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Zoom Lightbox */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(17,17,17,0.97)' }}
          onClick={closeZoom}
        >
          {/* + framing corners */}
          <span className="absolute top-5 left-5" style={{ color: 'rgba(223,255,0,0.4)' }}><Cross size={18} /></span>
          <span className="absolute top-5 right-5" style={{ color: 'rgba(223,255,0,0.4)' }}><Cross size={18} /></span>
          <span className="absolute bottom-5 left-5" style={{ color: 'rgba(223,255,0,0.4)' }}><Cross size={18} /></span>
          <span className="absolute bottom-5 right-5" style={{ color: 'rgba(223,255,0,0.4)' }}><Cross size={18} /></span>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeZoom(); }}
            className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[1.5px] transition-colors hover:text-[#DFFF00]"
            style={{ fontFamily: "'Geist Mono', monospace", color: '#a0a0a0' }}
          >
            [ Close &times; ]
          </button>

          {/* Image stage */}
          <div
            className="overflow-hidden flex items-center justify-center"
            style={{ width: '90vw', height: '80vh', touchAction: 'none' }}
            onWheel={onWheel}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              draggable={false}
              className="max-w-full max-h-full select-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transition: dragging.current ? 'none' : 'transform 0.15s ease-out',
                cursor: scale > 1 ? 'grab' : 'default',
              }}
            />
          </div>

          {/* Zoom controls — bracket buttons */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => zoomBy(-0.3)} className="text-[16px] transition-colors hover:text-[#DFFF00]" style={{ fontFamily: "'Geist Mono', monospace", color: '#a0a0a0' }} aria-label="Zoom out">[ &minus; ]</button>
            <span className="text-[11px] tabular-nums" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>{Math.round(scale * 100)}%</span>
            <button onClick={() => zoomBy(0.3)} className="text-[16px] transition-colors hover:text-[#DFFF00]" style={{ fontFamily: "'Geist Mono', monospace", color: '#a0a0a0' }} aria-label="Zoom in">[ + ]</button>
          </div>
        </div>
      )}
    </div>
  );
}
