import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seasonal")({
  component: seasonalAnimePage,
});

function seasonalAnimePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Anime Musim Sekarang (Airing) 📺</h1>
      <p className="text-muted-foreground">Endpoint: /v4/seasons/now</p>
      {/* Di sini nanti akan diisi komponen daftar anime musim berjalan */}
    </div>
  );
}
