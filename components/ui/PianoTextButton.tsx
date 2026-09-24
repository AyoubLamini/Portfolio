'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const WAVE_COLOR: [number, number, number] = [79, 70, 229]; // #4f46e5

const MAX_SCALE = 1;
const MAX_LIFT = 3;
const SPREAD = 2;
const SPEED = 0.02;
const PAUSE_MS = 1400;

interface PianoTextButtonProps {
  text?: string;
  onClick?: () => void;
}

export default function PianoTextButton({
  text = 'Preview ↗',
  onClick,
}: PianoTextButtonProps) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  charRefs.current = [];

  useEffect(() => {
    if (!mounted) return;
    
    const chars = charRefs.current;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let start: number | null = null;
    
    const isLight = resolvedTheme === 'light';
    // Use dark gray for light theme, off-white for dark theme
    const baseColor: [number, number, number] = isLight ? [113, 113, 122] : [244, 241, 234];

    function frame(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pos = elapsed * SPEED - SPREAD;

      chars.forEach((span, i) => {
        if (!span) return;

        const dist = Math.abs(pos - i);
        const influence = Math.max(0, 1 - dist / SPREAD);
        const eased = influence * influence * (3 - 2 * influence);

        const scale = 1 + eased * (MAX_SCALE - 1);
        const lift = eased * MAX_LIFT;

        span.style.transform = `translateY(${-lift}px) scaleY(${scale})`;

        const r = Math.round(
          baseColor[0] + (WAVE_COLOR[0] - baseColor[0]) * eased
        );
        const g = Math.round(
          baseColor[1] + (WAVE_COLOR[1] - baseColor[1]) * eased
        );
        const b = Math.round(
          baseColor[2] + (WAVE_COLOR[2] - baseColor[2]) * eased
        );

        span.style.color = `rgb(${r},${g},${b})`;
        span.style.textShadow =
          eased > 0.05
            ? `0 0 ${Math.round(eased * 10)}px rgba(${WAVE_COLOR.join(',')},${(
                eased * 0.6
              ).toFixed(2)})`
            : 'none';
      });

      if (pos - SPREAD < chars.length) {
        rafId = requestAnimationFrame(frame);
      } else {
        timeoutId = setTimeout(() => {
          start = null;
          rafId = requestAnimationFrame(frame);
        }, PAUSE_MS);
      }
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [text, resolvedTheme, mounted]);

  return (
    <button className="piano-btn" onClick={onClick}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          className={`piano-char${ch === ' ' ? ' piano-char--space' : ''}`}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}

      <style jsx>{`
        .piano-btn {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
          gap: 0;
          cursor: pointer;
          overflow: visible;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .piano-char {
          display: inline-block;
          transform-origin: bottom center;
          will-change: transform;
        }

        .piano-char--space {
          width: 0.35em;
        }
      `}</style>
    </button>
  );
}