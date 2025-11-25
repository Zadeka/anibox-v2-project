import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimeStreaming } from "@/api/anime.api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/anime/$animeId/streaming")({
  component: StreamingPage,
});

function StreamingPage() {
  const { animeId } = Route.useParams();
  const [streaming, setStreaming] = useState<{ name: string; url: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreaming = async () => {
      setLoading(true);
      try {
        const response = await getAnimeStreaming(Number(animeId));
        setStreaming(response.data);
      } catch (error) {
        console.error("Error fetching streaming:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreaming();
  }, [animeId]);

  if (loading) {
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary dark:text-white">
        Streaming Platforms
      </h2>
      {streaming.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {streaming.map((stream, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary dark:text-white">
                    {stream.name}
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={stream.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 text-primary transition-colors group-hover:text-white dark:text-white dark:group-hover:text-white" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No streaming links available
        </p>
      )}
    </div>
  );
}
