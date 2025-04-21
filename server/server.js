import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import forumRoutes from './routes/forumRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
// import gamesRoutes from './routes/games.js'; // Commented out due to missing quizController
import gamesRoutes from './routes/games.js';

dotenv.config();

const app = express();

logger.info('Server starting...');

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
app.use('/api/groups', groupRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.set('trust proxy', 1); // If behind a proxy (e.g., Heroku)

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(morgan('dev'));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit general API calls
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/', generalLimiter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other requests, serve the React app index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// API routes
app.use('/api', routes);

...
// Mount forum routes
app.use('/api/forums', forumRoutes);

// Mount group routes
import groupRoutes from './routes/groupRoutes.js';
app.use('/api/groups', groupRoutes);

// Mount games routes
app.use('/api/games', gamesRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
