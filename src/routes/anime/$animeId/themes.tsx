import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/anime/$animeId/themes")({
  component: themesAnimePage,
});

function themesAnimePage() {
  return <p>Halaman Themes (OP/ED): /themes</p>;
}
