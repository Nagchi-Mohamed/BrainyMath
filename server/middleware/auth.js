const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'No authorization header provided' 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'No token provided' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'], // Only allow HS256 algorithm
      maxAge: '24h' // Token should not be older than 24 hours
    });
    
    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Token has expired' 
      });
    }

    // Check if token was issued in the future (clock skew)
    if (decoded.iat && Date.now() < decoded.iat * 1000) {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Token was issued in the future' 
      });
    }
    
    // Add user from payload
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'AUTH_ERROR',
        message: 'Token has expired' 
      });
    }
    
    res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'Internal server error during authentication' 
    });
  }
}; 