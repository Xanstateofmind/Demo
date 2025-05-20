# Demo

This repository contains a small example Node.js application for generating episodic content.

## Running the server

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
   The server uses the configuration defined in `config.js` and listens on the port specified there (default `3000`).

## Project structure

- `server.js` &ndash; Express application that configures Passport, session middleware and mounts the API routes.
- `config.js` &ndash; Application configuration loaded by the server.
- `routes/authRoutes.js` &ndash; Google OAuth authentication endpoints.
- `routes/googleDocsRoutes.js` &ndash; Endpoints for importing content from Google Docs.
- `services/` &ndash; Helper services used by the routes.

The server also serves static files from the `public` directory if it exists, making it possible to host a frontend alongside the API routes.
