import { useEffect, useRef, useState } from 'react';
import ConeCarousel from '@/components/ConeCarousel';

const skills = [
  { name: 'Intuitive Creation', value: 95 },
  { name: 'Color Sense', value: 92 },
  { name: 'Pattern Design', value: 90 },
  { name: 'Composition', value: 88 },
  { name: 'Emotional Range', value: 90 },
];
const tools = ['Markers', 'Paper', 'Intuition', 'Heart', 'Eye', 'Brain', 'Love'];
const awardItems = ['Outsider Art Visionary', 'Raw Intuitive Creator', '46 Works — My Eye Brain', 'Kuwait City Artist', 'Art Brut — Self-Taught'];
const clientItems = ['Phase 1 — Abstract', 'Phase 2 — Ornamental', 'Phase 3 — Refined', 'My Eye Brain', '46 Original Works'];

function SkillBar({ name, value }: { name: string; value: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={barRef} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-medium uppercase tracking-[1px]" style={{ color: '#e8e8e8', fontFamily: "'Geist', system-ui, sans-serif" }}>{name}</span>
        <span className="text-[11px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}>{value}%</span>
      </div>
      <div className="w-full h-[3px] rounded-full" style={{ background: '#2a2a2a' }}>
        <div className="h-full rounded-full" style={{ background: '#DFFF00', width: isVisible ? `${value}%` : '0%', transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section id="projects" className="relative w-full min-h-[100dvh] flex flex-col lg:flex-row items-center" style={{ background: '#1b1b1b' }}>
        <div className="w-full lg:w-[36%] flex flex-col justify-center px-6 lg:px-10 py-16 lg:py-0 order-2 lg:order-1">
          {/* Monogram Card */}
          <div className="relative w-[260px] h-[340px] mb-8 flex items-center justify-center" style={{ background: '#111111', border: '1px solid #2a2a2a', borderRadius: '2px' }}>
            <div className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: '1px solid #DFFF00', borderLeft: '1px solid #DFFF00' }} />
            <div className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: '1px solid #DFFF00', borderRight: '1px solid #DFFF00' }} />
            <div className="absolute bottom-3 left-3 w-4 h-4" style={{ borderBottom: '1px solid #DFFF00', borderLeft: '1px solid #DFFF00' }} />
            <div className="absolute bottom-3 right-3 w-4 h-4" style={{ borderBottom: '1px solid #DFFF00', borderRight: '1px solid #DFFF00' }} />
            <span className="text-[80px] font-black select-none" style={{ fontFamily: "'Geist', sans-serif", color: 'rgba(223, 255, 0, 0.08)', letterSpacing: '-2px' }}>DK</span>
          </div>

          {/* Artist Name */}
          <h1 className="font-extrabold uppercase mb-3" style={{ fontSize: 'clamp(42px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: 1.05, color: '#e8e8e8' }}>
            Dalal Al-Kandari
          </h1>

          {/* Title */}
          <p className="uppercase tracking-[1.5px] mb-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: '10px', color: '#DFFF00' }}>
            Let&apos;s Explore My Eye Brain
          </p>

          {/* Location */}
          <p className="uppercase tracking-[1px] mb-5" style={{ fontFamily: "'Geist Mono', monospace", fontSize: '10px', color: '#6a6a6a' }}>
            Kuwait City, Kuwait
          </p>

          {/* About Me */}
          <p className="mb-8" style={{ fontSize: '13px', color: '#a0a0a0', lineHeight: 1.7, maxWidth: '320px' }}>
            I never studied ornamental art. My hand moves without planning — my eye sees, my brain feels, and what emerges is pure intuition. 46 works of bold lines, vivid color, and hearts that appear unbidden. This is not technique. This is my eye brain.
          </p>

          {/* CTA */}
          <a href="#contact" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[1px] font-medium transition-all duration-300 hover:gap-4"
            style={{ fontFamily: "'Geist Mono', monospace", color: '#DFFF00' }}
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Get in Touch</span><span>&rarr;</span>
          </a>
        </div>

        {/* 3D Cone */}
        <div className="w-full lg:w-[64%] order-1 lg:order-2" style={{ marginLeft: '-5%' }}>
          <ConeCarousel />
        </div>
      </section>

      {/* AWARDS MARQUEE */}
      <section className="w-full py-5 overflow-hidden" style={{ borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', background: '#1b1b1b' }}>
        <div className="animate-marquee flex whitespace-nowrap">
          {[...awardItems, ...awardItems, ...awardItems, ...awardItems].map((item, i) => (
            <span key={i} className="mx-8 text-[11px] uppercase tracking-[2px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>
              {item}<span className="ml-8" style={{ color: '#2a2a2a' }}>//</span>
            </span>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="w-full py-20 lg:py-28 px-6 lg:px-10" style={{ background: '#151515' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <span className="text-[11px] uppercase tracking-[1.5px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>Expertise &amp; Arsenal</span>
            <div className="flex-1 h-[1px]" style={{ background: '#2a2a2a' }} />
          </div>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1">{skills.map((s) => <SkillBar key={s.name} name={s.name} value={s.value} />)}</div>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[1.5px] mb-6" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>Tools &amp; Mediums</p>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span key={tool} className="px-4 py-2 text-[12px] font-medium uppercase tracking-[1px] transition-all duration-250 hover:border-[#DFFF00] hover:text-[#DFFF00]"
                    style={{ fontFamily: "'Geist Mono', monospace", color: '#a0a0a0', border: '1px solid #2a2a2a', borderRadius: '2px' }}>{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="w-full py-5 overflow-hidden" style={{ borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', background: '#1b1b1b' }}>
        <div className="animate-marquee-reverse flex whitespace-nowrap">
          {[...clientItems, ...clientItems, ...clientItems, ...clientItems].map((item, i) => (
            <span key={i} className="mx-8 text-[11px] uppercase tracking-[2px]" style={{ fontFamily: "'Geist Mono', monospace", color: '#6a6a6a' }}>
              {item}<span className="ml-8" style={{ color: '#2a2a2a' }}>//</span>
            </span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="w-full py-20 lg:py-28 px-6 lg:px-10" style={{ background: '#1b1b1b' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-extrabold uppercase mb-3" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#e8e8e8' }}>
            Let&apos;s create something together
          </h2>
          <p className="mb-12" style={{ fontFamily: "'Geist Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#DFFF00' }}>
            My Eye Brain is open
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div><p className="section-label mb-3">Email</p><a href="mailto:dalal@myeyebrain.art" className="text-[14px] transition-colors hover:text-[#DFFF00]" style={{ color: '#a0a0a0' }}>dalal@myeyebrain.art</a></div>
            <div><p className="section-label mb-3">Phone</p><a href="tel:+96512345678" className="text-[14px] transition-colors hover:text-[#DFFF00]" style={{ color: '#a0a0a0' }}>+965 1234 5678</a></div>
            <div><p className="section-label mb-3">Social</p><div className="flex flex-col gap-2">{['Instagram', 'Behance', 'LinkedIn'].map(s => <a key={s} href={`https://${s.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer" className="text-[14px] transition-colors hover:text-[#DFFF00]" style={{ color: '#a0a0a0' }}>{s}</a>)}</div></div>
            <div><p className="section-label mb-3">Location</p><p className="text-[14px]" style={{ color: '#a0a0a0' }}>Kuwait City, Kuwait</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
