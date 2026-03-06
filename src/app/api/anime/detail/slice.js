import { create } from "zustand";
import {
  fetchAnimeFullById,
  fetchAnimeCharactersStaff,
  fetchAnimeEpisodesPage,
  fetchAnimeVideos,
  fetchAnimeRecom,
} from "./action";

export const useAnimeDetailStore = create((set, get) => ({
  currentId: null,
  animeDetail: null,
  characters: [],
  episodes: [],
  episodePage: 1,
  episodeHasNextPage: false,
  videos: null,
  recommendations: [],

  loadingFull: false,
  loadingCharacters: false,
  loadingEpisodes: false,
  loadingMoreEpisodes: false,
  loadingVideos: false,
  loadingRecom: false,

  error: null,

  fetchFull: async (id) => {
    const { loadingFull } = get();
    if (loadingFull) return;

    set({ loadingFull: true, error: null });
    try {
      const data = await fetchAnimeFullById(id);
      set({ animeDetail: data, currentId: id });
    } catch {
      set({ error: "Failed to fetch anime full info" });
    } finally {
      set({ loadingFull: false });
    }
  },

  fetchCharacters: async (id) => {
    const { loadingCharacters } = get();
    if (loadingCharacters) return;

    set({ loadingCharacters: true, error: null });
    try {
      const data = await fetchAnimeCharactersStaff(id);
      set({ characters: data ?? [] });
    } catch {
      set({ error: "Failed to fetch characters" });
    } finally {
      set({ loadingCharacters: false });
    }
  },

  fetchEpisodes: async (id) => {
    const { loadingEpisodes } = get();
    if (loadingEpisodes) return;

    set({ loadingEpisodes: true, error: null });
    try {
      const { episodes: data, hasNextPage } = await fetchAnimeEpisodesPage(id, 1);
      set({
        episodes: data,
        episodePage: 1,
        episodeHasNextPage: hasNextPage,
      });
    } catch {
      set({ error: "Failed to fetch episodes" });
    } finally {
      set({ loadingEpisodes: false });
    }
  },

  loadMoreEpisodes: async (id) => {
    const { loadingMoreEpisodes, episodeHasNextPage, episodePage, episodes } = get();
    if (loadingMoreEpisodes || !episodeHasNextPage) return;

    set({ loadingMoreEpisodes: true });
    try {
      const nextPage = episodePage + 1;
      const { episodes: newData, hasNextPage } = await fetchAnimeEpisodesPage(id, nextPage);
      set({
        episodes: [...episodes, ...newData],
        episodePage: nextPage,
        episodeHasNextPage: hasNextPage,
      });
    } catch {
      set({ error: "Failed to load more episodes" });
    } finally {
      set({ loadingMoreEpisodes: false });
    }
  },

  fetchVideos: async (id) => {
    const { loadingVideos } = get();
    if (loadingVideos) return;

    set({ loadingVideos: true, error: null });
    try {
      const data = await fetchAnimeVideos(id);
      set({ videos: data ?? { promo: [], episodes: [], music_videos: [] } });
    } catch {
      set({ error: "Failed to fetch videos" });
    } finally {
      set({ loadingVideos: false });
    }
  },

  fetchRecommendations: async (id) => {
    const { loadingRecom } = get();
    if (loadingRecom) return;

    set({ loadingRecom: true, error: null });
    try {
      const data = await fetchAnimeRecom(id);
      set({ recommendations: data ?? [] });
    } catch {
      set({ error: "Failed to fetch recommendations" });
    } finally {
      set({ loadingRecom: false });
    }
  },

  clearDetail: () =>
    set({
      currentId: null,
      animeDetail: null,
      characters: [],
      episodes: [],
      episodePage: 1,
      episodeHasNextPage: false,
      videos: null,
      recommendations: [],
      loadingFull: false,
      loadingCharacters: false,
      loadingEpisodes: false,
      loadingMoreEpisodes: false,
      loadingVideos: false,
      loadingRecom: false,
      error: null,
    }),
}));