export const metadata = {
  title: 'Stack',
  description: 'Languages, frameworks, and tools Turab Rizvi works with across AI and full-stack projects.',
};

const GROUPS = [
  { title: 'Languages', items: ['C++', 'Python', 'JavaScript / TypeScript', 'SQL'] },
  { title: 'Frontend', items: ['React & Next.js', 'React Router', 'Tailwind CSS', 'Vite'] },
  { title: 'Backend & Data', items: ['Node.js / Express', 'PostgreSQL', 'Prisma ORM', 'REST API design'] },
  { title: 'AI / ML', items: ['Vosk (offline speech)', 'Groq API', 'Search algorithms (BFS/DFS)', 'Applied ML fundamentals'] },
  { title: 'Tooling', items: ['Git & GitHub', 'VS Code', 'Linux / bash', 'Figma (light use)'] },
  { title: 'Currently Learning', items: ['Prisma + Express in depth', 'System design fundamentals', 'Advanced data structures'] },
];

export default function StackPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">03 — Stack</p>
        <h1>
          Tools of the <span className="accent-italic">trade</span>
        </h1>
        <p className="lede">What I reach for, grouped by where it actually gets used.</p>
      </header>

      <div className="marquee reveal">
        <div className="marquee-track">
          <span>
            <b>C++</b> Python <b>React</b> Next.js <b>Node.js</b> Express <b>PostgreSQL</b>{' '}
            Prisma ORM <b>Tailwind CSS</b> Vosk <b>Groq API</b> JavaScript <b>Git</b> REST APIs{' '}
            <b>C++</b> Python <b>React</b> Next.js <b>Node.js</b> Express <b>PostgreSQL</b>{' '}
            Prisma ORM <b>Tailwind CSS</b> Vosk <b>Groq API</b> JavaScript <b>Git</b> REST APIs
          </span>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="skill-grid reveal">
            {GROUPS.map((g) => (
              <div className="skill-card" key={g.title}>
                <div className="sc-title serif">{g.title}</div>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
