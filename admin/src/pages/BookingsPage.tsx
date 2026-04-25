import { useEffect, useState } from 'react';
import { ApiError, apiGet, apiPatchAuth } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

interface BookingListResponse {
  items: Booking[];
  total: number;
}

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Oczekująca',
  confirmed: 'Potwierdzona',
  cancelled: 'Anulowana',
};

const STATUS_CLASS: Record<string, string> = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  cancelled: 'status-cancelled',
};

function toLocalDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BookingsPage() {
  const { token, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    load(filter);
  }, [filter]);

  async function load(statusFilter: StatusFilter) {
    setLoading(true);
    setError('');
    try {
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const data = await apiGet<BookingListResponse>(`/api/admin/bookings${params}`, token!);
      setBookings(data.items);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      else setError('Nie udało się załadować rezerwacji.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdating(id);
    try {
      const updated = await apiPatchAuth<Booking>(
        `/api/admin/bookings/${id}/status`,
        { status: newStatus },
        token!,
      );
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    } finally {
      setUpdating(null);
    }
  }

  const counts = bookings.reduce(
    (acc, b) => ({ ...acc, [b.status]: (acc[b.status] ?? 0) + 1 }),
    {} as Record<string, number>,
  );

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <h2 className="page-title">Rezerwacje</h2>

      {/* ── Filter tabs ── */}
      <div className="filter-tabs">
        {(['all', 'pending', 'confirmed', 'cancelled'] as StatusFilter[]).map((s) => (
          <button
            key={s}
            className={`filter-tab${filter === s ? ' active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s === 'all' ? 'Wszystkie' : STATUS_LABELS[s]}
            {s !== 'all' && counts[s] != null && (
              <span className="filter-tab-count">{counts[s]}</span>
            )}
          </button>
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p className="page-loading">Ładowanie…</p>
        ) : bookings.length === 0 ? (
          <p className="empty-state">Brak rezerwacji.</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Data i godzina</th>
                <th>Usługa</th>
                <th>Pacjent</th>
                <th>Kontakt</th>
                <th>Status</th>
                <th style={{ width: 200 }}>Zmień status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className={b.status === 'cancelled' ? 'row-cancelled' : ''}>
                  <td className="booking-datetime">
                    <span className="booking-date">{toLocalDate(b.date)}</span>
                    <span className="booking-time">{b.time.slice(0, 5)}</span>
                  </td>
                  <td className="booking-service">{b.service}</td>
                  <td className="booking-name">{b.name}</td>
                  <td className="booking-contact">
                    <a href={`tel:${b.phone}`}>{b.phone}</a>
                    {b.email && (
                      <>
                        <br />
                        <a href={`mailto:${b.email}`} style={{ fontSize: 12 }}>
                          {b.email}
                        </a>
                      </>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${STATUS_CLASS[b.status]}`}>
                      {STATUS_LABELS[b.status]}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {b.status !== 'confirmed' && (
                        <button
                          className="btn-status btn-confirm"
                          disabled={updating === b.id}
                          onClick={() => handleStatusChange(b.id, 'confirmed')}
                        >
                          Potwierdź
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button
                          className="btn-status btn-cancel"
                          disabled={updating === b.id}
                          onClick={() => handleStatusChange(b.id, 'cancelled')}
                        >
                          Anuluj
                        </button>
                      )}
                      {b.status !== 'pending' && (
                        <button
                          className="btn-status btn-pending"
                          disabled={updating === b.id}
                          onClick={() => handleStatusChange(b.id, 'pending')}
                        >
                          Oczekująca
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
