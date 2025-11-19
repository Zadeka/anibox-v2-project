import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/upcoming')({
  component: upComingAnimePage,
})

function upComingAnimePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Anime Musim Mendatang 🗓️</h1>
      <p className="text-muted-foreground">Endpoint: /v4/seasons/upcoming</p>
      {/* Di sini nanti akan diisi komponen daftar anime musim yang akan datang */}
    </div>
  );
}
