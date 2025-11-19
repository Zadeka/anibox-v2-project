// src/routes/__root.tsx
import { createRootRoute } from "@tanstack/react-router";
import { MainLayout } from "@/components/layout//mainLayout"; // Import layout yang baru

export const Route = createRootRoute({
  component: MainLayout, // Gunakan MainLayout di sini
});
