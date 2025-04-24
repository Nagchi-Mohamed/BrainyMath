# Frontend Documentation

## Environment Variables

The following environment variables are required to run the frontend. Create a `.env` file in the `client/` directory if needed:

- `REACT_APP_API_BASE_URL`: Base URL for the backend API (e.g., `http://localhost:5000`).

Additionally, ensure the `proxy` setting in `client/package.json` is configured to point to the backend server during development.

## Installation

Run the following command to install dependencies:

```bash
npm install
```

## Running Development Server

Start the development server with:

```bash
npm start
```

## Building for Production

Build the frontend for production with:

```bash
npm run build
```

## Available Features

The frontend provides the following user-facing features:

- **Authentication**: Register, login, and manage user profiles.
- **Lessons**: Browse, create, and edit lessons.
- **Forums**: Participate in discussions and create threads.
- **Groups**: Collaborate with peers in study groups.
- **Quizzes**: Take quizzes and track results.
- **Classrooms**: Join and manage virtual classrooms.
- **Admin Dashboard**: Manage users and lessons.
