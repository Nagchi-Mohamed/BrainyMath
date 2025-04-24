import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
  ButtonGroup,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import DivideIcon from '@mui/icons-material/Calculate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { getGameHistory } from '../lib/api';

const GameHistory = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gameData, setGameData] = useState({
    games: [],
    stats: {
      totalGames: 0,
      averageScore: 0,
      highestScore: 0,
      totalTimePlayed: 0,
      gamesByType: {}
    }
  });
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('week');
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Get game history
  useEffect(() => {
    const fetchGameHistory = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const data = await getGameHistory(filter, timeRange);
        setGameData(data);
      } catch (err) {
        console.error('Error fetching game history:', err);
        setError('Failed to load your game history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameHistory();
  }, [currentUser, filter, timeRange]);
  
  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };
  
  // Handle time range change
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    setPage(0);
  };
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Get game icon based on game type
  const getGameIcon = (gameType) => {
    switch (gameType) {
      case 'ADDITION':
        return <AddIcon />;
      case 'SUBTRACTION':
        return <RemoveIcon />;
      case 'MULTIPLICATION':
        return <MultiplyIcon />;
      case 'DIVISION':
        return <DivideIcon />;
      default:
        return null;
    }
  };
  
  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, 'PPp'); // Formats as 'Apr 29, 2021, 5:30 PM'
  };
  
  // Get game name with first letter capitalized
  const getGameName = (gameType) => {
    return gameType.charAt(0) + gameType.slice(1).toLowerCase();
  };
  
  // Prepare chart data
  const prepareChartData = () => {
    if (!gameData.games || gameData.games.length === 0) return [];
    
    return gameData.games
      .slice()
      .reverse()
      .map(game => ({
        date: new Date(game.createdAt).getTime(),
        score: game.score,
        gameType: game.gameType,
        formattedDate: format(new Date(game.createdAt), 'MMM d')
      }))
      .slice(0, 15); // Show only the last 15 games for better readability
  };
  
  // Prepare game type distribution data
  const prepareGameTypeData = () => {
    const { gamesByType } = gameData.stats;
    
    return Object.entries(gamesByType || {}).map(([type, count]) => ({
      name: getGameName(type),
      value: count
    }));
  };
  
  // Format seconds to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper elevation={3} sx={{ p: 1.5 }}>
          <Typography variant="subtitle2">{data.formattedDate}</Typography>
          <Typography variant="body2">
            {getGameName(data.gameType)} - Score: {data.score}
          </Typography>
        </Paper>
      );
    }
    return null;
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const chartData = prepareChartData();
  const gameTypeData = prepareGameTypeData();
  const { games, stats } = gameData;
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Game History
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ButtonGroup variant="outlined" aria-label="game filter">
              <Button 
                onClick={() => handleFilterChange('all')} 
                variant={filter === 'all' ? 'contained' : 'outlined'}
              >
                All Games
              </Button>
              <Button 
                onClick={() => handleFilterChange('ADDITION')} 
                variant={filter === 'ADDITION' ? 'contained' : 'outlined'}
                startIcon={<AddIcon />}
              >
                Addition
              </Button>
              <Button 
                onClick={() => handleFilterChange('SUBTRACTION')} 
                variant={filter === 'SUBTRACTION' ? 'contained' : 'outlined'}
                startIcon={<RemoveIcon />}
              >
                Subtraction
              </Button>
              <Button 
                onClick={() => handleFilterChange('MULTIPLICATION')} 
                variant={filter === 'MULTIPLICATION' ? 'contained' : 'outlined'}
                startIcon={<MultiplyIcon />}
              >
                Multiplication
              </Button>
              <Button 
                onClick={() => handleFilterChange('DIVISION')} 
                variant={filter === 'DIVISION' ? 'contained' : 'outlined'}
                startIcon={<DivideIcon />}
              >
                Division
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              id="time-range-select"
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="week">Last 7 Days</MenuItem>
              <MenuItem value="month">Last 30 Days</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ViewListIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.totalGames}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Games
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.highestScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Highest Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#4caf50', marginBottom: '8px' }}>
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="currentColor" />
              </svg>
              <Typography variant="h5" component="div">
                {stats.averageScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {formatTime(stats.totalTimePlayed)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Time Played
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Score Over Time Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Score Progress</Typography>
            {chartData.length > 0 ? (
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="formattedDate"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4caf50" 
                      activeDot={{ r: 8 }}
                      name="Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No data available for the selected time range
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Game Type Distribution Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Games by Type</Typography>
            {gameTypeData.length > 0 ? (
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gameTypeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4caf50" name="Games Played" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No data available for the selected time range
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Game History Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" sx={{ p: 2, pb: 0 }}>Game Details</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="game history table">
            <TableHead>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Time Spent</TableCell>
                <TableCell>Mistakes</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.length > 0 ? (
                games
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((game) => (
                    <TableRow key={game._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            icon={getGameIcon(game.gameType)} 
                            label={getGameName(game.gameType)} 
                            color={
                              game.gameType === 'ADDITION' ? 'primary' :
                              game.gameType === 'SUBTRACTION' ? 'secondary' :
                              game.gameType === 'MULTIPLICATION' ? 'success' :
                              'warning'
                            }
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{game.score}</TableCell>
                      <TableCell>{game.timeSpent} seconds</TableCell>
                      <TableCell>{game.mistakes}</TableCell>
                      <TableCell>{formatDate(game.createdAt)}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      No games found. Play some games to see your history!
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate('/')}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Play a Game Now
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {games.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={games.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Container>
  );
};

export default GameHistory; 