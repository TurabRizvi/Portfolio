'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollReveal from './ScrollReveal';

export default function Chrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Nav />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}
      <ScrollReveal />
    </>
  );
}
