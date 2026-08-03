import { getContent } from '../../lib/content';

export const metadata = {
  title: 'Education',
  description: 'Educational timeline of Turab Rizvi, BS Artificial Intelligence student at CUST, Islamabad.',
};

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" /><path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4a2 2 0 0 0 2 2c.6 1.2 1.2 1.9 1.9 2.4" />
      <path d="M17 6h3a2 2 0 0 1-2 2c-.6 1.2-1.2 1.9-1.9 2.4" />
    </svg>
  );
}

export default async function EducationPage() {
  const content = await getContent();
  const { education } = content;
  const entries = education.entries || [];

  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">02 — Education</p>
        <h1>
          The <span className="accent-italic">path</span> so far
        </h1>
        <p className="lede">{education.lede}</p>
      </header>

      <section style={{ paddingTop: '20px' }}>
        <div className="wrap">
          {entries.length === 0 ? (
            <div className="edu-empty reveal">
              Nothing posted here yet — <b>timeline entries are on their way.</b>
              <br />
              Check back soon, or see the About page for the current program.
            </div>
          ) : (
            <div className="edu-timeline reveal">
              <div className="edu-rail" />
              {entries.map((entry, i) => (
                <div className={`edu-item${entry.current ? ' current' : ''}`} key={entry.id || i}>
                  <div className="edu-node"><BookIcon /></div>
                  <div className="edu-card">
                    <span className="edu-pill">
                      <span className="dot" />
                      {entry.current ? 'Currently Studying (Ongoing)' : entry.period}
                    </span>
                    <div className="edu-school serif">{entry.institution}</div>
                    <div className="edu-program">{entry.program}</div>
                    {entry.desc && <p className="edu-desc">{entry.desc}</p>}
                    {entry.score && (
                      <div className="edu-stat">
                        <span className="icon"><TrophyIcon /></span>
                        <span>
                          <span className="label">Score / Result</span>
                          <br />
                          <span className="value">{entry.score}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
