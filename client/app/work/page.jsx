export const metadata = {
  title: 'Work',
  description: 'Selected work by Turab Rizvi: Amethyst, Campus Freelance Board, Aurum Drive, and a 2048 AI solver.',
};

const PROJECTS = [
  {
    idx: '01',
    name: 'Amethyst',
    role: 'Offline AI Desktop Assistant',
    desc: 'A desktop assistant that runs without an internet dependency for its core loop — local speech recognition paired with the Groq API for language understanding, wrapped in a C++ shell for speed.',
    tags: ['C++', 'Python', 'Vosk', 'Groq API'],
  },
  {
    idx: '02',
    name: 'Campus Freelance Board',
    role: 'Full-Stack Marketplace',
    desc: 'A freelance marketplace built for a campus audience — students posting and taking on paid work, with a proper data layer underneath instead of a spreadsheet pretending to be one.',
    tags: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
  },
  {
    idx: '03',
    name: 'Aurum Drive',
    role: 'Premium Car Rental Platform',
    desc: 'A car-rental front end built as a backend-intern technical assessment — local image management, an admin dashboard, and a dark/light theme system built on CSS custom properties.',
    tags: ['React (Vite)', 'React Router', 'Tailwind CSS'],
  },
  {
    idx: '04',
    name: '2048 — Data Structures Edition',
    role: 'Group Project, AI Solver',
    desc: 'A 2048 clone with an AI solver behind it, searching moves with BFS and DFS on top of six custom-built data structures — implemented in parallel across C++ and JavaScript.',
    tags: ['C++', 'JavaScript', 'BFS / DFS', 'Custom DS'],
  },
];

export default function WorkPage() {
  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">02 — Work</p>
        <h1>
          Selected <span className="accent-italic">work</span>
        </h1>
        <p className="lede">
          Four projects, four different problems — an AI assistant, a marketplace, a rental
          platform, and a solver.
        </p>
      </header>

      <section style={{ paddingTop: '20px' }}>
        <div className="wrap">
          <div className="projects reveal">
            {PROJECTS.map((p) => (
              <div className="project" key={p.idx}>
                <div className="project-index">{p.idx}</div>
                <div>
                  <div className="project-name serif">{p.name}</div>
                  <div className="project-role">{p.role}</div>
                </div>
                <div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="tag-row">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
