import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeStore } from "../../app/api/anime/core/slice";
import Loader from "../../shared/components/layout/Loading";
import "./styles/banner.css";

const Banner = () => {
  const { topAnime, getTopAnime, loading } = useAnimeStore();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!topAnime?.length && !loading) getTopAnime();
  }, []);

  useEffect(() => {
    if (!topAnime?.length) return;
    const timer = setInterval(() => goTo((active + 1) % top5.length), 5000);
    return () => clearInterval(timer);
  }, [active, topAnime]);

  if (!topAnime?.length) {
    return (
      <div className="banner-loading">
        <Loader text="Loading Top Anime..." fullHeight={false} />
      </div>
    );
  }

  const top5 = topAnime.slice(0, 5);
  const anime = top5[active];

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="banner-root">

      {/* BG image blur */}
      <div
        className={`banner-bg ${animating ? "fade-out" : "fade-in"}`}
        style={{ backgroundImage: `url(${anime.images?.jpg?.large_image_url})` }}
      />
      <div className="banner-overlay" />

      {/* Content */}
      <div className={`banner-content ${animating ? "fade-out" : "fade-in"}`}>

        {/* Left */}
        <div className="banner-info">
          <div className="banner-rank">#{anime.rank} Ranked</div>

          <h1 className="banner-title">
            {anime.title_english || anime.title}
          </h1>

          {anime.title_english && anime.title !== anime.title_english && (
            <p className="banner-title-jp">{anime.title}</p>
          )}

          <p className="banner-synopsis">
            {anime.synopsis?.substring(0, 180)}...
          </p>

          <div className="banner-tags">
            {anime.genres?.slice(0, 3).map((g) => (
              <span key={g.mal_id} className="banner-tag">{g.name}</span>
            ))}
          </div>

          <div className="banner-stats">
            <div className="banner-stat">
              <span className="banner-stat-value">⭐ {anime.score}</span>
              <span className="banner-stat-label">Score</span>
            </div>
            <div className="banner-stat-divider" />
            <div className="banner-stat">
              <span className="banner-stat-value">{anime.episodes ?? "?"}</span>
              <span className="banner-stat-label">Episodes</span>
            </div>
            <div className="banner-stat-divider" />
            <div className="banner-stat">
              <span className="banner-stat-value">{anime.year ?? "?"}</span>
              <span className="banner-stat-label">Year</span>
            </div>
            <div className="banner-stat-divider" />
            <div className="banner-stat">
              <span className="banner-stat-value">{anime.status}</span>
              <span className="banner-stat-label">Status</span>
            </div>
          </div>

          <div className="banner-actions">
            <button
              className="banner-btn-primary"
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Right — Poster */}
        <div className="banner-poster-wrap">
          <img
            src={anime.images?.jpg?.large_image_url}
            alt={anime.title_english || anime.title}
            className="banner-poster"
          />
        </div>

      </div>

      {/* Dots */}
      <div className="banner-dots">
        {top5.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === active ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

    </div>
  );
};

export default Banner;