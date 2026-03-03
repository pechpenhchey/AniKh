import React, { useEffect } from "react";
import Banner from "../Banner";
import MediaSection from "../../../shared/components/layout/CardSection";
import { useAnimeStore } from "../../../app/api/anime/core/slice";
import { useMangaStore } from "../../../app/api/manga/slice";
import "../styles/Home.css";

const Home = () => {
  const { topAnime, getTopAnime } = useAnimeStore();
  const { topManga, getTopManga } = useMangaStore();

  const totalCard = 10;

  useEffect(() => {
    if (!topAnime?.length) {
      getTopAnime();
    }

    if (!topManga?.length) {
      getTopManga();
    }
  }, [topAnime, topManga]);

  return (
    <div>
      <Banner />

      <div className="py-3">
        {/* Anime Section */}
        <MediaSection
          title="Top Anime"
          items={topAnime}
          loading={!topAnime || topAnime.length === 0}
          limit={totalCard}
          onSeeMore={() => console.log("Go to Anime Page")}
          cardProps={{
            detailPath: "anime",
            imageKey: "images.jpg.large_image_url",
            titleKey: "title_english",
            scoreKey: "score",
            statusKey: "status",
            episodeKey: "episodes",
          }}
        />

        {/* Manga Section */}
        <MediaSection
          title="Top Manga"
          items={topManga}
          loading={!topManga || topManga.length === 0}
          limit={totalCard}
          onSeeMore={() => console.log("Go to Manga Page")}
          cardProps={{
            detailPath: "manga",
            imageKey: "images.jpg.large_image_url",
            titleKey: "title_english",
            scoreKey: "score",
            statusKey: "status",
            episodeKey: "chapters",
          }}
        />
      </div>
    </div>
  );
};

export default Home;