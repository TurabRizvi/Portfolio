'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Observes every .reveal / .fade-in-up element on the current page and
 * adds .in when it scrolls into view. Re-runs on each route change since
 * Next.js swaps content without a full page reload.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('in');
        });
      },
      { threshold: 0.15 }
    );

    // slight delay so the new page's DOM is painted before we query it
    const t = setTimeout(() => {
      // Below-the-fold content waits for scroll.
      document.querySelectorAll('.reveal, .fade-in-up').forEach((el) => {
        if (el.closest('.hero')) return; // hero-scoped elements are handled immediately below
        io.observe(el);
      });

      // Hero elements (title, portrait, kicker/lede/cta) are always
      // above the fold on first paint, so they reveal immediately
      // instead of waiting on IntersectionObserver — that dependency is
      // exactly what caused the portrait to sometimes stay invisible.
      document.querySelectorAll('.hero-title .line span').forEach((el, i) => {
        el.style.transitionDelay = `${0.15 + i * 0.12}s`;
        requestAnimationFrame(() => el.classList.add('in'));
      });
      document.querySelectorAll('.hero .reveal, .hero .fade-in-up, .portrait-frame, .portrait-tag').forEach((el) => {
        requestAnimationFrame(() => el.classList.add('in'));
      });
    }, 50);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
