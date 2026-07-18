'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { idx: '01', label: 'Home', href: '/' },
  { idx: '02', label: 'About', href: '/about' },
  { idx: '03', label: 'Work', href: '/work' },
  { idx: '04', label: 'Stack', href: '/stack' },
  { idx: '05', label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav>
        <Link href="/" className="nav-mark">
          <span className="dot"></span> TURAB RIZVI
        </Link>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'active' : ''}
            >
              <span className="idx">{item.idx}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="mm-link" onClick={closeMenu}>
            <span className="idx">{item.idx}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
