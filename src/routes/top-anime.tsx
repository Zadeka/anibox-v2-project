import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

import type { AnimeItem } from "../types/anime.type";
import { getTopAnime } from "../api/anime.api";
import { AnimeCardGrid } from "../components/common/AnimeCardGrid";
import { AnimeCardList } from "../components/common/AnimeCardList";
import { AnimePagination } from "../components/common/AnimePagination";
import { AnimeViewToggle } from "../components/common/AnimeViewToggle";
import { AnimeLoadingSkeleton } from "../components/common/AnimeLoadingSkeleton";
import { AnimeTypeFilter } from "../components/common/AnimeTypeFilter";
import { AnimeStatusFilter } from "../components/common/AnimeStatusFilter";
import { AnimeRatingFilter } from "../components/common/AnimeRatingFilter";

function TopAnimePage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [ratingFilter, setRatingFilter] = useState<string | undefined>();
  const [categoryFilter] = useState<
    "bypopularity" | "airing" | "upcoming" | "favorite" | undefined
  >("bypopularity");

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const filters = {
          type: typeFilter,
          status: statusFilter,
          rating: ratingFilter,
          filter: categoryFilter,
        };

        console.log("🏆 Fetching Top Anime with filters:", filters);

        const response = await getTopAnime(currentPage, filters);

        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("❌ Error fetching top anime:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [currentPage, typeFilter, statusFilter, ratingFilter, categoryFilter]);

  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
              <Trophy className="h-8 w-8" />
              Top Anime
            </h1>
            <p className="text-muted-foreground">
              {animeList.length} anime ditemukan
            </p>
          </div>
          <AnimeViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* <AnimeTopCategoryFilter
              value={categoryFilter}
              onChange={(val) => {
                setCategoryFilter(val);
                setCurrentPage(1);
              }}
            /> */}
          <AnimeTypeFilter
            value={typeFilter}
            onChange={(val) => {
              setTypeFilter(val);
              setCurrentPage(1);
            }}
          />
          <AnimeStatusFilter
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
          />
          <AnimeRatingFilter
            value={ratingFilter}
            onChange={(val) => {
              setRatingFilter(val);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <AnimeLoadingSkeleton count={25} viewMode={viewMode} />
        ) : animeList.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold text-purple-900 dark:text-purple-100">
                Tidak ada anime ditemukan
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Coba ubah filter pencarian Anda
              </p>
            </div>
          </div>
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

        {totalPages > 1 && (
          <AnimePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/top-anime")({
  component: TopAnimePage,
});
