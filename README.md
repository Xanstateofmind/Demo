# Episodic Content Generator Demo

This project is a proof of concept for generating short episodes from a user-provided synopsis. It uses Google OAuth for authentication, integrates with Google Docs to import a synopsis, and relies on the Google Gemini API to create multiple episodes.

## Features

- **Google OAuth authentication** – sign in with your Google account.
- **Import synopsis from Google Docs** – paste a document ID and pull the text directly from Google Docs.
- **Episode generation with Google Gemini** – create a series of episodes based on genre, timeline, word count, and other options.
- **Download results** – export generated episodes as PDF or plain text.

## Installation

Once a `package.json` file exists for the backend and frontend, install dependencies with:

```bash
npm install
```

Run this command in each project directory (backend and frontend).

## Environment variables

Create a `.env` file in the backend directory and define the following variables:

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
SESSION_SECRET=some-secret-value
PORT=3000
```

Adjust the values to match your Google OAuth configuration and Gemini API key.

## Running the application

After installing dependencies and configuring environment variables:

1. **Backend** – start the Express server:

   ```bash
   npm start
   ```

2. **Frontend** – in the frontend directory run:

   ```bash
   npm run dev
   ```

The frontend expects the backend to be running on the same host/port as configured in the environment variables.
