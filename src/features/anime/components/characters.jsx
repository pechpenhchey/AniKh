import React, { useState } from "react";
import Section from "./section";
import noImage from "../../../shared/assets/no-img.jpg";

const extractCharacters = (chars) => {
  if (!Array.isArray(chars)) return [];
  return chars.map((c) => ({
    mal_id: c.character?.mal_id,
    name: c.character?.name ?? "Unknown",
    role: c.role ?? "",
    image_url:
      c.character?.images?.jpg?.image_url ||
      c.character?.images?.webp?.image_url ||
      null,
    va_jp: c.voice_actors?.find((v) => v.language === "Japanese") ?? null,
    va_en: c.voice_actors?.find((v) => v.language === "English") ?? null,
  }));
};

const AnimeCharacters = ({ characters, loading }) => {
  const [showAll, setShowAll]     = useState(false);
  const [lang, setLang]           = useState("Japanese");

  const flat    = extractCharacters(characters);
  const visible = showAll ? flat : flat.slice(0, 12);

  return (
    <Section
      title={`Characters / Voice Actors (${flat.length})`}
      loading={loading}
      empty={flat.length === 0}
    >
      {/* Lang toggle */}
      <div className="char-lang-toggle">
        {["Japanese", "English"].map((l) => (
          <button
            key={l}
            className={`char-lang-btn${lang === l ? " active" : ""}`}
            onClick={() => setLang(l)}
          >
            {l === "Japanese" ? "🇯🇵 Japanese" : "🇺🇸 English"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="char-grid">
        {visible.map((c) => {
          const rc = c.role?.toLowerCase() === "main" ? "main" : "supporting";
          const va = lang === "Japanese" ? c.va_jp : c.va_en;

          return (
            <div key={c.mal_id} className="char-card">
              {/* Character */}
              <div className="char-row">
                <img
                  src={c.image_url || noImage}
                  alt={c.name}
                  className="char-avatar"
                  onError={(e) => { e.target.src = noImage; }}
                />
                <div className="char-meta">
                  <div className="char-name">{c.name}</div>
                  <div className={`char-role ${rc}`}>{c.role}</div>
                </div>
              </div>

              {/* Voice Actor */}
              <div className="char-va-row">
                <img
                  src={va?.person?.images?.jpg?.image_url || noImage}
                  alt={va?.person?.name ?? "N/A"}
                  className="char-va-avatar"
                  onError={(e) => { e.target.src = noImage; }}
                />
                <div className="char-va-meta">
                  <div className="char-va-name">
                    {va?.person?.name ?? "—"}
                  </div>
                  <div className="char-va-lang">{lang}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more */}
      {flat.length > 12 && (
        <div className="text-center mt-4">
          <button
            className="char-show-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `See All ${flat.length} Characters`}
          </button>
        </div>
      )}
    </Section>
  );
};

export default AnimeCharacters;