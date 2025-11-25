// src/types/anime.type.ts

/** Wrapper data untuk endpoint GET By ID */
export interface JikanData<T> {
  data: T;
}

/** Wrapper untuk endpoint List/Array */
export interface ApiResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

// --- Tipe Entitas Utama (Disederhanakan) ---

export interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

/** Genre/Theme/Demographic Item */
export interface GenreItem {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

/** Item Anime Ringkas (untuk List, Search, Top) */
export interface AnimeItem {
  mal_id: number;
  url: string;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  status: string;
  synopsis: string | null;
  images: {
    jpg: ImageFormat;
    webp: ImageFormat;
  };
  episodes: number | null;
  score: number | null;
  type: string;
  genres: GenreItem[];
  themes?: GenreItem[];
  demographics?: GenreItem[];
  aired?: {
    from: string | null;
    to: string | null;
    string: string;
  };
  season?: string | null;
  year?: number | null;
  rating?: string | null;
  rank?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites?: number | null;
  continuing?: boolean;
}

/** Detail Anime Penuh (untuk GET By ID) */
export interface AnimeDetail extends AnimeItem {
  status: string;
  synopsis: string | null;
  season: string | null;
  year: number | null;
  genres: GenreItem[];
  themes: GenreItem[];
  demographics: GenreItem[];
  studios?: { mal_id: number; name: string; type: string; url: string }[];
  producers?: { mal_id: number; name: string; type: string; url: string }[];
  licensors?: { mal_id: number; name: string; type: string; url: string }[];
  source?: string;
  duration?: string;
  rating?: string;
}

/** Item Karakter (untuk /characters) */
export interface Character {
  character: {
    mal_id: number;
    url: string;
    images: { jpg: ImageFormat };
    name: string;
  };
  role: string;
}

/** Item Episode (untuk /episodes) */
export interface Episode {
  mal_id: number;
  url: string;
  title: string;
  episode: string;
  aired: string;
  forum_url: string;
}

/** Item Genre (untuk /genres/anime) */
export interface Genre {
  mal_id: number;
  name: string;
  count: number;
}

/** Item Jadwal Rilis (untuk /schedules) */
export interface ScheduleItem extends AnimeItem {
  mal_id: number;
  title: string;
  broadcast: { string: string };
  day: string;
}
