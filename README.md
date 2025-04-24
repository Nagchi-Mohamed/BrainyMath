# BrainyMath - Interactive Math Learning Platform

BrainyMath is an interactive web application designed to help students learn and practice math concepts through engaging games and exercises.

## Features

- **Interactive Math Games**: Addition, subtraction, multiplication, and division games with adaptive difficulty
- **Learning Resources**: Detailed explanations of math concepts with examples and practice problems
- **User Progress Tracking**: Dashboard to track performance metrics and improvements
- **Authentication**: User accounts to save progress and customize learning experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

The project follows a modern React application architecture with feature-based organization:

```
src/
├── assets/           # Fonts, images, etc.
├── components/       # Reusable UI components
├── contexts/         # Auth, game state contexts
├── features/         # Feature modules
│   ├── auth/         # Authentication flows
│   ├── dashboard/    # User dashboard
│   ├── games/        # All game modes
│   └── learning/     # Educational content
├── hooks/            # Custom hooks
├── lib/              # Utilities/helpers
├── pages/            # Page components
├── styles/           # Global styles
└── App.js            # Main app entry
```

## Technology Stack

- **Frontend**:

  - React.js with hooks and context for state management
  - React Router for navigation
  - CSS variables for consistent theming

- **Authentication**:

  - Firebase Authentication with email/password and Google sign-in

- **Backend**:
  - Node.js with Express
  - MongoDB for data storage
  - RESTful API architecture

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/brainymath.git
   cd brainymath
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:

   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Backend Setup

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Install server dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```
   npm run server
   ```

## Deployment

### Frontend

1. Build the production version:

   ```
   npm run build
   ```

2. Deploy to hosting service of choice (Netlify, Vercel, Firebase Hosting, etc.)

### Backend

1. Deploy to a Node.js hosting service (Heroku, DigitalOcean, AWS, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces
- [Firebase](https://firebase.google.com/) - Authentication and hosting
- [Express](https://expressjs.com/) - Node.js web application framework
- [MongoDB](https://www.mongodb.com/) - Database
