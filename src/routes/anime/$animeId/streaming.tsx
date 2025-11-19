import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/anime/$animeId/streaming")({
  component: streamingAnimePage,
});

function streamingAnimePage() {
  return <p>Halaman Streaming: /streaming</p>;
}
