import { create } from "zustand";
import { fetchTopAnime } from "./action";

export const useAnimeStore = create((set, get) => ({
  topAnime: [],
  loading: false,
  error: null,

  getTopAnime: async () => {
    const { loading, topAnime } = get();
    if (loading || topAnime?.length > 0) return;

    set({ loading: true, error: null });
    try {
      const data = await fetchTopAnime();
      set({ topAnime: data });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch top anime" });
    } finally {
      set({ loading: false });
    }
  },
}));