// src/routes/seasonal.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getSeasonalAnime } from "../api/anime.api";
import { AnimeCardGrid } from "../components/common/AnimeCardGrid";
import { AnimeCardList } from "../components/common/AnimeCardList";
import { AnimePagination } from "../components/common/AnimePagination";
import { AnimeViewToggle } from "../components/common/AnimeViewToggle";
import { AnimeLoadingSkeleton } from "../components/common/AnimeLoadingSkeleton";
import { AnimeTypeFilter } from "../components/common/AnimeTypeFilter";

import type { AnimeItem } from "../types/anime.type";

function SeasonalAnimePage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Separate filter states
  const [typeFilter, setTypeFilter] = useState<string | undefined>();

  // Function to remove duplicates based on mal_id
  const removeDuplicates = (animes: AnimeItem[]): AnimeItem[] => {
    const uniqueAnimes = new Map<number, AnimeItem>();
    animes.forEach((anime) => {
      if (!uniqueAnimes.has(anime.mal_id)) {
        uniqueAnimes.set(anime.mal_id, anime);
      }
    });
    return Array.from(uniqueAnimes.values());
  };

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const filters = {
          type: typeFilter,
        };
        const response = await getSeasonalAnime(currentPage, filters);
        const uniqueAnimeList = removeDuplicates(response.data);
        setAnimeList(uniqueAnimeList);
        setTotalPages(response.pagination.last_visible_page);
        setTotalItems(
          response.pagination.items?.total || uniqueAnimeList.length,
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [currentPage, typeFilter]);

  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Seasonal Anime</h1>
            <p className="text-muted-foreground">
              {totalItems} anime ditemukan
            </p>
          </div>

          <AnimeViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <AnimeTypeFilter value={typeFilter} onChange={setTypeFilter} />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <AnimeLoadingSkeleton count={25} viewMode={viewMode} />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {animeList.map((anime) => (
              <AnimeCardGrid key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {animeList.map((anime) => (
              <AnimeCardList key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}

        <AnimePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/seasonal")({
  component: SeasonalAnimePage,
});
