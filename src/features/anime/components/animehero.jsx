import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import noImage from "../../../shared/assets/no-img.jpg";

const StatBox = ({ label, value }) => (
  <div className="hero-stat-box">
    <div className="hero-stat-value">{value}</div>
    <div className="hero-stat-label">{label}</div>
  </div>
);

const AnimeHero = ({ anime }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFav, setIsFav]       = useState(false);

  if (!anime) return null;

  const title = anime.title_english || anime.title;
  const synopsis = anime.synopsis?.trim() || "No synopsis available.";
  const shouldTruncate = synopsis.length > 320;
  const displaySynopsis =
    shouldTruncate && !expanded ? synopsis.slice(0, 320) + "..." : synopsis;

  const scored_by = anime.scored_by ? anime.scored_by.toLocaleString() : null;
  const studios   = anime.studios?.length
    ? anime.studios.map((s) => s.name).join(", ")
    : "N/A";
  const season =
    anime.season && anime.year
      ? anime.season.charAt(0).toUpperCase() + anime.season.slice(1) + " " + anime.year
      : anime.year ?? null;

  return (
    <div className="hero-wrapper">
      <div className="hero-accent-bar" />
      <div className="hero-body">
        <Row className="g-4">

          <Col xs={12} sm={4} md={3} lg={2}>
            <div className="hero-poster-wrap">
              <img
                src={anime.images?.jpg?.large_image_url || noImage}
                alt={title}
                onError={(e) => { e.target.src = noImage; }}
              />
            </div>
            <div className="hero-pills">
              {anime.rank && <span className="hero-rank-pill">#{anime.rank} Rank</span>}
              {anime.popularity && <span className="hero-popularity-pill">#{anime.popularity} Popular</span>}
            </div>
          </Col>

          <Col xs={12} sm={8} md={9} lg={10}>
            <div className="d-flex align-items-start justify-content-between gap-2 flex-wrap mb-1">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h1 className="hero-title">{title}</h1>
                {anime.type && <span className="hero-type-badge">{anime.type}</span>}
              </div>
              <button
                className={isFav ? "hero-fav-btn active" : "hero-fav-btn"}
                onClick={() => setIsFav(!isFav)}
                title={isFav ? "Remove from favourites" : "Add to favourites"}
              >
                <svg className="hero-fav-icon" viewBox="0 0 24 24"
                  fill={isFav ? "currentColor" : "none"}
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {isFav ? "Saved" : "Add to Favourites"}
              </button>
            </div>

            {anime.title_japanese && (
              <div className="hero-title-japanese">{anime.title_japanese}</div>
            )}

            <div className="d-flex flex-wrap gap-2 mb-3">
              {anime.genres?.map((g) => (
                <span key={g.mal_id} className="hero-genre-pill">{g.name}</span>
              ))}
            </div>

            <div className="hero-stats">
              {anime.score && (
                <div className="hero-score-box">
                  <div className="hero-score-value">&#11088; {anime.score}</div>
                  {scored_by && <div className="hero-score-by">by {scored_by} users</div>}
                </div>
              )}
              <StatBox label="Status" value={
                anime.status === "Currently Airing" ? "Airing" :
                anime.status === "Finished Airing" ? "Finished" :
                anime.status === "Not Yet Aired" ? "Upcoming" :
                anime.status === "Unknown" ? "Unknown" :
                anime.status ?? "N/A"
              } />
              <StatBox label="Duration" value={anime.duration?.replace(" per ep", "") ?? "N/A"} />
              {season && <StatBox label="Season" value={season} />}
              <StatBox label="Rating"   value={anime.rating?.split(" - ")[0] ?? "N/A"} />
            </div>

            <div className="hero-meta-row">
              <span><span className="hero-meta-label">Studio: </span>{studios}</span>
              {anime.source && <span><span className="hero-meta-label">Source: </span>{anime.source}</span>}
              {anime.aired?.string && <span><span className="hero-meta-label">Aired: </span>{anime.aired.string}</span>}
            </div>

            <p className="hero-synopsis">
              {displaySynopsis}
              {shouldTruncate && (
                <button className="hero-read-more-btn" onClick={() => setExpanded(!expanded)}>
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AnimeHero;