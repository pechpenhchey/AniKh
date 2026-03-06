import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMangaStore } from "../../app/api/manga/slice";
import Loader from "../../shared/components/layout/Loading";
import "./styles/banner.css";

const MangaBanner = () => {
  const { topManga, getTopManga } = useMangaStore();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!topManga?.length) getTopManga();
  }, []);

  useEffect(() => {
    if (!topManga?.length) return;
    const timer = setInterval(() => goTo((active + 1) % top5.length), 5000);
    return () => clearInterval(timer);
  }, [active, topManga]);

  if (!topManga?.length) {
    return (
      <div className="manga-banner-loading">
        <Loader text="Loading Top Manga..." fullHeight={false} />
      </div>
    );
  }

  const top5 = topManga.slice(0, 5);
  const manga = top5[active];

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 300);
  };

  return (
    <div className="manga-banner-root">
      <div
        className={`manga-banner-bg ${animating ? "fade-out" : "fade-in"}`}
        style={{ backgroundImage: `url(${manga.images?.jpg?.large_image_url})` }}
      />
      <div className="manga-banner-overlay" />

      <div className={`manga-banner-content ${animating ? "fade-out" : "fade-in"}`}>

        <div className="manga-banner-info">
          <div className="manga-banner-rank">#{manga.rank} Ranked</div>

          <h1 className="manga-banner-title">
            {manga.title_english || manga.title}
          </h1>

          {manga.title_english && manga.title !== manga.title_english && (
            <p className="manga-banner-title-jp">{manga.title}</p>
          )}

          <p className="manga-banner-synopsis">
            {manga.synopsis?.substring(0, 180)}...
          </p>

          <div className="manga-banner-tags">
            {manga.genres?.slice(0, 3).map((g) => (
              <span key={g.mal_id} className="manga-banner-tag">{g.name}</span>
            ))}
          </div>

          <div className="manga-banner-stats">
            <div className="manga-banner-stat">
              <span className="manga-banner-stat-value">⭐ {manga.score}</span>
              <span className="manga-banner-stat-label">Score</span>
            </div>
            <div className="manga-banner-stat-divider" />
            <div className="manga-banner-stat">
              <span className="manga-banner-stat-value">{manga.chapters ?? "?"}</span>
              <span className="manga-banner-stat-label">Chapters</span>
            </div>
            <div className="manga-banner-stat-divider" />
            <div className="manga-banner-stat">
              <span className="manga-banner-stat-value">{manga.status}</span>
              <span className="manga-banner-stat-label">Status</span>
            </div>
          </div>

          <div className="manga-banner-actions">
            <button
              className="manga-banner-btn"
              onClick={() => navigate(`/manga/${manga.mal_id}`)}
            >
              View Details
            </button>
          </div>
        </div>

        <div className="manga-banner-poster-wrap">
          <img
            src={manga.images?.jpg?.large_image_url}
            alt={manga.title_english || manga.title}
            className="manga-banner-poster"
          />
        </div>

      </div>

      <div className="manga-banner-dots">
        {top5.map((_, i) => (
          <button
            key={i}
            className={`manga-banner-dot ${i === active ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default MangaBanner;