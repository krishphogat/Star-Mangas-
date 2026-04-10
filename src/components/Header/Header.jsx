import React from 'react';

const Header = () => {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1>Star Mangas</h1>
        <p>
          Your personal place to discover manga and novels. 
          Browse through a collection of stories and find your next read.
        </p>
        <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
          Browse Now
        </button>
      </div>
    </header>
  );
};

export default Header;
