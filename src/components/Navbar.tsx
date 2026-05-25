import { useCallback } from 'react';

const navLinks = [
  { label: 'Gallery', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 h-[60px]"
      style={{ background: 'rgba(27, 27, 27, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #2a2a2a' }}>
      <a href="#/" className="text-[12px] font-bold uppercase tracking-[2px] text-[#e8e8e8] hover:text-[#DFFF00] transition-colors duration-250"
        style={{ fontFamily: "'Geist', system-ui, sans-serif" }}>
        DALAL AL-KANDARI
      </a>
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={(e) => handleClick(e, link.href)} className="bracket-link">
            <span className="text-[#6a6a6a]">[</span> {link.label} <span className="text-[#6a6a6a]">]</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
