import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import { trackFeatureUsage } from '../../lib/analytics';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run if user is authenticated
    if (!currentUser) {
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        // In a real implementation, fetch from your API
        // For now, we'll use mock data

        // Mock stats data
        const mockStats = {
          totalGamesPlayed: 42,
          highestScore: 95,
          averageScore: 78,
          totalPlayTime: 165, // minutes
          skillLevel: 'Intermediate'
        };

        // Mock recent games data
        const mockRecentGames = [
          { id: 1, type: 'addition', score: 85, date: new Date(Date.now() - 86400000).toISOString() },
          { id: 2, type: 'multiplication', score: 92, date: new Date(Date.now() - 172800000).toISOString() },
          { id: 3, type: 'subtraction', score: 78, date: new Date(Date.now() - 259200000).toISOString() },
          { id: 4, type: 'addition', score: 88, date: new Date(Date.now() - 345600000).toISOString() },
          { id: 5, type: 'division', score: 72, date: new Date(Date.now() - 432000000).toISOString() }
        ];

        // In a real app, you would fetch this data from your API
        /*
        const [statsResponse, gamesResponse] = await Promise.all([
          fetch('/api/user/stats', {
            headers: {
              'Authorization': `Bearer ${await currentUser.getIdToken()}`
            }
          }),
          fetch('/api/user/games?limit=5', {
            headers: {
              'Authorization': `Bearer ${await currentUser.getIdToken()}`
            }
          })
        ]);

        if (!statsResponse.ok || !gamesResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const statsData = await statsResponse.json();
        const gamesData = await gamesResponse.json();
        
        setStats(statsData);
        setRecentGames(gamesData);
        */

        // Using mock data for now
        setStats(mockStats);
        setRecentGames(mockRecentGames);
        
        // Track dashboard view
        trackFeatureUsage('dashboard', 'view');
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const navigateToGame = (gameType) => {
    trackFeatureUsage('dashboard', 'game_select', { gameType });
    navigate(`/games/${gameType}`);
  };

  if (!currentUser) {
    return (
      <div className="not-authenticated">
        <h2>Please sign in</h2>
        <p>You need to be signed in to view your dashboard</p>
        <button onClick={() => navigate('/login')} className="btn btn-primary">
          Sign In
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser.displayName || 'Math Hero'}!</h1>
        <p className="last-login">Last login: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="dashboard-grid">
        <div className="stats-card">
          <h2>Your Stats</h2>
          {stats && (
            <div className="stats-content">
              <div className="stat-item">
                <span className="stat-label">Games Played</span>
                <span className="stat-value">{stats.totalGamesPlayed}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Highest Score</span>
                <span className="stat-value">{stats.highestScore}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Score</span>
                <span className="stat-value">{stats.averageScore}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Play Time</span>
                <span className="stat-value">{stats.totalPlayTime} min</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Skill Level</span>
                <span className="stat-value">{stats.skillLevel}</span>
              </div>
            </div>
          )}
        </div>

        <div className="games-card">
          <h2>Play Games</h2>
          <div className="games-grid">
            <div 
              className="game-item" 
              onClick={() => navigateToGame('addition')}
            >
              <div className="game-icon">+</div>
              <span className="game-title">Addition</span>
            </div>
            <div 
              className="game-item" 
              onClick={() => navigateToGame('subtraction')}
            >
              <div className="game-icon">-</div>
              <span className="game-title">Subtraction</span>
            </div>
            <div 
              className="game-item" 
              onClick={() => navigateToGame('multiplication')}
            >
              <div className="game-icon">×</div>
              <span className="game-title">Multiplication</span>
            </div>
            <div 
              className="game-item" 
              onClick={() => navigateToGame('division')}
            >
              <div className="game-icon">÷</div>
              <span className="game-title">Division</span>
            </div>
          </div>
        </div>

        <div className="recent-games-card">
          <h2>Recent Games</h2>
          {recentGames.length > 0 ? (
            <table className="recent-games-table">
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentGames.map(game => (
                  <tr key={game.id}>
                    <td>{game.type.charAt(0).toUpperCase() + game.type.slice(1)}</td>
                    <td>{game.score}</td>
                    <td>{new Date(game.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-games">No recent games found. Start playing!</p>
          )}
        </div>

        <div className="achievements-card">
          <h2>Achievements</h2>
          <div className="achievements-list">
            <div className="achievement achievement-unlocked">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-details">
                <span className="achievement-title">First Victory</span>
                <span className="achievement-desc">Win your first game</span>
              </div>
            </div>
            <div className="achievement achievement-locked">
              <div className="achievement-icon">🔒</div>
              <div className="achievement-details">
                <span className="achievement-title">Perfect Score</span>
                <span className="achievement-desc">Get 100% in any game</span>
              </div>
            </div>
            <div className="achievement achievement-locked">
              <div className="achievement-icon">🔒</div>
              <div className="achievement-details">
                <span className="achievement-title">Math Wizard</span>
                <span className="achievement-desc">Play 50 games</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 