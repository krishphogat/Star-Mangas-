# Star Mangas

## Purpose
Star Mangas is a discovery platform for manga and novels. It provides a clean and simple environment for readers to explore new content without distraction. This project is built as a modern React application to offer a better experience compared to traditional static sites.

## Features
- Search by title or keywords.
- Filter content by type (Manga or Novels).
- Sort by alphabetical order, score, or newest release.
- Theme toggle for light and dark modes.
- Simple, clean design focused on readability.

## APIs Used

### Jikan API
Used to fetch top manga data, including titles, cover images, genres, and ratings. It provides structured data that makes it easy to build a rich browsing interface.

### Open Library API
Used for novel and book-related data. I chose this API for its massive collection of book data and support for keyword-based search.

## Technologies Used
- React
- Vite
- JavaScript
- CSS (Vanilla)
- Fetch API

## How to Run locally

Prerequisites:
- Node.js installed on your machine.

Steps:
1. Clone the repository to your local machine.
2. Open the project folder in your terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the URL provided in the terminal (usually http://localhost:5173).

## Future Improvements
- Reading History: Keep track of what you've read.
- Advanced Filters: Filter by status, chapters, and specific tags.
- Recommendations: Personalized suggestions based on your search and interest history.
