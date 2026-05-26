import { useRef, useEffect, useCallback } from 'react';
import { artworks } from '@/data/artworks';

/* ── 3D Cone Constants ── */
const TOTAL_CARDS = 46;
const CARDS_PER_TURN = 15;
const TOP_RADIUS = 320;
const BOTTOM_RADIUS = 220;
const SPIRAL_HEIGHT = 750;
const CARD_ASPECT = 1.33;
const AUTO_SPEED = 0.12;
const TILT_LERP = 0.07;
const BASE_TILT = -12;
const CARD_WIDTH = 148;
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT;

interface CardData {
  index: number;
  angle: number;
  y: number;
  radius: number;
  artwork: typeof artworks[0];
}

function buildSpiralData(): CardData[] {
  const cards: CardData[] = [];
  const clampedTotal = Math.min(TOTAL_CARDS, artworks.length);
  for (let i = 0; i < clampedTotal; i++) {
    const t = i / clampedTotal;
    const angle = (i / CARDS_PER_TURN) * Math.PI * 2;
    const y = t * SPIRAL_HEIGHT - SPIRAL_HEIGHT / 2;
    const radius = TOP_RADIUS + (BOTTOM_RADIUS - TOP_RADIUS) * t;
    cards.push({ index: i, angle, y, radius, artwork: artworks[i] });
  }
  return cards;
}

const spiralData = buildSpiralData();

export default function ConeCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);

  const rotY = useRef(0);
  const targetTiltX = useRef(BASE_TILT);
  const targetTiltZ = useRef(0);
  const currentTiltX = useRef(BASE_TILT);
  const currentTiltZ = useRef(0);
  const scrollRot = useRef(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRot = useRef(0);
  const dragDelta = useRef(0);

  const rafId = useRef<number>(0);

  const animate = useCallback(() => {
    const wrap = wrapRef.current;
    const isHovering = wrap?.querySelector('.cone-card:hover') !== null;
    const speed = isHovering ? AUTO_SPEED * 0.3 : AUTO_SPEED;
    rotY.current += speed;

    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    scrollRot.current = scrollProgress * 720;

    const totalRotY = rotY.current + scrollRot.current + dragDelta.current;

    currentTiltX.current += (targetTiltX.current - currentTiltX.current) * TILT_LERP;
    currentTiltZ.current += (targetTiltZ.current - currentTiltZ.current) * TILT_LERP;

    if (tiltRef.current) {
      tiltRef.current.style.transform = `translate(-50%, -50%) rotateX(${currentTiltX.current}deg) rotateZ(${currentTiltZ.current}deg)`;
    }
    if (spinRef.current) {
      spinRef.current.style.transform = `rotateY(${totalRotY}deg)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      targetTiltZ.current = dx * 8;
      targetTiltX.current = BASE_TILT + dy * -8;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartRot.current = rotY.current;
    dragDelta.current = 0;
    wrapRef.current?.classList.add('dragging');
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    dragDelta.current = dx * 0.5;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    wrapRef.current?.classList.remove('dragging');
    rotY.current = dragStartRot.current + dragDelta.current;
    dragDelta.current = 0;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <div ref={wrapRef} className="cone-wrap" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onClick={handleCardClick}>
      <div ref={tiltRef} className="cone-tilt">
        <div ref={spinRef} className="cone-spin">
          {spiralData.map((card) => {
            const x = Math.sin(card.angle) * card.radius;
            const z = Math.cos(card.angle) * card.radius;
            const rotYdeg = -(card.angle * 180) / Math.PI;
            return (
              <a key={card.index} href={`#/artwork/${card.artwork.slug}`} className="cone-card" onClick={handleCardClick}
                style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`, transform: `translate3d(${x}px, ${card.y}px, ${z}px) rotateY(${rotYdeg}deg)` }}
                data-index={card.index}>
                <img src={card.artwork.image} alt={card.artwork.title} loading="lazy" width={CARD_WIDTH} height={CARD_HEIGHT} />
                <div className="overlay" />
                <div className="info">
                  <div className="info-cat">{card.artwork.category}</div>
                  <div className="info-title">{card.artwork.title}</div>
                </div>
                <div className="brackets" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
