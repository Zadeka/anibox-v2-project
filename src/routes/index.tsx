import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getAllAnime,
  getTopAnime,
  getSeasonalAnime,
  getUpcomingAnime,
} from "@/api/anime.api";
import type { AnimeItem } from "@/types/anime.type";
import { AnimeCardGrid } from "@/components/common/AnimeCardGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  Play,
  Star,
  Film,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeAnimePage,
});

interface AnimeSection {
  title: string;
  data: AnimeItem[];
  loading: boolean;
  icon: React.ReactNode;
  viewAllLink: string;
  totalItems: number;
}

function HomeAnimePage() {
  const [sections, setSections] = useState<{
    allAnime: AnimeSection;
    seasonal: AnimeSection;
    upcoming: AnimeSection;
    topRated: AnimeSection;
  }>({
    allAnime: {
      title: "All Anime",
      data: [],
      loading: true,
      icon: <Film className="h-5 w-5" />,
      viewAllLink: "/search",
      totalItems: 0,
    },
    seasonal: {
      title: "This Season",
      data: [],
      loading: true,
      icon: <Play className="h-5 w-5" />,
      viewAllLink: "/seasonal",
      totalItems: 0,
    },
    upcoming: {
      title: "Upcoming Season",
      data: [],
      loading: true,
      icon: <Clock className="h-5 w-5" />,
      viewAllLink: "/upcoming",
      totalItems: 0,
    },
    topRated: {
      title: "Top Rated",
      data: [],
      loading: true,
      icon: <Star className="h-5 w-5" />,
      viewAllLink: "/top-anime",
      totalItems: 0,
    },
  });

  useEffect(() => {
    // Fetch data secara bertahap dengan delay untuk menghindari rate limit
    const fetchDataSequentially = async () => {
      try {
        // 1. Fetch All Anime (delay 0ms - langsung)
        const allAnimeResponse = await getAllAnime(1, { limit: 10 });
        setSections((prev) => ({
          ...prev,
          allAnime: {
            ...prev.allAnime,
            data: allAnimeResponse.data.slice(0, 10),
            totalItems: allAnimeResponse.pagination.items.total,
            loading: false,
          },
        }));

        // Delay 1 detik
        await delay(1000);

        // 2. Fetch Seasonal Anime
        const seasonalResponse = await getSeasonalAnime(1, { limit: 10 });
        setSections((prev) => ({
          ...prev,
          seasonal: {
            ...prev.seasonal,
            data: seasonalResponse.data.slice(0, 10),
            totalItems: seasonalResponse.pagination.items.total,
            loading: false,
          },
        }));

        // Delay 1 detik
        await delay(1000);

        // 3. Fetch Upcoming Anime
        const upcomingResponse = await getUpcomingAnime(1, { limit: 10 });
        setSections((prev) => ({
          ...prev,
          upcoming: {
            ...prev.upcoming,
            data: upcomingResponse.data.slice(0, 10),
            totalItems: upcomingResponse.pagination.items.total,
            loading: false,
          },
        }));

        // Delay 1 detik
        await delay(1000);

        // 4. Fetch Top Rated Anime
        const topRatedResponse = await getTopAnime(1, {
          limit: 10,
          filter: "bypopularity",
        });
        setSections((prev) => ({
          ...prev,
          topRated: {
            ...prev.topRated,
            data: topRatedResponse.data.slice(0, 10),
            totalItems: topRatedResponse.pagination.items.total,
            loading: false,
          },
        }));
      } catch (error) {
        console.error("Error fetching anime data:", error);
        // Set semua loading ke false jika terjadi error
        setSections((prev) => ({
          allAnime: { ...prev.allAnime, loading: false },
          seasonal: { ...prev.seasonal, loading: false },
          upcoming: { ...prev.upcoming, loading: false },
          topRated: { ...prev.topRated, loading: false },
        }));
      }
    };

    fetchDataSequentially();
  }, []);

  // Helper function untuk delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Discover Anime</h1>
              <p className="text-muted-foreground">
                Explore the best anime from around the world
              </p>
            </div>
            <Calendar className="h-12 w-12 text-primary" />
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All Anime</CardTitle>
                <Film className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sections.allAnime.loading
                    ? "..."
                    : sections.allAnime.totalItems.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total anime available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Season
                </CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sections.seasonal.loading
                    ? "..."
                    : sections.seasonal.totalItems.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently airing
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Season
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sections.upcoming.loading
                    ? "..."
                    : sections.upcoming.totalItems.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sections.topRated.loading
                    ? "..."
                    : sections.topRated.totalItems.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Highest scores</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Anime Section */}
        <AnimeSection
          title={sections.allAnime.title}
          icon={sections.allAnime.icon}
          data={sections.allAnime.data}
          loading={sections.allAnime.loading}
          viewAllLink={sections.allAnime.viewAllLink}
        />

        {/* Seasonal Anime Section */}
        <AnimeSection
          title={sections.seasonal.title}
          icon={sections.seasonal.icon}
          data={sections.seasonal.data}
          loading={sections.seasonal.loading}
          viewAllLink={sections.seasonal.viewAllLink}
        />

        {/* Upcoming Anime Section */}
        <AnimeSection
          title={sections.upcoming.title}
          icon={sections.upcoming.icon}
          data={sections.upcoming.data}
          loading={sections.upcoming.loading}
          viewAllLink={sections.upcoming.viewAllLink}
        />

        {/* Top Rated Anime Section */}
        <AnimeSection
          title={sections.topRated.title}
          icon={sections.topRated.icon}
          data={sections.topRated.data}
          loading={sections.topRated.loading}
          viewAllLink={sections.topRated.viewAllLink}
        />
      </div>
    </div>
  );
}

interface AnimeSectionProps {
  title: string;
  icon: React.ReactNode;
  data: AnimeItem[];
  loading: boolean;
  viewAllLink: string;
}

function AnimeSection({
  title,
  icon,
  data,
  loading,
  viewAllLink,
}: AnimeSectionProps) {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Link to={viewAllLink}>
          <Button variant="ghost">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Section Content */}
      {loading ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((anime) => (
            <AnimeCardGrid key={anime.mal_id} anime={anime} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No anime found</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
