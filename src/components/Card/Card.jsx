import React from 'react';

const Card = ({ item, type }) => {
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
    <article className="card">
      <div className="card-img-wrapper">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="no-image" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee' }}>No Image Available</div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>

        <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
          <strong>{type === 'manga' ? 'Score:' : 'Author:'}</strong> {score || meta}
        </p>

        <p style={{ fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', margin: '0.5rem 0' }}>
          {item.synopsis || item.first_publish_year || "No description available."}
        </p>

        <div className="card-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Card;
