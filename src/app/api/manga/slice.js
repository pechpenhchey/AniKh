import { create } from "zustand";
import { fetchTopManga, } from "./action";

export const useMangaStore = create((set) => ({
  topManga: [],
  
  loading: false,

  getTopManga: async () => {
    set({ loading: true });
    await fetchTopManga((data) => set({ topManga: data }));
    set({ loading: false });
  },


}));