import { useEffect } from "react";
import { useAnimeStore } from "../../../../app/api/anime/core/slice";
import { useMangaStore } from "../../../../app/api/manga/slice";
import { useSeasonalAnimeStore } from "../../../../app/api/anime/season/slice";

const useHomeData = () => {
  const { topAnime, getTopAnime } = useAnimeStore();
  const { topManga, getTopManga } = useMangaStore();
  const { data: seasonalAnime, loading: seasonalLoading, getSeasonalAnime } = useSeasonalAnimeStore();

  useEffect(() => {
    const fetchAll = async () => {
      if (!topAnime?.length) await getTopAnime();
      if (!topManga?.length) await getTopManga();
      if (!seasonalAnime?.length) await getSeasonalAnime();
    };
    fetchAll();
  }, []);

  return { topAnime, topManga, seasonalAnime, seasonalLoading };
};

export default useHomeData;