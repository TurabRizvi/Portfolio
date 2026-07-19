import { getContent } from '../../lib/content';

export const metadata = {
  title: 'Work',
  description: 'Selected work by Turab Rizvi: Amethyst, Campus Freelance Board, Aurum Drive, and a 2048 AI solver.',
};

export default async function WorkPage() {
  const content = await getContent();
  const { work } = content;

  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">02 — Work</p>
        <h1>
          Selected <span className="accent-italic">work</span>
        </h1>
        <p className="lede">{work.lede}</p>
      </header>

      <section style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="projects reveal">
            {work.projects.map((p) => {
              const Wrapper = p.link ? 'a' : 'div';
              const linkProps = p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Wrapper className="project" key={p.idx} {...linkProps}>
                  <div className="project-index">{p.idx}</div>
                  <div>
                    <div className="project-name serif">{p.name}</div>
                    <div className="project-role">{p.role}</div>
                  </div>
                  <div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="tag-row">
                      {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
