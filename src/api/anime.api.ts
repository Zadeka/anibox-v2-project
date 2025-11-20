// src/api/anime.api.ts
import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

import type {
  ApiResponse,
  JikanData,
  AnimeItem,
  AnimeDetail,
  Character,
  Episode,
  Genre,
  ScheduleItem,
  ImageFormat,
} from "../types/anime.type";

// Tipe respons untuk daftar (misal: /anime, /top/anime)
type ListResponse<T> = Promise<ApiResponse<T>>;

// Tipe respons untuk detail tunggal (misal: /anime/{id})
type DetailResponse<T> = Promise<JikanData<T>>;

export interface AnimeFilterParams {
  q?: string;
  type?: string;
  status?: string;
  rating?: string;
  order_by?: string;
  sort?: string;
  limit?: number;
}

// 1. GET All Anime (untuk Home Page, Anime Populer)
export const getAllAnime = async (
  page: number = 1,
  filters?: AnimeFilterParams,
): ListResponse<AnimeItem> => {
  const limitValue = filters?.limit || 25;

  const params: Record<string, string | number | boolean> = {
    page,
    limit: limitValue, // 👈 SET NILAI LIMIT DISINI
    sfw: true,
    order_by: "",
    sort: "desc",
  };

  // Tambahkan filter lainnya
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "limit" && key !== "page" && key !== "sfw") {
        params[key] = value;
      }
    });
  }

  try {
    const response = await axiosInstance.get<ApiResponse<AnimeItem>>("/anime", {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 2. GET Anime Search */
export const searchAnime = async (query: string): ListResponse<AnimeItem> => {
  const q = encodeURIComponent(query);
  try {
    const response = await axiosInstance.get(`/anime?q=${q}&sfw`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 3. GET Anime By ID (Detail Utama) */
export const getAnimeById = async (id: number): DetailResponse<AnimeDetail> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 4. GET Anime Genres */
export const getAnimeGenres = async (): DetailResponse<Genre[]> => {
  try {
    const response = await axiosInstance.get("/genres/anime");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 5. GET Seasonal Anime (Airing Now) dengan Filter */
export const getSeasonalAnime = async (
  page: number = 1,
  filters?: AnimeFilterParams,
): ListResponse<AnimeItem> => {
  
  const limitValue = filters?.limit || 25;

  const params: Record<string, string | number | boolean> = {
    page,
    limit: limitValue,
    sfw: true, 
  };

  if (filters) {
    // 1. Filter Tipe (type): Dipetakan ke parameter 'filter' Jikan
    if (filters.type) {
      params.filter = filters.type; 
    }
  }

  try {
    const response = await axiosInstance.get<ApiResponse<AnimeItem>>(
      "/seasons/now",
      { params },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "❌ Seasonal Anime Error:",
        error.response?.data || error.message,
      );
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 6. GET Seasonal Upcoming */
export const getUpcomingAnime = async (): ListResponse<AnimeItem> => {
  try {
    const response = await axiosInstance.get("/seasons/upcoming");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 7. GET Top Anime Ranking */
export const getTopAnime = async (): ListResponse<AnimeItem> => {
  try {
    const response = await axiosInstance.get("/top/anime?filter=bypopularity");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 8. GET Schedules (Jadwal Rilis) */
export const getSchedules = async (): ListResponse<ScheduleItem> => {
  try {
    const response = await axiosInstance.get("/schedules");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

// =================================================================
// III. FUNGSI DETAIL KONTEN (NESTED DETAIL TABS)
// =================================================================

/** 9. GET Anime Episodes */
export const getAnimeEpisodes = async (id: number): ListResponse<Episode> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/episodes`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 10. GET Anime Pictures */
export const getAnimePictures = async (
  id: number,
): DetailResponse<{ jpg: ImageFormat }[]> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/pictures`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 11. GET Anime Themes (Opening/Ending) */
export const getAnimeThemes = async (
  id: number,
): DetailResponse<{ openings: string[]; endings: string[] }> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/themes`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 12. GET Anime Streaming */
export const getAnimeStreaming = async (
  id: number,
): DetailResponse<{ name: string; url: string }[]> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/streaming`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};

/** 13. GET Anime Characters */
export const getAnimeCharacters = async (
  id: number,
): ListResponse<Character> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/characters`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw new Error("An unexpected error occurred");
  }
};
