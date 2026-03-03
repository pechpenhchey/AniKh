import { create } from "zustand";
import { fetchTopManga } from "./action";

export const useMangaStore = create((set, get) => ({
  topManga: [],
  loading: false,
  error: null,

  getTopManga: async () => {
    const { topManga, loading } = get();

    if (loading || topManga.length > 0) return;

    set({ loading: true, error: null });

    try {
      const data = await fetchTopManga();
      set({ topManga: data });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch manga" });
    }

    set({ loading: false });
  },
}));