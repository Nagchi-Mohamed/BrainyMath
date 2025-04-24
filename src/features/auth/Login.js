import { useState } from 'react';
import { useAuth } from './auth';
import { Link, useNavigate } from 'react-router-dom';
import { trackAuth } from '../../lib/analytics';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      trackAuth('login_success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      trackAuth('login_failed', { error: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Log In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button disabled={loading} type="submit" className="btn btn-primary w-100 mt-3">
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <div className="auth-links mt-4 d-flex justify-content-between">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Need an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 