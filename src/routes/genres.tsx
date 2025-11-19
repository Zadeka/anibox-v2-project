import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/genres")({
  component: genresAnimePage,
});

function genresAnimePage() {
  return (
    <div className="p-6">
      <h1>Daftar Genre Anime 🎭</h1>
      <p className="text-muted-foreground">Endpoint: /v4/genres/anime</p>
    </div>
  );
}