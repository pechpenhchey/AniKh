import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAnimeDetailStore } from "../../app/api/anime/detail/slice";
import Loader from "../../shared/components/layout/Loading";
import "./styles/style.css";

import AnimeHero from "./components/animehero";
import AnimeCharacters from "./components/characters";
import AnimeEpisodes from "./components/episodes";
import AnimeVideos from "./components/videos";
import AnimeRecommendations from "./components/recommendations";

const AnimeDetail = () => {
  const { id } = useParams();

  const {
    animeDetail,
    characters,
    episodes,
    videos,
    recommendations,
    loadingFull,
    loadingCharacters,
    loadingEpisodes,
    loadingVideos,
    loadingRecom,
    episodeHasNextPage,
    loadingMoreEpisodes,
    error,
    fetchFull,
    fetchCharacters,
    fetchEpisodes,
    fetchVideos,
    fetchRecommendations,
    loadMoreEpisodes,
    clearDetail,
  } = useAnimeDetailStore();

  useEffect(() => {
    const load = async () => {
      clearDetail();
      await fetchFull(id);
      await fetchCharacters(id);
      await fetchVideos(id);
      await fetchEpisodes(id);
      await fetchRecommendations(id);
    };
    load();

    return () => clearDetail();
  }, [id]);

  if (loadingFull || !animeDetail) {
    return (
      <Container className="text-center py-5">
        <Loader text="Loading Anime Details..." fullHeight />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <AnimeHero anime={animeDetail} />

      <AnimeCharacters
        characters={characters}
        loading={loadingCharacters}
      />

      <AnimeVideos
        videos={videos}
        loading={loadingVideos}
      />
      
      <AnimeEpisodes
        id={id}
        episodes={episodes}
        loading={loadingEpisodes}
        episodeHasNextPage={episodeHasNextPage}
        loadingMoreEpisodes={loadingMoreEpisodes}
        loadMoreEpisodes={loadMoreEpisodes}
      />

      <AnimeRecommendations
        recommendations={recommendations}
        loading={loadingRecom}
      />
    </Container>
  );
};

export default AnimeDetail;
