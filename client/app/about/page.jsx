export const metadata = {
  title: 'About',
  description: 'AI undergraduate at CUST focused on AI tooling and full-stack engineering.',
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">01 — About</p>
        <h1>
          The <span className="accent-italic">short</span> version
        </h1>
        <p className="lede">
          I&apos;m an AI undergraduate who spends more time in editors than lecture halls —
          though the coursework has been useful too.
        </p>
      </header>

      <section style={{ paddingTop: '20px' }}>
        <div className="wrap about-grid">
          <div className="about-text reveal">
            <p>
              I like projects with a real user on the other end: something that gets installed,
              clicked, or actually used, not just demoed once.
            </p>
            <p>
              My work sits at the intersection of <b>AI tooling</b> and <b>full-stack
              engineering</b> — from offline voice assistants to marketplaces and booking
              platforms. I keep the presentation as grounded as the code: no overselling,
              just what it does and how.
            </p>

            <div className="stat-row">
              <div className="stat">
                <div className="n serif">4+</div>
                <div className="l">SHIPPED PROJECTS</div>
              </div>
              <div className="stat">
                <div className="n serif">3rd</div>
                <div className="l">SEMESTER, BS AI</div>
              </div>
            </div>
          </div>

          <div className="about-side reveal">
            <div className="stack-row"><span>Institution</span><span>CUST, Islamabad</span></div>
            <div className="stack-row"><span>Focus</span><span>AI + Full-Stack Web</span></div>
            <div className="stack-row"><span>Languages</span><span>C++, Python, JS/TS</span></div>
            <div className="stack-row"><span>Frontend</span><span>React, Next.js, Tailwind</span></div>
            <div className="stack-row"><span>Backend</span><span>Node, Express, PostgreSQL</span></div>
            <div className="stack-row"><span>Currently</span><span>Backend Intern Assessment @ XDevflow</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
