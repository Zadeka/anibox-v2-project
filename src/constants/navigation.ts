// src/constants/navigation.ts
import {
  Home,
  Search,
  Tv,
  Monitor,
  CalendarClock,
  Trophy,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Cari Anime",
    href: "/search",
    icon: Search,
  },
  {
    title: "Musim Sekarang",
    href: "/seasonal",
    icon: Monitor,
  },
  {
    title: "Musim Mendatang",
    href: "/upcoming",
    icon: CalendarClock,
  },
  {
    title: "Top Ranking",
    href: "/top-anime",
    icon: Trophy,
  },
  {
    title: "Jadwal Rilis",
    href: "/schedules",
    icon: CalendarDays,
  },
  {
    title: "Daftar Genre",
    href: "/genres",
    icon: Tv,
  },
];
