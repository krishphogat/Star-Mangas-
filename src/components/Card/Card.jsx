import React from 'react';

const Card = ({ item, type }) => {
  const title = item.title || "Unknown Title";
  
  // Handle different property names from different APIs
  const coverId = item.cover_id || item.cover_i;
  const author = item.authors?.[0]?.name || item.author_name?.[0] || "Unknown Author";
  
  const image = type === 'manga'
    ? item.images?.jpg?.image_url
    : (coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null);

  const score = type === 'manga' ? item.score : (item.edition_count ? `${item.edition_count} Editions` : 'N/A');
  const meta = type === 'manga' ? (item.status || "N/A") : author;

  const tags = type === 'manga'
    ? (item.genres?.slice(0, 3).map(g => g.name) || [])
    : (item.subject?.slice(0, 3) || ["Fantasy"]);

  return (
    <article className="card">
      <div className="card-img-wrapper">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>

        <p className="card-meta-text">
          <strong>{type === 'manga' ? 'Score:' : 'Author:'}</strong> {score || meta}
        </p>

        <p className="card-description">
          {item.synopsis || item.first_publish_year || "No description available."}
        </p>

        <div className="card-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Card;
