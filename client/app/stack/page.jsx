import { getContent } from '../../lib/content';

export const metadata = {
  title: 'Stack',
  description: 'Languages, frameworks, and tools Turab Rizvi works with across AI and full-stack projects.',
};

export default async function StackPage() {
  const content = await getContent();
  const { stack } = content;

  const marqueeItems = stack.groups.flatMap((g) => g.items);

  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">03 — Stack</p>
        <h1>
          Tools of the <span className="accent-italic">trade</span>
        </h1>
        <p className="lede">{stack.lede}</p>
      </header>

      <div className="marquee reveal">
        <div className="marquee-track">
          <span>
            {marqueeItems.map((item, i) => (
              <span key={i}>{i % 3 === 0 ? <b>{item}</b> : item}</span>
            ))}
            {marqueeItems.map((item, i) => (
              <span key={`dup-${i}`}>{i % 3 === 0 ? <b>{item}</b> : item}</span>
            ))}
          </span>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="skill-grid reveal">
            {stack.groups.map((g) => (
              <div className="skill-card" key={g.title}>
                <div className="sc-title serif">{g.title}</div>
                <ul>
                  {g.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
