'use client';

import { useEffect, useRef } from 'react';

export default function ProgressBeam() {
  const beamRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
      if (beamRef.current) beamRef.current.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="beam" ref={beamRef}></div>;
}
