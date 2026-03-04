import { create } from "zustand";
import { fetchSeasonalAnime } from "./action";

export const useSeasonalAnimeStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getSeasonalAnime: () => fetchSeasonalAnime(set),
}));