import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/banner.css";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="home-banner">
      <div className="home-banner-bg" />
      <div className="home-banner-overlay" />

      <div className="home-banner-content">
        <div className="home-banner-info">
          <div className="home-banner-badge">The Best Infomation of Anime, Manga & Light Novel Platform</div>
          <h1 className="home-banner-title">
            Discover Amazing<br />
            <span>Anime, Manga & Light Novel</span>
          </h1>
          <p className="home-banner-desc">
            Explore top trending anime, manga, and novels all in one place.
            Browse schedules, seasonal releases, and more.
          </p>
          <div className="home-banner-actions">
            <button className="home-banner-btn-primary" onClick={() => navigate("/anime")}>
              Browse Anime
            </button>
            <button className="home-banner-btn-secondary" onClick={() => navigate("/manga-novel")}>
              Browse Manga
            </button>
          </div>
        </div>

        <div className="home-banner-deco">
          <div className="deco-card deco-card-1" />
          <div className="deco-card deco-card-2" />
          <div className="deco-card deco-card-3" />
        </div>
      </div>
    </div>
  );
};

export default Banner;