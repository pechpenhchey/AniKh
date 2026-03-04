import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import Section from "./section";
import noImage from "../../../shared/assets/no-img.jpg";

const extractVideos = (videos) => {
  if (!videos || typeof videos !== "object") return [];

  const promos = Array.isArray(videos.promo)
    ? [...videos.promo].reverse().map((v, i) => ({
        id: `promo-${i}`,
        title: v.title ?? "Trailer",
        image_url:
          v.trailer?.images?.maximum_image_url ||
          v.trailer?.images?.large_image_url ||
          v.trailer?.images?.image_url ||
          null,
        youtube_id: v.trailer?.youtube_id || null,
      }))
    : [];

  const episodes = Array.isArray(videos.episodes)
    ? [...videos.episodes].reverse().map((v, i) => ({
        id: `episode-${i}`,
        title: v.title ?? `Episode ${i + 1}`,
        image_url: v.images?.jpg?.image_url || null,
        youtube_id: v.youtube_id || null,
      }))
    : [];

  const musicVideos = Array.isArray(videos.music_videos)
    ? [...videos.music_videos].reverse().map((v, i) => ({
        id: `music-${i}`,
        title: v.title ?? "Music Video",
        image_url:
          v.video?.images?.jpg?.image_url ||
          v.video?.images?.maximum_image_url ||
          null,
        youtube_id: v.video?.youtube_id || null,
      }))
    : [];

  return [...promos, ...episodes, ...musicVideos];
};

const VideoPlayer = ({ videos }) => {
  const [selected, setSelected] = useState(videos[0] || null);

  useEffect(() => {
    if (!selected && videos.length > 0) setSelected(videos[0]);
  }, [videos]);

  if (!selected) {
    return (
      <div
        style={{
          background: "#0d0d0d",
          borderRadius: 12,
          border: "1px solid #2a2a2a",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <img
          src={noImage}
          alt="No video available"
          style={{ width: 80, height: 80, objectFit: "contain", opacity: 0.4 }}
        />
        <span style={{ color: "#666", fontSize: "0.95rem" }}>
          No videos available
        </span>
      </div>
    );
  }

  return (
    <div style={{ background: "#0d0d0d", borderRadius: 12, overflow: "hidden", border: "1px solid #2a2a2a" }}>

      {/* ── Main Screen ── */}
      <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
        {selected.youtube_id ? (
          <iframe
            key={selected.youtube_id}
            src={`https://www.youtube.com/embed/${selected.youtube_id}?autoplay=1&rel=0`}
            title={selected.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              border: "none",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={selected.image_url || noImage}
              alt={selected.title}
              onError={(e) => { e.target.src = noImage; }}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                padding: "20px 16px 12px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {selected.title}
            </div>
          </div>
        )}
      </div>

      {/* Title Bar */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #1e1e1e" }}>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>
          {selected.title}
        </span>
        {!selected.youtube_id && (
          <Badge bg="secondary" className="ms-2" style={{ fontSize: "0.7rem" }}>No Video</Badge>
        )}
      </div>

      {/* Thumbnail Scroll Bar */}
      {videos.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            padding: "10px 12px",
            scrollbarWidth: "thin",
            scrollbarColor: "#444 #111",
          }}
        >
          {videos.map((v) => {
            const isActive = v.id === selected.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelected(v)}
                style={{
                  flexShrink: 0,
                  width: 140,
                  cursor: "pointer",
                  borderRadius: 6,
                  overflow: "hidden",
                  border: isActive ? "2px solid var(--color-primary, #0d6efd)" : "2px solid transparent",
                  opacity: isActive ? 1 : 0.65,
                  transition: "opacity 0.2s, border 0.2s",
                  background: "#1a1a1a",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={v.image_url || noImage}
                    alt={v.title}
                    onError={(e) => { e.target.src = noImage; }}
                    style={{ width: "100%", height: 80, objectFit: "cover", display: "block" }}
                  />
                  {v.youtube_id && (
                    <div style={{
                      position: "absolute",
                      top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(0,0,0,0.6)",
                      borderRadius: "50%",
                      width: 28, height: 28,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 12,
                    }}>▶</div>
                  )}
                </div>
                <div style={{
                  padding: "4px 6px",
                  fontSize: "0.7rem",
                  color: "#ccc",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {v.title}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AnimeVideos = ({ videos, loading }) => {
  const flat = extractVideos(videos);

  return (
    <Section
      title="Videos / Trailers"
      loading={loading}
      empty={flat.length === 0}
    >
      <VideoPlayer videos={flat} />
    </Section>
  );
};

export default AnimeVideos;
