export const searchAnimeCardProps = {
  detailPath: "anime",
  imageKey: "images.jpg.large_image_url",
  titleKey: "title_english",
  scoreKey: "score",
  statusKey: "status",
  episodeKey: "episodes",
};

export const searchMangaCardProps = {
  detailPath: "manga",
  imageKey: "images.jpg.large_image_url",
  titleKey: "title_english",
  scoreKey: "score",
  statusKey: "status",
  episodeKey: "chapters",
};

export const SEARCH_TABS = ["anime", "manga"];

export const ANIME_TYPES = [
  { label: "All", value: "" },
  { label: "TV", value: "tv" },
  { label: "Movie", value: "movie" },
  { label: "OVA", value: "ova" },
  { label: "Special", value: "special" },
  { label: "ONA", value: "ona" },
  { label: "Music", value: "music" },
];

export const ANIME_STATUS = [
  { label: "All", value: "" },
  { label: "Airing", value: "airing" },
  { label: "Complete", value: "complete" },
  { label: "Upcoming", value: "upcoming" },
];

export const ANIME_SORT = [
  { label: "Score", value: "score" },
  { label: "Popularity", value: "popularity" },
  { label: "Rank", value: "rank" },
  { label: "Title", value: "title" },
  { label: "Episodes", value: "episodes" },
  { label: "Favorites", value: "favorites" },
];

export const SORT_ORDER = [
  { label: "Desc", value: "desc" },
  { label: "Asc", value: "asc" },
];