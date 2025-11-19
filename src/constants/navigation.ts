// src/constants/navigation.ts
import { Home, Search, Tv, type LucideIcon } from 'lucide-react';

// Definisi tipe data agar TypeScript senang
export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

// Array data navigasi di-update berdasarkan routes
export const sidebarNavItems: NavItem[] = [
  {
    title: "Anime Populer", // Mengganti "All Anime" menjadi "Populer"
    href: "/",
    icon: Home,
  },
  {
    title: "Cari Anime",
    href: "/search",
    icon: Search,
  },
  {
    title: "Daftar Genre",
    href: "/genres/anime", // Sesuai dengan rute /genres/anime
    icon: Tv, // Menggunakan ikon Tv untuk Genre
  },
  // Untuk rute detail (/anime/:animeId) tidak perlu ditaruh di sidebar
];