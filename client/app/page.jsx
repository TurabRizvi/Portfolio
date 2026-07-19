import Link from 'next/link';
import { getContent } from '../lib/content';

export default async function HomePage() {
  const content = await getContent();
  const { hero, whatIDo, technicalSkills, links } = content;

  return (
    <>
      <header className="hero wrap" id="top">
        <div>
          <p className="kicker fade-in-up" style={{ transitionDelay: '0.05s', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <span style={{ width: '26px', height: '1px', background: 'var(--orange)', display: 'inline-block' }}></span>
            {hero.kicker}
          </p>

          <h1 className="hero-title">
            <span className="line"><span>{hero.nameFirstLine}</span></span>
            <span className="line"><span className="accent-italic">{hero.nameAccent}</span> <span>{hero.nameRest}</span></span>
          </h1>

          <p className="lede fade-in-up" style={{ marginTop: '26px', maxWidth: '460px', transitionDelay: '0.55s' }}>
            {hero.lede}
          </p>

          <div className="fade-in-up" style={{ marginTop: '38px', display: 'flex', gap: '16px', flexWrap: 'wrap', transitionDelay: '0.75s' }}>
            <Link href="/work" className="btn btn-solid">See the work →</Link>
            <Link href="/contact" className="btn btn-ghost">Get in touch</Link>
            {links.resume && (
              <a href={links.resume} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                Resume ↓
              </a>
            )}
          </div>
        </div>

        <div className="portrait-wrap">
          <div className="portrait-frame reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/portrait.jpg" alt="Portrait of Turab Rizvi" />
            <div className="glaze"></div>
            <div className="frame-edge"></div>
            <div className="scanbeam"></div>
          </div>
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

          <div className="reveal" style={{ maxWidth: '640px', marginBottom: '50px' }}>
            {whatIDo.paragraphs.map((p, i) => (
              <p className="lede" style={{ marginBottom: '16px' }} key={i}>{p}</p>
            ))}
            <p className="lede" style={{ color: 'var(--orange-soft)', fontWeight: 500 }}>{whatIDo.tagline}</p>
          </div>

          <div className="skill-grid reveal">
            {whatIDo.categories.map((cat) => (
              <div className="skill-card" key={cat.title}>
                <div className="sc-title serif">{cat.title}</div>
                <ul>
                  {cat.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="section-num">◦</span>
            <h2 className="section-title">
              Technical <span className="accent-italic">skills</span>
            </h2>
            <div className="section-rule"></div>
          </div>

          <div className="skill-grid reveal">
            {technicalSkills.map((cat) => (
              <div className="skill-card" key={cat.title}>
                <div className="sc-title serif">{cat.title}</div>
                <ul>
                  {cat.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
