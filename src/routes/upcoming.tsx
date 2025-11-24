// src/routes/upcoming.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarClock, TrendingUp } from "lucide-react";
import type { AnimeItem } from "../types/anime.type";
import { getUpcomingAnime } from "../api/anime.api";
import { AnimeCardGrid } from "../components/common/AnimeCardGrid";
import { AnimeCardList } from "../components/common/AnimeCardList";
import { AnimePagination } from "../components/common/AnimePagination";
import { AnimeViewToggle } from "../components/common/AnimeViewToggle";
import { AnimeLoadingSkeleton } from "../components/common/AnimeLoadingSkeleton";
import { AnimeTypeFilter } from "../components/common/AnimeTypeFilter";
import { AnimeContinuingFilter } from "../components/common/AnimeContinuingFilter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function UpcomingAnimePage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [continuingFilter, setContinuingFilter] = useState<
    boolean | undefined
  >();

  // Stats
  const [stats, setStats] = useState({
    newSeries: 0,
    continuing: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const filters = {
          type: typeFilter,
          continuing: continuingFilter,
        };

        console.log("🎬 Fetching Upcoming Anime with filters:", filters);

        const response = await getUpcomingAnime(currentPage, filters);
        const uniqueAnimeList = removeDuplicates(response.data);

        setAnimeList(uniqueAnimeList); // Gunakan uniqueAnimeList, bukan response.data
        setTotalPages(response.pagination.last_visible_page);
        setTotalItems(
          response.pagination.items?.total || uniqueAnimeList.length,
        );

        // Calculate stats menggunakan uniqueAnimeList
        const newSeriesCount = uniqueAnimeList.filter(
          (anime) => !anime.continuing,
        ).length;
        const continuingCount = uniqueAnimeList.filter(
          (anime) => anime.continuing,
        ).length;

        setStats({
          newSeries: newSeriesCount,
          continuing: continuingCount,
          total: uniqueAnimeList.length, // Gunakan uniqueAnimeList.length
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("❌ Error fetching upcoming anime:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [currentPage, typeFilter, continuingFilter]);

  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
              <CalendarClock className="h-8 w-8" />
              Upcoming Anime
            </h1>
            <p className="text-purple-100">
              Anime yang akan datang • {totalItems} anime
            </p>
          </div>
          <AnimeViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <AnimeContinuingFilter
            value={continuingFilter}
            onChange={(val) => {
              setContinuingFilter(val);
              setCurrentPage(1);
            }}
          />
          <AnimeTypeFilter
            value={typeFilter}
            onChange={(val) => {
              setTypeFilter(val);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl">
        {/* Stats Cards */}
        {!loading && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm dark:border-purple-800 dark:bg-purple-950/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Total Upcoming
                    </p>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      {stats.total}
                    </p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm dark:border-blue-800 dark:bg-blue-950/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      New Series
                    </p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.newSeries}
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-lg text-white">
                    🆕
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-white/80 backdrop-blur-sm dark:border-green-800 dark:bg-green-950/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Continuing
                    </p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                      {stats.continuing}
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-lg text-white">
                    🔄
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Anime List */}
        {loading ? (
          <AnimeLoadingSkeleton count={25} viewMode={viewMode} />
        ) : animeList.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <CalendarClock className="mx-auto mb-4 h-16 w-16 text-purple-300 dark:text-purple-700" />
              <p className="text-xl font-semibold text-purple-900 dark:text-purple-100">
                Tidak ada anime upcoming ditemukan
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Coba ubah filter pencarian Anda
              </p>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {animeList.map((anime) => (
              <div key={anime.mal_id} className="relative">
                <AnimeCardGrid anime={anime} />
                {/* Badge untuk Continuing */}
                {anime.continuing && (
                  <Badge className="absolute right-2 top-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                    🔄 Continuing
                  </Badge>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {animeList.map((anime) => (
              <div key={anime.mal_id} className="relative">
                <AnimeCardList anime={anime} />
                {/* Badge untuk Continuing di List View */}
                {anime.continuing && (
                  <Badge className="absolute right-4 top-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                    🔄 Continuing
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
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

export const Route = createFileRoute("/upcoming")({
  component: UpcomingAnimePage,
});
