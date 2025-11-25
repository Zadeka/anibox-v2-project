// 2. src/routes/anime/$animeId.tsx (GET Anime By ID - Parent Route)
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimeById } from "@/api/anime.api";
import type { AnimeDetail } from "@/types/anime.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Play,
  Heart,
  Film,
  ArrowLeft,
  User2,
  Film as FilmIcon,
  Image,
  Music,
  ExternalLink as StreamIcon,
} from "lucide-react";

export const Route = createFileRoute("/anime/$animeId")({
  component: AnimeDetailPage,
  loader: async ({ params }) => {
    const animeData = await getAnimeById(Number(params.animeId));
    return { animeTitle: animeData.data.title };
  },
});

function AnimeDetailPage() {
  const { animeId } = Route.useParams();
  const location = useLocation();
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Determine active tab from pathname
  const getActiveTab = () => {
    const pathname = location.pathname;
    if (pathname.includes("/characters")) return "characters";
    if (pathname.includes("/episodes")) return "episodes";
    if (pathname.includes("/pictures")) return "pictures";
    if (pathname.includes("/themes")) return "themes";
    if (pathname.includes("/streaming")) return "streaming";
    return "characters"; // default
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      setLoading(true);
      try {
        const animeData = await getAnimeById(Number(animeId));
        setAnime(animeData.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [animeId]);

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-8 w-32" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-96" />
            <div className="space-y-4 lg:col-span-2">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-primary">Anime tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link to="/search">
          <Button
            variant="ghost"
            className="mb-6 flex items-center justify-center rounded-lg border-2 border-primary bg-primary px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-primary active:scale-95 dark:hover:bg-secondary/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          {/* Poster */}
          <div className="relative">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full rounded-lg shadow-xl"
            />
            {anime.score && (
              <Badge className="absolute right-4 top-4 bg-yellow-500 text-lg text-white">
                <Star className="mr-1 h-4 w-4 fill-white" />
                {anime.score.toFixed(1)}
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="space-y-4 lg:col-span-2">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-primary">
                {anime.title}
              </h1>
              {anime.title_english && (
                <p className="text-xl text-primary/70 dark:text-white">
                  {anime.title_english}
                </p>
              )}
              {anime.title_japanese && (
                <p className="text-lg text-primary/70 dark:text-white">
                  {anime.title_japanese}
                </p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rank</p>
                      <p className="font-bold">#{anime.rank || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Popularity
                      </p>
                      <p className="font-bold">#{anime.popularity || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Members</p>
                      <p className="font-bold">
                        {anime.members?.toLocaleString() || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Favorites</p>
                      <p className="font-bold">
                        {anime.favorites?.toLocaleString() || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Info */}
            <Card>
              <CardContent className="grid gap-3 p-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">
                    <strong>Type:</strong> {anime.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    <strong>Episodes:</strong> {anime.episodes || "?"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    <strong>Status:</strong> {anime.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">
                    <strong>Duration:</strong> {anime.duration || "N/A"}
                  </span>
                </div>
                {anime.season && anime.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">
                      <strong>Season:</strong> {anime.season} {anime.year}
                    </span>
                  </div>
                )}
                {anime.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">
                      <strong>Rating:</strong> {anime.rating}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <Badge key={genre.mal_id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
              {anime.themes?.map((theme) => (
                <Badge key={theme.mal_id} variant="outline">
                  {theme.name}
                </Badge>
              ))}
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 font-semibold text-primary">Synopsis</h3>
                  <p className="wrap-anywhere text-justify text-sm font-medium leading-relaxed text-purple-800 dark:text-purple-100">
                    {anime.synopsis}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={getActiveTab()} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-5">
            <Link to="/anime/$animeId/characters" params={{ animeId }}>
              <TabsTrigger
                value="characters"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <User2 className="mr-2 h-4 w-4" />
                Characters
              </TabsTrigger>
            </Link>
            <Link to="/anime/$animeId/episodes" params={{ animeId }}>
              <TabsTrigger
                value="episodes"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <FilmIcon className="mr-2 h-4 w-4" />
                Episodes
              </TabsTrigger>
            </Link>
            <Link to="/anime/$animeId/pictures" params={{ animeId }}>
              <TabsTrigger
                value="pictures"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Image className="mr-2 h-4 w-4" />
                Pictures
              </TabsTrigger>
            </Link>
            <Link to="/anime/$animeId/themes" params={{ animeId }}>
              <TabsTrigger
                value="themes"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Music className="mr-2 h-4 w-4" />
                Themes
              </TabsTrigger>
            </Link>
            <Link to="/anime/$animeId/streaming" params={{ animeId }}>
              <TabsTrigger
                value="streaming"
                className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <StreamIcon className="mr-2 h-4 w-4" />
                Streaming
              </TabsTrigger>
            </Link>
          </TabsList>

          {/* Outlet for nested routes */}
          <Outlet />
        </Tabs>
      </div>
    </div>
  );
}
