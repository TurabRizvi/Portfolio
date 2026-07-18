import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <span>© 2026 TURAB RIZVI</span>
      <div className="fmark">
        <span>ISLAMABAD, PK</span>
        <Link href="/admin" className="footer-admin-link">Admin Login</Link>
      </div>
    </footer>
  );
}
