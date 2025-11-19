import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schedules")({
  component: schedulesAnimePage,
});

function schedulesAnimePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Jadwal Rilis Anime Mingguan 📅</h1>
      <p className="text-muted-foreground">Endpoint: /v4/schedules</p>
      {/* Di sini nanti akan diisi komponen kalender jadwal rilis */}
    </div>
  );
}
