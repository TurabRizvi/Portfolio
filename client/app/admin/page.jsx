'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../../lib/api';
import ContentEditor from '../../components/admin/ContentEditor';

function formatDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  );
}

export default function AdminPage() {
  // auth
  const [checkingSession, setCheckingSession] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // data
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [tab, setTab] = useState('new');
  const [expandedId, setExpandedId] = useState(null);

  // ---------- session check on mount ----------
  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/api/admin/me');
        if (res.ok) {
          setAuthed(true);
          loadSubmissions();
        }
      } catch {
        // backend unreachable — treat as logged out, login screen will surface the error on submit
      } finally {
        setCheckingSession(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSubmissions() {
    setLoadingSubs(true);
    setLoadError('');
    try {
      const res = await apiFetch('/api/admin/submissions');
      if (!res.ok) throw new Error('failed to load');
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch {
      setLoadError("Couldn't load messages. Is the backend running on localhost:4000?");
    } finally {
      setLoadingSubs(false);
    }
  }

  const onLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        setPassword('');
        loadSubmissions();
        return;
      }
      const data = await res.json().catch(() => null);
      setLoginError(data?.error || 'Incorrect password.');
    } catch {
      setLoginError("Couldn't reach the server. Is it running on localhost:4000?");
    } finally {
      setLoggingIn(false);
    }
  };

  const onLogout = async () => {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // even if the request fails, drop the client-side authed state
    }
    setAuthed(false);
    setSubmissions([]);
  };

  const markViewed = async (id) => {
    const res = await apiFetch(`/api/admin/submissions/${id}/view`, { method: 'PATCH' });
    if (res.ok) {
      setSubmissions((subs) => subs.map((s) => (s.id === id ? { ...s, viewed: true } : s)));
    }
  };

  const deleteSub = async (id) => {
    if (!confirm('Delete this message permanently?')) return;
    const res = await apiFetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSubmissions((subs) => subs.filter((s) => s.id !== id));
      setExpandedId((cur) => (cur === id ? null : cur));
    }
  };

  const filtered = useMemo(() => {
    return submissions
      .filter((s) => (tab === 'new' ? !s.viewed : s.viewed))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [submissions, tab]);

  const newCount = submissions.filter((s) => !s.viewed).length;
  const viewedCount = submissions.filter((s) => s.viewed).length;

  if (checkingSession) return null;

  if (!authed) {
    return (
      <div className="admin-shell">
        <div className="admin-login">
          <div className="admin-login-card">
            <p className="kicker" style={{ justifyContent: 'center', marginBottom: '16px' }}>Restricted</p>
            <h1 className="serif">Admin access</h1>
            <form onSubmit={onLogin}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.58 10.58A3 3 0 0 0 13.42 13.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.12 14.12A7.5 7.5 0 0 1 21 12c-2.94-4.5-8.06-7-13-7a17.9 17.9 0 0 0-3 .26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
              <button type="submit" className="btn btn-solid" style={{ justifyContent: 'center' }} disabled={loggingIn}>
                {loggingIn ? 'Checking…' : 'Unlock →'}
              </button>
            </form>
            <p className="form-status error" style={{ marginTop: '14px' }}>{loginError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-dashboard" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="admin-bar">
          <div className="kicker">
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--orange)',
                boxShadow: '0 0 10px rgba(255,106,26,.9)',
                display: 'inline-block',
                marginRight: '10px',
              }}
            ></span>
            ADMIN PANEL
          </div>
          <button className="btn btn-ghost" onClick={onLogout}>Log out</button>
        </div>

        <div className="admin-main">
          <div className="admin-tabs">
            <button className={`admin-tab${tab === 'new' ? ' active' : ''}`} onClick={() => setTab('new')}>
              New <span className="count">{newCount}</span>
            </button>
            <button className={`admin-tab${tab === 'viewed' ? ' active' : ''}`} onClick={() => setTab('viewed')}>
              Viewed <span className="count">{viewedCount}</span>
            </button>
            <button className={`admin-tab${tab === 'content' ? ' active' : ''}`} onClick={() => setTab('content')}>
              Edit Site
            </button>
          </div>

          {tab === 'content' && <ContentEditor />}

          {tab !== 'content' && loadingSubs && <div className="empty-state">Loading messages…</div>}

          {tab !== 'content' && !loadingSubs && loadError && <div className="empty-state">{loadError}</div>}

          {tab !== 'content' && !loadingSubs && !loadError && (
            <div className="sub-list">
              {filtered.length === 0 && (
                <div className="empty-state">
                  {tab === 'new' ? 'No new messages. All caught up.' : 'Nothing viewed yet.'}
                </div>
              )}

              {filtered.map((s) => {
                const expanded = expandedId === s.id;
                return (
                  <div
                    className={`sub-item${expanded ? ' expanded' : ''}`}
                    key={s.id}
                    onClick={() => setExpandedId(expanded ? null : s.id)}
                  >
                    <div className="sub-item-top">
                      <div className="sub-item-name">
                        {!s.viewed && <span className="new-dot"></span>}
                        {s.name}
                      </div>
                      <div className="sub-item-meta">{formatDate(s.createdAt)}</div>
                    </div>

                    {!expanded && <div className="sub-item-preview">{s.message}</div>}

                    {expanded && (
                      <div className="sub-item-detail">
                        <div className="field">
                          <div className="field-label">From</div>
                          <div className="field-value">{s.name} — {s.email}</div>
                        </div>
                        <div className="field">
                          <div className="field-label">Message</div>
                          <div className="field-value">{s.message}</div>
                        </div>
                        <div className="field">
                          <div className="field-label">Received</div>
                          <div className="field-value">{formatDate(s.createdAt)}</div>
                        </div>
                        <div className="sub-item-actions" onClick={(e) => e.stopPropagation()}>
                          {!s.viewed && (
                            <button className="btn-view" onClick={() => markViewed(s.id)}>Mark as viewed</button>
                          )}
                          <button className="btn-delete" onClick={() => deleteSub(s.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
