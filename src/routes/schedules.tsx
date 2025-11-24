import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import type { AnimeItem, ScheduleItem } from "../types/anime.type";
import { getSchedules } from "../api/anime.api";
import { AnimeCardGrid } from "../components/common/AnimeCardGrid";
import { AnimeCardList } from "../components/common/AnimeCardList";
import { AnimePagination } from "../components/common/AnimePagination";
import { AnimeViewToggle } from "../components/common/AnimeViewToggle";
import { AnimeLoadingSkeleton } from "../components/common/AnimeLoadingSkeleton";

function SchedulePage() {
  const [animeList, setAnimeList] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Filter states
  const [dayFilter, setDayFilter] = useState<
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
    | undefined
  >();
  const [typeFilter] = useState<string | undefined>();
  const [ratingFilter] = useState<string | undefined>();

  // Get current day
  const getCurrentDay = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[new Date().getDay()] as any;
  };

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
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const filters = {
          day: dayFilter,
          type: typeFilter,
          rating: ratingFilter,
        };

        console.log("📅 Fetching Schedules with filters:", filters);

        const response = await getSchedules(currentPage, filters);
        const uniqueAnimeList = removeDuplicates(response.data);

        setAnimeList(uniqueAnimeList);
        setTotalPages(response.pagination.last_visible_page);
        setTotalItems(
          response.pagination.items?.total || uniqueAnimeList.length,
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("❌ Error fetching schedules:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [currentPage, dayFilter, typeFilter, ratingFilter]);

  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
              <CalendarDays className="h-8 w-8" />
              Jadwal Tayang
            </h1>
            <p className="text-purple-100">
              Anime yang tayang{" "}
              {dayFilter ? `hari ${getDayIndonesian(dayFilter)}` : "minggu ini"}{" "}
              • {totalItems} anime
            </p>
          </div>
          <AnimeViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Filters */}

        {/* Quick Day Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setDayFilter(getCurrentDay());
              setCurrentPage(1);
            }}
            className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30"
          >
            📍 Hari Ini
          </button>
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day) => (
            <button
              key={day}
              onClick={() => {
                setDayFilter(day as any);
                setCurrentPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm transition-all ${
                dayFilter === day
                  ? "bg-white text-purple-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {getDayShort(day)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <AnimeLoadingSkeleton count={25} viewMode={viewMode} />
        ) : animeList.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <CalendarDays className="mx-auto mb-4 h-16 w-16 text-purple-300 dark:text-purple-700" />
              <p className="text-xl font-semibold text-purple-900 dark:text-purple-100">
                Tidak ada jadwal tayang
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Coba pilih hari lain atau ubah filter
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

// Helper functions
function getDayIndonesian(day: string): string {
  const days: Record<string, string> = {
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
    saturday: "Sabtu",
    sunday: "Minggu",
  };
  return days[day] || day;
}

function getDayShort(day: string): string {
  const days: Record<string, string> = {
    monday: "Sen",
    tuesday: "Sel",
    wednesday: "Rab",
    thursday: "Kam",
    friday: "Jum",
    saturday: "Sab",
    sunday: "Min",
  };
  return days[day] || day;
}

export const Route = createFileRoute("/schedules")({
  component: SchedulePage,
});
