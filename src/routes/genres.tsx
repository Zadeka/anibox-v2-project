import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { getAnimeGenres } from "../api/anime.api";
import type { Genre } from "../types/anime.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function GenresAnimePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAnimeGenres();
        setGenres(response.data);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Gagal memuat daftar genre. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const getBadgeColor = (index: number) => {
    const colors = [
      "bg-purple-500 hover:bg-purple-600",
      "bg-pink-500 hover:bg-pink-600",
      "bg-blue-500 hover:bg-blue-600",
      "bg-green-500 hover:bg-green-600",
      "bg-orange-500 hover:bg-orange-600",
      "bg-indigo-500 hover:bg-indigo-600",
      "bg-rose-500 hover:bg-rose-600",
      "bg-teal-500 hover:bg-teal-600",
      "bg-violet-500 hover:bg-violet-600",
      "bg-cyan-500 hover:bg-cyan-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
              <Sparkles className="h-10 w-10 text-white" /> Genre Anime
            </h1>
            <p className="text-purple-100">
              {genres.length > 0
                ? `${genres.length} genre tersedia`
                : "Memuat genre..."}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-purple-500" />
              <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                Memuat genre...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                  {error}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-purple-200 bg-white/80 backdrop-blur-sm dark:border-purple-800 dark:bg-purple-950/50">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3">
                {genres.map((genre, index) => (
                  <Badge
                    key={genre.mal_id}
                    className={`cursor-pointer px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl ${getBadgeColor(
                      index,
                    )}`}
                  >
                    {genre.name}
                    {genre.count && (
                      <span className="ml-2 text-xs opacity-80">
                        ({genre.count})
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/genres")({
  component: GenresAnimePage,
});
