import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, apiPost } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/settings', { replace: true });
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiPost<TokenResponse>('/api/admin/auth/login', {
        username,
        password,
      });
      login(data.access_token);
      navigate('/settings', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Nieprawidłowa nazwa użytkownika lub hasło.');
      } else {
        setError('Błąd połączenia z serwerem. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-brand">
          <span className="sidebar-logo">🦷</span>
          <h1>Dentvital Admin</h1>
        </div>

        <div className="form-group">
          <label htmlFor="username">Nazwa użytkownika</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Hasło</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Logowanie…' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
}
