# Content Finder

A web application that helps you find and summarize content based on your interests. The application searches the web for relevant content and provides brief summaries of the found pages.

## Features

- Modern, responsive web interface
- Real-time web search
- Content summarization
- Mobile-friendly design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd content-finder
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the backend server:
```bash
npm run server
```

2. In a new terminal, start the frontend development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Usage

1. Open your web browser and navigate to http://localhost:3000
2. Enter your search query in the search box
3. Click the search button or press Enter
4. View the results, which include:
   - Page title
   - Brief summary of the content
   - Link to the original page

## Technologies Used

- React
- TypeScript
- Material-UI
- Express.js
- Cheerio (for web scraping)
- Node-fetch

## Note

This application is for demonstration purposes. In a production environment, you should:
- Use a proper search API instead of web scraping
- Implement rate limiting
- Add error handling
- Use environment variables for configuration
- Implement proper security measures 