'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Loader() {
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    const t = setTimeout(() => setDone(true), 550);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div id="loader" className={done ? 'done' : ''}>
      <div id="loader-mark">
        TR<i>·</i>
      </div>
      <div id="loader-bar">
        {/* key forces remount so the fill animation replays each navigation */}
        <span key={pathname}></span>
      </div>
    </div>
  );
}
