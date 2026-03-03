import { create } from "zustand";
import { fetchTotalAnime } from "./action";

export const useTotalAnimeStore = create((set, get) => ({
  totalAnimeList: [],
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,

  fetchPage: async (page = 1) => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null });

    try {
      const res = await fetchTotalAnime(page);
      set({
        totalAnimeList: res.data,
        currentPage: res.currentPage,
        lastPage: res.lastPage,
      });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch anime" });
    }

    set({ loading: false });
  },
}));