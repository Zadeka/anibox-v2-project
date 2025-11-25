import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimeCharacters } from "@/api/anime.api";
import type { Character } from "@/types/anime.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/anime/$animeId/characters")({
  component: CharactersPage,
});

function CharactersPage() {
  const { animeId } = Route.useParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const getRoleColorClass = (role: string) => {
    // Ubah input menjadi huruf kecil untuk perbandingan yang konsisten
    const normalizedRole = role.toLowerCase();

    switch (normalizedRole) {
      case "main":
        // Warna untuk Main Character
        return "bg-green-500 text-white hover:bg-green-600 border-green-700";
      case "supporting":
        // Warna untuk Supporting Character
        return "bg-sky-500 text-white hover:bg-sky-600 border-sky-700";
      default:
        // Warna Default
        return "bg-gray-400 text-gray-800 hover:bg-gray-500 border-gray-600";
    }
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await getAnimeCharacters(Number(animeId));
        setCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [animeId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary dark:text-white">
        Characters
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {characters.map((char) => (
          <Card
            key={char.character.mal_id}
            className="overflow-hidden bg-primary/20 dark:bg-purple-900/50"
          >
            <img
              src={char.character.images.jpg.image_url}
              alt={char.character.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-3">
              <p className="truncate text-sm font-semibold">
                {char.character.name}
              </p>
              <Badge
                className={`mt-1 text-xs ${getRoleColorClass(char.role)}`}
              >
                {char.role}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
