// 1. src/routes/index.tsx (GET All Anime)
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="p-6">
      <h1>Daftar Semua Anime 🍿</h1>
      <p className="text-muted-foreground">Endpoint: /v4/anime</p>
    </div>
  ),
});