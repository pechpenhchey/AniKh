import { useNavigate } from "react-router-dom";

export const TOTAL_CARDS = 12;
export const TOTAL_CARDS_Season = 6;

export const useHomeNavigation = () => {
  const navigate = useNavigate();
  return {
    goToAnime: () => navigate("/anime"),
    goToManga: () => navigate("/manga"),
    goToSeasonal: () => navigate("/seasonal"),
  };
};

export const animeCardProps = {
  detailPath: "anime",
  imageKey: "images.jpg.large_image_url",
  titleKey: "title_english",
  scoreKey: "score",
  statusKey: "status",
  episodeKey: "episodes",
};

export const mangaCardProps = {
  detailPath: "manga",
  imageKey: "images.jpg.large_image_url",
  titleKey: "title_english",
  scoreKey: "score",
  statusKey: "status",
  episodeKey: "chapters",
};

export const seasonalCardProps = {
  detailPath: "anime",
  imageKey: "images.jpg.large_image_url",
  titleKey: "title_english",
  scoreKey: "score",
  statusKey: "status",
  episodeKey: "episodes",
};