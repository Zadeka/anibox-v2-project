// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// 1. Import ThemeProvider yang baru dibuat
import { ThemeProvider } from "./components/theme-provider";

// Import routeTree
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* 2. BUNGKUS RouterProvider DENGAN ThemeProvider */}
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
