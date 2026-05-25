import { artworks } from '@/data/artworks';

export default function Gallery() {
  return (
    <div className="min-h-[100dvh]" style={{ background: '#1b1b1b', paddingTop: '90px' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <p className="text-[10px] uppercase tracking-[1.5px] mb-3" style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}>
          The Collection
        </p>
        <h1 className="font-extrabold uppercase mb-3" style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.04em', lineHeight: 1.05, color: '#e8e8e8' }}>
          All Artworks
        </h1>
        <p className="mb-12" style={{ fontFamily: "'Geist Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#6a6a6a' }}>
          {artworks.length} Works
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map((art) => (
            <a
              key={art.id}
              href={`#/artwork/${art.slug}`}
              className="group relative block overflow-hidden"
              style={{ border: '1px solid #2a2a2a', borderRadius: '2px', background: '#111111' }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.94) 0%, rgba(17,17,17,0.35) 55%, transparent 100%)' }}
              >
                <p className="text-[9px] uppercase tracking-[1.5px] mb-1" style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}>
                  {art.category}
                </p>
                <p className="text-[14px] font-semibold leading-tight" style={{ color: '#e8e8e8' }}>
                  {art.title}
                </p>
              </div>

              {/* Bracket corners on hover */}
              <div className="absolute top-2 left-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderTop: '1px solid #DFFF00', borderLeft: '1px solid #DFFF00' }} />
              <div className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderTop: '1px solid #DFFF00', borderRight: '1px solid #DFFF00' }} />
              <div className="absolute bottom-2 left-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderBottom: '1px solid #DFFF00', borderLeft: '1px solid #DFFF00' }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderBottom: '1px solid #DFFF00', borderRight: '1px solid #DFFF00' }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
