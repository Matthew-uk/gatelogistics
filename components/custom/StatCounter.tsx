'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  suffix?: string;
  animate: boolean;
  delay?: number;
}

/**
 * StatCounter
 * - counts from 0 to `target` when `animate` becomes true
 * - uses requestAnimationFrame for smooth animation
 * - formats with commas
 * - cleans up timers/RAF on unmount
 */
export default function StatCounter({
  target,
  suffix = '',
  animate,
  delay = 0,
}: Props) {
  const [count, setCount] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // reset to 0 so it always starts from 0 when animate triggers
    setCount(0);

    if (!animate) return;

    // small delay before starting so we can stagger the counters
    timeoutRef.current = window.setTimeout(() => {
      const duration = Math.max(
        800,
        Math.min(2200, Math.round(1200 + target / 20)),
      ); // scale by size
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4);

        const value = Math.floor(eased * target);
        setCount(value);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          // ensure final value is exact
          setCount(target);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, delay, target]);

  // formatted with commas
  const display = count.toLocaleString();

  return (
    <>
      <span className="font-normal font-montserrat" aria-hidden>
        {display}
        {suffix}
      </span>
      {/* visually-hidden for screen readers to announce final value */}
      <span className="sr-only">
        {target}
        {suffix} {` ${target === 1 ? 'item' : 'items'}`}
      </span>
    </>
  );
}
