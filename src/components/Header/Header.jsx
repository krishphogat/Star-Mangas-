import React from 'react';

const Header = () => {
  return (
    <header className="hero">
      <div className="hero-content fade-in">
        <h1>🌌 Star Mangas</h1>
        <p>
          A cultivation-inspired discovery space for manga and novels. 
          Dive into the realms of infinite stories and legendary adventures.
        </p>
        <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
          Explore the Realms
        </button>
      </div>
    </header>
  );
};

export default Header;
