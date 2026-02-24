import { create } from "zustand";
import { fetchTopAnime, } from "./action";

export const useAnimeStore = create((set) => ({
  topAnime: [],
  
  loading: false,

  getTopAnime: async () => {
    set({ loading: true });
    await fetchTopAnime((data) => set({ topAnime: data }));
    set({ loading: false });
  },


}));