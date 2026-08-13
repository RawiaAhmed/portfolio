import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MagnetProps {
  children: ReactNode;
  /** How far outside the element the cursor still counts as "near", in px. */
  padding?: number;
  /** Higher divides the offset down, so a bigger number means less movement. */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  wrapperClassName?: string;
}

/**
 * Pulls its children toward the cursor while the cursor is within `padding` of
 * the element's bounds. Listening on window rather than the element itself is
 * deliberate: the effect has to begin before the cursor arrives, so there is no
 * mouseenter to hang it on.
 */
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  wrapperClassName,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return; // no cursor-following motion when the user asked for less
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const withinX = Math.abs(e.clientX - centerX) < width / 2 + padding;
      const withinY = Math.abs(e.clientY - centerY) < height / 2 + padding;

      if (withinX && withinY) {
        setActive(true);
        setOffset({ x: (e.clientX - centerX) / strength, y: (e.clientY - centerY) / strength });
      } else {
        setActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength, reduced]);

  return (
    <div ref={ref} className={wrapperClassName}>
      <div
        className={className}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
