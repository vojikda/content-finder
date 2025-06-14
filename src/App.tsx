import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

interface SearchResult {
  title: string;
  summary: string;
  url: string;
}

// Determine the API base URL based on the environment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://content-finder-726fbb6e.up.railway.app' // Your specific Railway project URL
  : 'http://localhost:3001';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Content Finder
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Find and summarize content based on your interests
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            sx={{ minWidth: '100px' }}
          >
            {loading ? <CircularProgress size={24} /> : <SearchIcon />}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {results.map((result, index) => (
            <Card key={index} sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {result.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {result.summary}
                </Typography>
                <Typography variant="body2">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 