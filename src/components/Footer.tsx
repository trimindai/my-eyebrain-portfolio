export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-8 px-6 lg:px-10" style={{ borderTop: '1px solid #2a2a2a' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a', letterSpacing: '0.5px' }}>
          &copy; {year} Dalal Al-Kandari. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {['Instagram', 'Behance', 'LinkedIn'].map((s) => (
            <a key={s} href={`https://${s.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[1px] transition-colors duration-250 hover:text-[#DFFF00]"
              style={{ fontFamily: "'Geist Mono', monospace", color: '#a0a0a0' }}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
