// src/routes/index.tsx (GET All Anime)
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Filter, Grid3x3, List } from "lucide-react";
import { getAllAnime } from "@/api/anime.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AnimeItem } from "@/types/anime.type";
import type { FilterOptions } from "@/components/common/AnimeFilterSidebar";

function AnimeListPage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
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
  }, [currentPage, filters]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, q: searchQuery || undefined }));
      setCurrentPage(1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Generate pagination numbers (show 5 pages range)
  const getPaginationRange = () => {
    const range: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Discover Anime</h1>
          </div>

          {/* View Toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList>
              <TabsTrigger value="grid">
                <Grid3x3 className="mr-2 h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search + Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {filters.type ? `Type: ${filters.type}` : `Tipe Anime`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Pilih Tipe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, type: undefined }))}
              >
                Semua Tipe
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, type: "tv" }))}
              >
                TV Series
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, type: "movie" }))}
              >
                Movie
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, type: "ova" }))}
              >
                OVA
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filters.status ? `Status: ${filters.status}` : `Status`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Pilih Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, status: undefined }))}
              >
                Semua Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, status: "airing" }))}
              >
                Sedang Tayang
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilters((p) => ({ ...p, status: "complete" }))
                }
              >
                Selesai
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filters.order_by ? `Sort: ${filters.order_by}` : `Urutkan`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Urutkan Berdasarkan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setFilters((p) => ({ ...p, order_by: undefined }))
                }
              >
                Default
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, order_by: "score" }))}
              >
                Rating Tertinggi
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilters((p) => ({ ...p, order_by: "popularity" }))
                }
              >
                Popularitas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Grid/List Layout */}
      <div className="mx-auto max-w-7xl">
        {viewMode === "grid" ? (
          // Grid View - Badge di atas image
          (<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {loading
              ? Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
                  />
                ))
              : animeList.map((anime) => (
                  <Card
                    key={anime.mal_id}
                    className="group flex flex-col overflow-hidden transition-all hover:shadow-lg"
                  >
                    {/* Image dengan badges di atas */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                      <img
                        src={anime.images.webp.large_image_url}
                        alt={anime.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />

                      {/* Badges Overlay - Pojok Kiri Atas (Type & Status) */}
                      <div className="absolute left-2 top-2 flex flex-col gap-1">
                        <Badge className="border-purple-400 bg-purple-600 text-xs text-white shadow-lg backdrop-blur-sm">
                          {anime.status}
                        </Badge>
                        <Badge className="border-pink-400 bg-pink-600 text-xs text-white shadow-lg backdrop-blur-sm">
                          {anime.type}
                        </Badge>
                      </div>

                      {/* Badge Rating - Pojok Kanan Atas */}
                      <div className="absolute right-2 top-2">
                        <Badge className="bg-black/70 text-xs backdrop-blur-sm">
                          ⭐ {anime.score || "N/A"}
                        </Badge>
                      </div>
                    </div>

                    {/* Content - Judul 2 Bahasa (2 Baris) */}
                    <div className="flex flex-1 flex-col">
                      <CardHeader className="flex-1 pb-3 pt-3">
                        <div className="space-y-1">
                          {/* Baris 1: Title (Japanese/Original) */}
                          <h3 className="line-clamp-1 text-sm font-bold leading-tight">
                            {anime.title}
                          </h3>
                          {/* Baris 2: English Title */}
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {anime.title_english || anime.title}
                          </p>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                ))}
          </div>)
        ) : (
          // List View - Format: Title (English Title)
          (<div className="space-y-4">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-lg bg-muted"
                  />
                ))
              : animeList.map((anime) => (
                  <Card
                    key={anime.mal_id}
                    className="flex flex-row overflow-hidden transition-all hover:shadow-lg"
                  >
                    {/* Image fixed width */}
                    <div className="h-40 w-28 shrink-0 overflow-hidden bg-muted">
                      <img
                        src={anime.images.webp.large_image_url}
                        alt={anime.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          {/* Title Format: Original (English) */}
                          <h3 className="line-clamp-2 font-semibold leading-tight">
                            {anime.title}
                            {anime.title_english &&
                              anime.title_english !== anime.title && (
                                <span className="text-muted-foreground">
                                  {" "}
                                  ({anime.title_english})
                                </span>
                              )}
                          </h3>
                          <Badge variant="secondary" className="shrink-0">
                            ⭐ {anime.score || "N/A"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 pb-3">
                        <div className="mb-2 flex flex-wrap gap-2">
                          <Badge variant="outline">{anime.type}</Badge>
                          <Badge variant="outline">{anime.status}</Badge>
                        </div>
                        {anime.synopsis && (
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {anime.synopsis}
                          </p>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
          </div>)
        )}

        {/* Pagination dengan 5 nomor range */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-end gap-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>

            {/* First page if not in range */}
            {currentPage > 3 && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(1)}
                  disabled={loading}
                >
                  1
                </Button>
                {currentPage > 4 && (
                  <span className="flex items-center px-2">...</span>
                )}
              </>
            )}

            {/* Page Numbers (5 range) */}
            {getPaginationRange().map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </Button>
            ))}

            {/* Last page if not in range */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="flex items-center px-2">...</span>
                )}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={loading}
                >
                  {totalPages}
                </Button>
              </>
            )}

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/search")({
  component: AnimeListPage,
});
