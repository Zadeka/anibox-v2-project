// 2. src/routes/anime/$animeId.tsx (GET Anime By ID - Parent Route)
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/anime/$animeId")({
  component: AnimeDetailPage,
});

function AnimeDetailPage() {
  const { animeId } = Route.useParams();

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Detail Anime ID: {animeId}</h1>
      <p className="text-muted-foreground mb-6">
        Endpoint Utama: /v4/anime/{"{id}"}
      </p>

      {/* Outlet adalah tempat sub-rute (Episodes, Pictures, dll) akan di-render */}
      <div className="bg-card rounded-lg border p-4">
        <h2 className="mb-2 text-lg font-semibold">Konten Sub-Page:</h2>
        <Outlet />
      </div>
    </div>
  );
}
