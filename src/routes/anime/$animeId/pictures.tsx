import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimePictures } from "@/api/anime.api";
import type { ImageFormat } from "@/types/anime.type";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/anime/$animeId/pictures")({
  component: PicturesPage,
});

function PicturesPage() {
  const { animeId } = Route.useParams();
  const [pictures, setPictures] = useState<{ jpg: ImageFormat }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPictures = async () => {
      setLoading(true);
      try {
        const response = await getAnimePictures(Number(animeId));
        setPictures(response.data);
      } catch (error) {
        console.error("Error fetching pictures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, [animeId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary dark:text-white">Pictures</h2>
      {pictures.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {pictures.map((pic, index) => (
            <img
              key={index}
              src={pic.jpg.image_url}
              alt={`Picture ${index + 1}`}
              className="h-64 w-full rounded-lg object-cover shadow-md"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No pictures available
        </p>
      )}
    </div>
  );
}
