import React, { useState } from 'react';

const Card = ({ item, type }) => {
  const [liked, setLiked] = useState(false);

  const title = item.title || "Unknown Title";
  const image = type === 'manga'
    ? item.images?.jpg?.image_url
    : (item.cover_id ? `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg` : null);

  const score = type === 'manga' ? item.score : (item.edition_count ? `${item.edition_count} Editions` : 'N/A');
  const meta = type === 'manga' ? (item.status || "N/A") : (item.authors?.[0]?.name || "Unknown Author");

  const tags = type === 'manga'
    ? (item.genres?.slice(0, 3).map(g => g.name) || [])
    : (item.subject?.slice(0, 3) || ["Fantasy"]);

  return (
    <article className="card fade-in">
      <div className="card-img-wrapper">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="card-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="card-title">{title}</h3>
          <button
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={() => setLiked(!liked)}
            title={liked ? "Remove from Favorites" : "Add to Favorites"}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>
          <strong>{type === 'manga' ? ' Score:' : ' Author:'}</strong> {score || meta}
        </p>

        <p style={{ fontSize: '0.85rem', opacity: 0.8, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {item.synopsis || item.first_publish_year || "No synopsis available."}
        </p>

        <div className="card-meta">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Card;
