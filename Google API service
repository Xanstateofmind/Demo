// googleService.js - Service for Google API integration
const { google } = require('googleapis');

/**
 * Class to handle Google API interactions
 */
class GoogleService {
  /**
   * Initialize the Google service with user credentials
   * @param {string} accessToken - User's Google access token
   * @param {string} refreshToken - User's Google refresh token (optional)
   */
  constructor(accessToken, refreshToken = null) {
    this.auth = new google.auth.OAuth2();
    this.auth.setCredentials({ 
      access_token: accessToken,
      refresh_token: refreshToken
    });
    
    this.docs = google.docs({ version: 'v1', auth: this.auth });
  }
  
  /**
   * Import document content from Google Docs
   * @param {string} documentId - Google Docs document ID
   * @returns {Promise<string>} - Document content as plain text
   */
  async importDocument(documentId) {
    try {
      // Get the document
      const { data } = await this.docs.documents.get({
        documentId: documentId
      });
      
      // Extract text content from document
      let content = '';
      const { body } = data;
      
      if (body && body.content) {
        content = body.content
          .filter(item => item.paragraph) // Only get paragraph elements
          .map(item => {
            const paragraph = item.paragraph;
            if (paragraph.elements) {
              return paragraph.elements
                .map(element => element.textRun ? element.textRun.content : '')
                .join('');
            }
            return '';
          })
          .join('')
          .trim();
      }
      
      return content;
    } catch (error) {
      console.error('Error importing document from Google Docs:', error);
      throw new Error(`Failed to import document: ${error.message}`);
    }
  }
  
  /**
   * Get list of documents from user's Google Drive
   * Will be used for future enhancement
   * @returns {Promise<Array>} - List of user's documents
   */
  async listDocuments() {
    try {
      const drive = google.drive({ version: 'v3', auth: this.auth });
      
      const response = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.document'",
        fields: 'files(id, name)',
        spaces: 'drive',
        pageSize: 50
      });
      
      return response.data.files;
    } catch (error) {
      console.error('Error listing documents from Google Drive:', error);
      throw new Error(`Failed to list documents: ${error.message}`);
    }
  }
}

module.exports = GoogleService;
