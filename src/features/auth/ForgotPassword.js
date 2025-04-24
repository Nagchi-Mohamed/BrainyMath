import { useState } from 'react';
import { useAuth } from './auth';
import { Link } from 'react-router-dom';
import { trackAuth } from '../../lib/analytics';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
      trackAuth('password_reset_requested');
    } catch (err) {
      setError(err.message);
      trackAuth('password_reset_failed', { error: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
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
          <button disabled={loading} type="submit" className="btn btn-primary w-100 mt-3">
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        <div className="auth-links mt-4 d-flex justify-content-between">
          <Link to="/login">Back to Login</Link>
          <Link to="/signup">Need an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 