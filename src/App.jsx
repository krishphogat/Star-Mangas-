import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import FilterBar from './components/Filters/FilterBar';
import Card from './components/Card/Card';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './index.css';

function App() {
  const [manga, setManga] = useState([]);
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [mangaRes, novelsRes] = await Promise.all([
          fetch('https://api.jikan.moe/v4/top/manga?limit=12'),
          fetch('https://openlibrary.org/subjects/fantasy.json?limit=12')
        ]);
        
        const mangaData = await mangaRes.json();
        const novelsData = await novelsRes.json();

        setManga(mangaData.data || []);
        setNovels(novelsData.works || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Helper to filter data using Higher-Order Functions
  const processData = (items, type) => {
    let filtered = items.filter(item => {
      const matchSearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.synopsis || "").toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });

    if (sortBy === 'title') {
      filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === 'score' && type === 'manga') {
      filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    }

    return filtered;
  };

  const filteredManga = processData(manga, 'manga');
  const filteredNovels = processData(novels, 'novel');

  return (
    <div className="app">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Header />
      
      <main>
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <div className="container" style={{ paddingBottom: '5rem' }}>
          {(filterType === 'all' || filterType === 'manga') && (
            <section className="fade-in" style={{ marginBottom: '4rem' }}>
              <div className="section-header">
                <h2 className="section-title">⚔️ Popular Manga</h2>
                <div className="tag">Jikan API</div>
              </div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--secondary)' }}>Loading Manga Realms...</div>
              ) : filteredManga.length > 0 ? (
                <div className="card-grid">
                  {filteredManga.map(item => (
                    <Card key={item.mal_id} item={item} type="manga" />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>No manga found matching your quest.</div>
              )}
            </section>
          )}

          {(filterType === 'all' || filterType === 'novel') && (
            <section className="fade-in">
              <div className="section-header">
                <h2 className="section-title">📚 Fantasy Novels</h2>
                <div className="tag">Open Library API</div>
              </div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--secondary)' }}>Loading Novel Tomes...</div>
              ) : filteredNovels.length > 0 ? (
                <div className="card-grid">
                  {filteredNovels.map(item => (
                    <Card key={item.key} item={item} type="novel" />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>No novels found matching your quest.</div>
              )}
            </section>
          )}
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '3rem', borderTop: '1px solid var(--border)', opacity: 0.7 }}>
        <p>© 2026 Star Mangas • Cultivating Stories Since Epoch</p>
      </footer>
    </div>
  );
}

export default App;
