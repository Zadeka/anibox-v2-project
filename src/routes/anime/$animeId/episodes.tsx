import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anime/$animeId/episodes')({
  component: episodesAnimePage,
})

function episodesAnimePage() {
  return <p>Halaman Episodes: /episodes?page=...</p>;
}
