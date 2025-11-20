// src/routes/search.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAllAnime } from "@/api/anime.api";
import { AnimeCardGrid } from "@/components/common/AnimeCardGrid";
import { AnimeCardList } from "@/components/common/AnimeCardList";
import { AnimePagination } from "@/components/common/AnimePagination";
import { AnimeViewToggle } from "@/components/common/AnimeViewToggle";
import { AnimeLoadingSkeleton } from "@/components/common/AnimeLoadingSkeleton";
import type { AnimeItem } from "@/types/anime.type";
import { AnimeSearchInput } from "@/components/common/AnimeSearchInput";
import { AnimeTypeFilter } from "@/components/common/AnimeTypeFilter";
import { AnimeStatusFilter } from "@/components/common/AnimeStatusFilter";
import { AnimeRatingFilter } from "@/components/common/AnimeRatingFilter";
import { AnimeSortFilter } from "@/components/common/AnimeSortFilter";

function AnimeListPage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Separate filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [ratingFilter, setRatingFilter] = useState<string | undefined>();
  const [sortFilter, setSortFilter] = useState<string | undefined>();

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const filters = {
          q: searchQuery || undefined,
          type: typeFilter,
          status: statusFilter,
          rating: ratingFilter,
          order_by: sortFilter,
        };

        const response = await getAllAnime(currentPage, filters);
        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [
    currentPage,
    searchQuery,
    typeFilter,
    statusFilter,
    ratingFilter,
    sortFilter,
  ]);

  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Search Anime</h1>
            <p className="text-muted-foreground">
              {animeList.length} anime ditemukan
            </p>
          </div>

          <AnimeViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Modular Filters */}
        <div className="flex flex-wrap gap-3">
          <AnimeSearchInput value={searchQuery} onChange={setSearchQuery} />

          <AnimeTypeFilter value={typeFilter} onChange={setTypeFilter} />

          <AnimeStatusFilter value={statusFilter} onChange={setStatusFilter} />

          <AnimeRatingFilter value={ratingFilter} onChange={setRatingFilter} />

          <AnimeSortFilter value={sortFilter} onChange={setSortFilter} />
        </div>
      </div>
      {/* Grid/List Layout */}
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

export const Route = createFileRoute("/search")({
  component: AnimeListPage,
});
