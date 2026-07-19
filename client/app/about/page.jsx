import { getContent } from '../../lib/content';

export const metadata = {
  title: 'About',
  description: 'AI undergraduate at CUST focused on AI tooling and full-stack engineering.',
};

export default async function AboutPage() {
  const content = await getContent();
  const { about } = content;

  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">01 — About</p>
        <h1>
          The <span className="accent-italic">short</span> version
        </h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section style={{ paddingTop: '20px' }}>
        <div className="wrap about-grid">
          <div className="about-text reveal">
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

            <div className="stat-row">
              {about.stats.map((s) => (
                <div className="stat" key={s.l}>
                  <div className="n serif">{s.n}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-side reveal">
            {about.sideRows.map((row) => (
              <div className="stack-row" key={row.label}>
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
