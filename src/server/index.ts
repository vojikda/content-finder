import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow requests from your GitHub Pages domain
const allowedOrigins = [
  'http://localhost:3000',
  'https://danielvojik.github.io'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

interface SearchResult {
  title: string;
  summary: string;
  url: string;
}

async function scrapeAndSummarize(url: string): Promise<SearchResult> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Get the title
    const title = $('title').text() || $('h1').first().text() || 'Untitled';

    // Get the main content
    const content = $('article, main, .content, .post, .article')
      .text()
      .trim()
      .replace(/\s+/g, ' ');

    // Create a simple summary (first 200 characters)
    const summary = content.slice(0, 200) + (content.length > 200 ? '...' : '');

    return {
      title,
      summary,
      url,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return {
      title: 'Error',
      summary: 'Failed to fetch content',
      url,
    };
  }
}

app.get('/search', async (req, res) => {
  const query = req.query.q as string;
  
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // For demonstration, we'll search using a simple search engine API
    // In a production environment, you might want to use a more sophisticated search API
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const results: SearchResult[] = [];
    const links = $('a[href^="http"]').slice(0, 5); // Get first 5 results

    for (const link of links) {
      const url = $(link).attr('href');
      if (url && !url.includes('google.com')) {
        const result = await scrapeAndSummarize(url);
        results.push(result);
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to perform search' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 