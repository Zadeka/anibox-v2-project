import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topAnime')({
  component: topAnimePage,
})

function topAnimePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Anime Top Ranking Sepanjang Masa 🏆
      </h1>
      <p className="text-muted-foreground">Endpoint: /v4/top/anime</p>
      {/* Di sini nanti akan diisi komponen daftar anime terbaik */}
    </div>
  );
}
