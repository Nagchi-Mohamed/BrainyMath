# Backend Documentation

## Environment Variables

The following environment variables are required to run the backend server. Create a `.env` file in the `server/` directory and include the following variables:

- `NODE_ENV`: Set to `development` or `production`.
- `PORT`: The port number for the server (default: 5000).
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JSON Web Tokens.
- `JWT_EXPIRES_IN`: Token expiration time (e.g., `30d`).

## Installation

Run the following command to install dependencies:

```bash
npm install
```

## Running Development Server

Start the development server with:

```bash
npm run server
```

## Database Seeding

To seed the database with initial data, use the following commands:

- Import data:
  ```bash
  npm run data:import
  ```
- Destroy data:
  ```bash
  npm run data:destroy
  ```

## API Endpoints Overview

The backend provides the following main resource endpoints:

- `/api/users`: User management.
- `/api/lessons`: Lesson management.
- `/api/forums`: Forum discussions.
- `/api/groups`: Group collaboration.
- `/api/quizzes`: Quiz functionality.
- `/api/classrooms`: Virtual classrooms.
- `/api/progress`: User progress tracking.
