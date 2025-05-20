// config.js - Configuration file for the application

// This file would be loaded when the application starts
// In production, these values should be set in environment variables

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'your-secret-key-for-development-only',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
  },

  // Google OAuth configuration
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
  },

  // Google Gemini AI configuration
  gemini: {
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    maxTokens: 8192,
    temperature: 0.7,
    topP: 0.9,
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
  },

  // Rate limiting to prevent abuse
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Maximum allowed values
  limits: {
    maxSynopsisWords: 2000,
    maxEpisodes: 200,
    validWordCounts: [1000, 2000, 3000, 4000, 5000]
  },

  // Allowed origins for CORS
  corsOrigins: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : ['http://localhost:3000']
};
