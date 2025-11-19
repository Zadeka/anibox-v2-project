import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anime/$animeId/pictures')({
  component: picturesAnimePage,
})

function picturesAnimePage() {
  return <p>Halaman Pictures: /pictures</p>;
}
