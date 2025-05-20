const axios = require('axios');
const EpisodeGenerator = require('../services/episodeGenerator');

jest.mock('axios');

describe('EpisodeGenerator', () => {
  const generator = new EpisodeGenerator('test-key');
  const basicParams = {
    synopsis: 'A hero tale',
    genre: 'fantasy',
    timeline: 'middle ages',
    episodeNumber: 1,
    totalEpisodes: 1,
    wordCount: 5
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generateEpisode posts to API and returns episode data', async () => {
    axios.post.mockResolvedValue({
      data: {
        candidates: [
          { content: { parts: [{ text: 'Once upon a time' }] } }
        ]
      }
    });

    const result = await generator.generateEpisode(basicParams);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      episodeNumber: 1,
      content: 'Once upon a time',
      wordCount: 4
    });
  });

  test('generateEpisode throws descriptive error on failure', async () => {
    axios.post.mockRejectedValue(new Error('network'));

    await expect(generator.generateEpisode(basicParams))
      .rejects.toThrow('Failed to generate episode content: network');
  });

  test('generateEpisodes loops for each episode', async () => {
    axios.post.mockResolvedValue({
      data: { candidates: [{ content: { parts: [{ text: 'episode text' }] } }] }
    });
    jest.spyOn(global, 'setTimeout').mockImplementation(fn => fn());

    const episodes = await generator.generateEpisodes({
      synopsis: 'A hero tale',
      genre: 'fantasy',
      timeline: 'middle ages',
      episodeCount: 2,
      wordCount: 10
    });

    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(episodes).toHaveLength(2);

    global.setTimeout.mockRestore();
  });
});
