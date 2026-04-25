import { useEffect, useState } from 'react';
import { ApiError, apiDelete, apiGet, apiPatchAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface MessageListResponse {
  items: Message[];
  total: number;
  unread: number;
}

type Filter = 'all' | 'unread';

function toLocalDate(iso: string) {
  return new Date(iso).toLocaleString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MessagesPage() {
  const { token, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [acting, setActing] = useState<string | null>(null);

  useEffect(() => {
    load(filter);
  }, [filter]);

  async function load(f: Filter) {
    setLoading(true);
    setError('');
    try {
      const params = f === 'unread' ? '?unread_only=true' : '';
      const data = await apiGet<MessageListResponse>(`/api/admin/messages${params}`, token!);
      setMessages(data.items);
      setUnreadCount(data.unread);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować wiadomości.');
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id: string) {
    setActing(id);
    try {
      const updated = await apiPatchAuth<Message>(`/api/admin/messages/${id}/read`, {}, token!);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setActing(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Usunąć wiadomość od „${name}"?`)) return;
    setActing(id);
    try {
      await apiDelete(`/api/admin/messages/${id}`, token!);
      const deleted = messages.find((m) => m.id === id);
      if (deleted && !deleted.is_read) setUnreadCount((c) => Math.max(0, c - 1));
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (expanded === id) setExpanded(null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setActing(null);
    }
  }

  function toggle(id: string, isRead: boolean) {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      if (!isRead) handleMarkRead(id);
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Wiadomości kontaktowe</h2>

      <div className="filter-tabs">
        <button
          className={`filter-tab${filter === 'all' ? ' active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Wszystkie
        </button>
        <button
          className={`filter-tab${filter === 'unread' ? ' active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Nieprzeczytane
          {unreadCount > 0 && (
            <span className="filter-tab-count">{unreadCount}</span>
          )}
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}

      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p className="page-loading">Ładowanie…</p>
        ) : messages.length === 0 ? (
          <p className="empty-state">Brak wiadomości.</p>
        ) : (
          <div className="msg-list">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`msg-item${!m.is_read ? ' msg-unread' : ''}${expanded === m.id ? ' msg-open' : ''}`}
              >
                <div className="msg-header" onClick={() => toggle(m.id, m.is_read)}>
                  <div className="msg-header-left">
                    {!m.is_read && <span className="msg-dot" />}
                    <span className="msg-name">{m.name}</span>
                    <span className="msg-preview">
                      {m.message.slice(0, 80)}{m.message.length > 80 ? '…' : ''}
                    </span>
                  </div>
                  <div className="msg-header-right">
                    <span className="msg-date">{toLocalDate(m.created_at)}</span>
                    <span className="msg-chevron">{expanded === m.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expanded === m.id && (
                  <div className="msg-body">
                    <div className="msg-meta">
                      <span><strong>E-mail:</strong> <a href={`mailto:${m.email}`}>{m.email}</a></span>
                      {m.phone && <span><strong>Telefon:</strong> <a href={`tel:${m.phone}`}>{m.phone}</a></span>}
                    </div>
                    <p className="msg-text">{m.message}</p>
                    <div className="msg-actions">
                      <a className="btn-primary" href={`mailto:${m.email}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                        Odpowiedz e-mailem
                      </a>
                      <button
                        className="btn-delete"
                        disabled={acting === m.id}
                        onClick={() => handleDelete(m.id, m.name)}
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
