import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimeThemes } from "@/api/anime.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Music } from "lucide-react";

export const Route = createFileRoute("/anime/$animeId/themes")({
  component: ThemesPage,
});

function ThemesPage() {
  const { animeId } = Route.useParams();
  const [themes, setThemes] = useState<{
    openings: string[];
    endings: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const response = await getAnimeThemes(Number(animeId));
        setThemes(response.data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, [animeId]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary dark:text-white">
        Themes
      </h2>
      {themes ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary dark:text-white" />
                <p className="text-primary dark:text-white">Opening Themes</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {themes.openings.length > 0 ? (
                <ol className="list-inside list-decimal space-y-2">
                  {themes.openings.map((op, index) => (
                    <li key={index} className="text-sm font-medium">
                      {op}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No opening themes
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary dark:text-white" />
                <p className="text-primary dark:text-white">Ending Themes</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {themes.endings.length > 0 ? (
                <ol className="list-inside list-decimal space-y-2">
                  {themes.endings.map((ed, index) => (
                    <li key={index} className="text-sm font-medium">
                      {ed}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No ending themes
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No theme data available
        </p>
      )}
    </div>
  );
}
