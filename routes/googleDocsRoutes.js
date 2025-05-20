// routes/googleDocsRoutes.js - Google Docs integration routes
const express = require('express');
const router = express.Router();
const GoogleService = require('../services/googleService');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
};

/**
 * @route GET /api/google-docs/import
 * @desc Import document from Google Docs
 * @access Private
 */
router.get('/import', isAuthenticated, async (req, res) => {
  const { docId } = req.query;
  
  if (!docId) {
    return res.status(400).json({ error: "Document ID is required" });
  }
  
  try {
    // Initialize Google service with user's access token
    const googleService = new GoogleService(req.user.accessToken, req.user.refreshToken);
    
    // Import document content
    const content = await googleService.importDocument(docId);
    
    return res.json({ content });
    
  } catch (error) {
    console.error('Error importing from Google Docs:', error);
    return res.status(500).json({ error: `Failed to import document: ${error.message}` });
  }
});

/**
 * @route GET /api/google-docs/list
 * @desc List user's Google Docs
 * @access Private
 */
router.get('/list', isAuthenticated, async (req, res) => {
  try {
    // Initialize Google service with user's access token
    const googleService = new GoogleService(req.user.accessToken, req.user.refreshToken);
    
    // Get list of documents
    const documents = await googleService.listDocuments();
    
    return res.json({ documents });
    
  } catch (error) {
    console.error('Error listing Google Docs:', error);
    return res.status(500).json({ error: `Failed to list documents: ${error.message}` });
  }
});

module.exports = router;
