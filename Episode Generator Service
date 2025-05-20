// episodeGenerator.js - Service for generating episodic content
const axios = require('axios');
const config = require('./config');

/**
 * Class to handle episode generation using Google Gemini API
 */
class EpisodeGenerator {
  /**
   * Initialize the episode generator
   * @param {string} apiKey - Google Gemini API key
   */
  constructor(apiKey = config.gemini.apiKey) {
    this.apiKey = apiKey;
    this.apiEndpoint = config.gemini.apiEndpoint;
  }
  
  /**
   * Generate a single episode using Google Gemini
   * @param {object} params - Parameters for episode generation
   * @param {string} params.synopsis - The story synopsis
   * @param {string} params.genre - The genre of the story
   * @param {string} params.timeline - The timeline/era of the story
   * @param {number} params.episodeNumber - Current episode number
   * @param {number} params.totalEpisodes - Total number of episodes
   * @param {number} params.wordCount - Target word count for the episode
   * @returns {Promise<object>} - Generated episode content
   */
  async generateEpisode(params) {
    const { synopsis, genre, timeline, episodeNumber, totalEpisodes, wordCount } = params;
    
    // Create prompt for Google Gemini
    const prompt = `
      You are an expert writer who specializes in creating episodic content.
      
      CONTEXT:
      - Genre: ${genre}
      - Era/Timeline: ${timeline}
      - Word Count Target: ${wordCount} words
      - Episode Number: ${episodeNumber} of ${totalEpisodes}
      
      STORY SYNOPSIS:
      ${synopsis}
      
      TASK:
      Create an engaging Episode ${episodeNumber} based on the synopsis above. The episode should:
      1. Match the specified genre (${genre}) and timeline/era (${timeline})
      2. Use language, terminology, and style appropriate for the era
      3. Be approximately ${wordCount} words in length
      4. Have a clear beginning, middle, and end while fitting into a larger story arc
      5. Include character development and dialogue where appropriate
      6. End with a hook that entices readers to continue to the next episode
      
      FORMAT YOUR RESPONSE AS A SINGLE CONTINUOUS NARRATIVE WITHOUT HEADERS OR SECTIONS.
    `;
    
    try {
      // Call Google Gemini API
      const response = await axios.post(
        `${this.apiEndpoint}?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: config.gemini.temperature,
            maxOutputTokens: config.gemini.maxTokens,
            topP: config.gemini.topP,
          }
        }
      );
      
      // Process response
      const content = response.data.candidates[0].content.parts[0].text;
      
      return {
        episodeNumber,
        content,
        wordCount: content.split(/\s+/).length
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error(`Failed to generate episode content: ${error.message}`);
    }
  }
  
  /**
   * Generate multiple episodes
   * @param {object} params - Parameters for episode generation
   * @param {string} params.synopsis - The story synopsis
   * @param {string} params.genre - The genre of the story
   * @param {string} params.timeline - The timeline/era of the story
   * @param {number} params.episodeCount - Number of episodes to generate
   * @param {number} params.wordCount - Target word count for each episode
   * @returns {Promise<Array>} - Array of generated episodes
   */
  async generateEpisodes(params) {
    const { synopsis, genre, timeline, episodeCount, wordCount } = params;
    const episodes = [];
    
    // Generate episodes sequentially to prevent rate limiting
    for (let i = 0; i < episodeCount; i++) {
      const episode = await this.generateEpisode({
        synopsis,
        genre,
        timeline,
        episodeNumber: i + 1,
        totalEpisodes: episodeCount,
        wordCount
      });
      
      episodes.push(episode);
      
      // Add a small delay to prevent hitting rate limits
      if (i < episodeCount - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return episodes;
  }
}

module.exports = EpisodeGenerator;
