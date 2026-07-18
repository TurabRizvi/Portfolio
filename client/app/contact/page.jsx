'use client';

import { useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill in every field.');
      setError(true);
      return;
    }

    setSending(true);
    setStatus('Sending…');

    try {
      const res = await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        setStatus("Message sent — I'll get back to you soon.");
        setForm({ name: '', email: '', message: '', company: '' });
        return;
      }

      if (res.status === 429) {
        setStatus("You've sent a few messages already — please try again in a bit.");
        setError(true);
        return;
      }

      if (res.status === 400) {
        const data = await res.json().catch(() => null);
        const detail = data?.details?.[0]?.message;
        setStatus(detail || 'Please check your details and try again.');
        setError(true);
        return;
      }

      throw new Error('Unexpected response');
    } catch {
      setStatus("Couldn't reach the server right now — email me directly at turabrizvi948@gmail.com meanwhile.");
      setError(true);
    } finally {
      setSending(false);
    }
  };

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
            <p className="contact-sub">
              Open to backend / full-stack internships and collaborative AI projects. Send a
              message directly, or reach out through whichever channel is easiest.
            </p>

            <form className="contact-form" onSubmit={onSubmit}>
              <div>
                <label htmlFor="cf-name">Name</label>
                <input type="text" id="cf-name" name="name" value={form.name} onChange={onChange} required />
              </div>
              <div>
                <label htmlFor="cf-email">Email</label>
                <input type="email" id="cf-email" name="email" value={form.email} onChange={onChange} required />
              </div>
              <div>
                <label htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" name="message" rows={5} value={form.message} onChange={onChange} required></textarea>
              </div>

              {/* Honeypot — left blank by real visitors, invisible via CSS not display:none */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="cf-company">Company</label>
                <input
                  type="text"
                  id="cf-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={onChange}
                />
              </div>

              <button type="submit" className="btn btn-solid" style={{ alignSelf: 'flex-start' }} disabled={sending}>
                Send message →
              </button>
              <div className={`form-status${error ? ' error' : ''}`}>{status}</div>
            </form>
          </div>

          <div className="reveal">
            <p className="kicker" style={{ marginBottom: '20px' }}>Direct channels</p>
            <div className="contact-links" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <a href="mailto:turabrizvi948@gmail.com" className="clink" style={{ justifyContent: 'space-between' }}>
                <span>EMAIL</span>
                <span style={{ color: 'var(--ink-dim)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0 }}>
                  turabrizvi948@gmail.com
                </span>
              </a>
              <a
                href="https://github.com/TurabRizvi"
                target="_blank"
                rel="noopener noreferrer"
                className="clink"
                style={{ justifyContent: 'space-between' }}
              >
                <span>GITHUB</span>
                <span style={{ color: 'var(--ink-dim)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0 }}>
                  @TurabRizvi
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/turab-rizvi-1b6719376"
                target="_blank"
                rel="noopener noreferrer"
                className="clink"
                style={{ justifyContent: 'space-between' }}
              >
                <span>LINKEDIN</span>
                <span style={{ color: 'var(--ink-dim)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 0 }}>
                  in/turab-rizvi
                </span>
              </a>
              <span className="clink btn-disabled" style={{ justifyContent: 'space-between' }}>
                <span>WHATSAPP</span>
                <span className="status">coming soon</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
