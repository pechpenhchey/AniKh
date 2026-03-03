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

  // Fix: initialize as null (object shape) instead of [] (array)
  // so we can distinguish "not yet fetched" from "fetched but empty"
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
    const { loadingFull, currentId } = get();
    if (loadingFull || currentId === id) return;

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
    const { loadingCharacters, currentId, characters } = get();
    if (loadingCharacters || (currentId === id && characters.length > 0)) return;

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
    const { loadingEpisodes, currentId, episodes } = get();
    if (loadingEpisodes || (currentId === id && episodes.length > 0)) return;

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
    const { loadingVideos, videos } = get();

    // Fix: guard on videos !== null instead of currentId + videos.length
    // Previously: currentId === id blocked fetching because fetchFull already set currentId
    // Previously: videos.length was always undefined since videos was [] not an object
    if (loadingVideos || videos !== null) return;

    set({ loadingVideos: true, error: null });
    try {
      const data = await fetchAnimeVideos(id);
      // data shape: { promo: [...], episodes: [...], music_videos: [...] }
      set({ videos: data ?? { promo: [], episodes: [], music_videos: [] } });
    } catch {
      set({ error: "Failed to fetch videos" });
    } finally {
      set({ loadingVideos: false });
    }
  },

  fetchRecommendations: async (id) => {
    const { loadingRecom, currentId, recommendations } = get();
    if (loadingRecom || (currentId === id && recommendations.length > 0)) return;

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