'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // FIX: fade the button out once the footer scrolls into view so it stops
  // sitting on top of / blocking taps on the footer (e.g. "Admin Login") on
  // short mobile pages.
  useEffect(() => {
    const footerEl = document.querySelector('footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const classes = ['show', 'near-footer']
    .filter((c) => (c === 'show' ? show : nearFooter))
    .join(' ');

  return (
    <button
      id="to-top"
      className={classes}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {/* FIX: replaced the "↑" Unicode character — it fell back to the wrong
          glyph (rendered as "1") on some mobile system fonts. An inline SVG
          renders identically everywhere, with no font dependency. */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}