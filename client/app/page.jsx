import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <header className="hero wrap" id="top">
        <div>
          <p className="kicker fade-in-up" style={{ transitionDelay: '0.05s', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <span style={{ width: '26px', height: '1px', background: 'var(--orange)', display: 'inline-block' }}></span>
            Islamabad, Pakistan — AI &amp; Full-Stack Dev
          </p>

          <h1 className="hero-title">
            <span className="line"><span>Syed Muhammad</span></span>
            <span className="line"><span className="accent-italic">Turab</span> <span>Rizvi</span></span>
          </h1>

          <p className="lede fade-in-up" style={{ marginTop: '26px', maxWidth: '460px', transitionDelay: '0.55s' }}>
            3rd-semester AI undergrad at <b style={{ color: 'var(--ink)', fontWeight: 500 }}>CUST</b>, building
            things that solve real problems — an offline AI assistant, a campus marketplace,
            a car-rental platform, and whatever the next brief calls for.
          </p>

          <div className="fade-in-up" style={{ marginTop: '38px', display: 'flex', gap: '16px', flexWrap: 'wrap', transitionDelay: '0.75s' }}>
            <Link href="/work" className="btn btn-solid">See the work →</Link>
            <Link href="/contact" className="btn btn-ghost">Get in touch</Link>
            <a href="/resume.pdf" className="btn btn-ghost" download>Resume ↓</a>
          </div>
        </div>

        <div className="portrait-wrap">
          {/* Added 'reveal' class here */}
          <div className="portrait-frame reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/portrait.jpg" alt="Portrait of Turab Rizvi" />
            <div className="glaze"></div>
            <div className="frame-edge"></div>
            <div className="scanbeam"></div>
          </div>
          {/* Added 'reveal' class here */}
          <div className="portrait-tag reveal">FIG. 01 — IN THE FRAME</div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-num">◦</span>
            <h2 className="section-title">
              What I actually <span className="accent-italic">do</span>
            </h2>
            <div className="section-rule"></div>
          </div>

          <div className="skill-grid reveal">
            <div className="skill-card">
              <div className="sc-title serif">AI Tooling</div>
              <ul>
                <li>Offline-capable assistants</li>
                <li>Speech-to-intent pipelines</li>
                <li>Search &amp; solver algorithms</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="sc-title serif">Full-Stack Web</div>
              <ul>
                <li>React / Next.js frontends</li>
                <li>Node &amp; Express APIs</li>
                <li>PostgreSQL + Prisma data layers</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="sc-title serif">Systems Thinking</div>
              <ul>
                <li>Custom data structures</li>
                <li>C++ performance-critical code</li>
                <li>Clear, grounded documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}