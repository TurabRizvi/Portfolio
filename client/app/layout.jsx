import './globals.css';
import Loader from '../components/Loader';
import CustomCursor from '../components/CustomCursor';
import ProgressBeam from '../components/ProgressBeam';
import Chrome from '../components/Chrome';

export const metadata = {
  title: {
    default: 'Turab Rizvi — AI & Full-Stack Developer',
    template: '%s — Turab Rizvi',
  },
  description:
    'Portfolio of Turab Rizvi — AI undergraduate and full-stack developer building offline AI tools, marketplaces, and web platforms.',
  icons: {
    icon: '/favicon.png?v=2', // <--- Add ?v=2 here
  },
};

export const viewport = {
  themeColor: '#0b0a08',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,450;0,9..144,560;0,9..144,700;1,9..144,450&family=Instrument+Serif:ital@1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Loader />
        <CustomCursor />
        <ProgressBeam />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}