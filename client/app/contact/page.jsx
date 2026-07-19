import { getContent } from '../../lib/content';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Turab Rizvi for internships, freelance work, or collaboration.',
};

export default async function ContactPage() {
  const content = await getContent();
  const { contact, links } = content;

  return (
    <>
      <header className="page-hero wrap">
        <p className="kicker">04 — Contact</p>
        <h1 className="contact-title">
          Let&apos;s build the
          <br />
          <span className="accent-italic">next thing.</span>
        </h1>
      </header>

      <section style={{ paddingTop: '10px' }}>
        <div className="wrap contact-layout">
          <div className="reveal">
            <p className="contact-sub">{contact.sub}</p>
            <ContactForm />
          </div>

          <div className="reveal">
            <p className="kicker" style={{ marginBottom: '20px' }}>Direct channels</p>
            <div className="contact-links" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              {links.email && (
                <a href={`mailto:${links.email}`} className="clink" style={{ justifyContent: 'space-between' }}>
                  <span>EMAIL</span>
                  <span style={{ color: 'var(--ink-dim)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0 }}>
                    {links.email}
                  </span>
                </a>
              )}

              {links.social.map((s) =>
                s.url ? (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="clink" style={{ justifyContent: 'space-between' }}>
                    <span>{s.label}</span>
                    <span style={{ color: 'var(--ink-dim)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0 }}>Visit →</span>
                  </a>
                ) : (
                  <span key={s.id} className="clink btn-disabled" style={{ justifyContent: 'space-between' }}>
                    <span>{s.label}</span>
                    <span className="status">coming soon</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
