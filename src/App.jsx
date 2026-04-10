import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import FilterBar from './components/Filters/FilterBar';
import Card from './components/Card/Card';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './index.css';

const ContentSection = ({ title, loading, items, type, emptyMessage }) => (
  <section>
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
    </div>
    {loading ? (
      <div className="loading-state">Loading...</div>
    ) : items.length > 0 ? (
      <div className="card-grid">
        {items.map(item => (
          <Card key={item.mal_id || item.key} item={item} type={type} />
        ))}
      </div>
    ) : (
      <div className="empty-state">{emptyMessage}</div>
    )}
  </section>
);

function App() {
  const [manga, setManga] = useState([]);
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch Data on Search Change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let mangaUrl, novelsUrl;

        if (debouncedSearch) {
          mangaUrl = `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(debouncedSearch)}&limit=12&order_by=popularity&sort=desc`;
          novelsUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedSearch)}&limit=12`;
        } else {
          mangaUrl = 'https://api.jikan.moe/v4/top/manga?limit=12';
          novelsUrl = 'https://openlibrary.org/subjects/fantasy.json?limit=12';
        }

        const [mangaRes, novelsRes] = await Promise.all([
          fetch(mangaUrl),
          fetch(novelsUrl)
        ]);

        const mangaData = await mangaRes.json();
        const novelsData = await novelsRes.json();

        // Search API returns data in different fields
        setManga(mangaData.data || []);
        setNovels(novelsData.works || novelsData.docs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const processData = (items, type) => {
    // We no longer filter locally, but we still sort
    let sorted = [...items];

    if (sortBy === 'title') {
      sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === 'score' && type === 'manga') {
      sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    }

    return sorted;
  };

  const filteredManga = processData(manga, 'manga');
  const filteredNovels = processData(novels, 'novel');

  return (
    <div className="app">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Header />

      <main className="app-main">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <div className="container">
          {(filterType === 'all' || filterType === 'manga') && (
            <ContentSection
              title="Popular Manga"
              loading={loading}
              items={filteredManga}
              type="manga"
              emptyMessage="No manga found."
            />
          )}

          {(filterType === 'all' || filterType === 'novel') && (
            <ContentSection
              title="Fantasy Novels"
              loading={loading}
              items={filteredNovels}
              type="novel"
              emptyMessage="No novels found."
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
