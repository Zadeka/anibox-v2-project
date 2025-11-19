import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anime/$animeId/characters')({
  component: charactersAnimePage,
})

function charactersAnimePage() {
  return <p>Halaman Characters: /characters</p>;
}
