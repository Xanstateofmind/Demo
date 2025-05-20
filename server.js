const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');

const config = require('./config');

const authRoutes = require('./routes/authRoutes');
const googleDocsRoutes = require('./routes/googleDocsRoutes');

const app = express();

// Basic serialization for session support
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl
}, (accessToken, refreshToken, profile, done) => {
  // Build a minimal user object to store in the session
  const user = {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
    profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
    accessToken,
    refreshToken
  };
  done(null, user);
}));

// Session middleware
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: config.session.cookie
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/google-docs', googleDocsRoutes);

// Serve frontend assets if available
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  res.sendFile(indexPath);
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
