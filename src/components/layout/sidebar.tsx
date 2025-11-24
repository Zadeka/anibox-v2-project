// src/components/Layout/Sidebar.tsx
import { Link } from "@tanstack/react-router";
// Pastikan import data sudah benar
import { sidebarNavItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen border-r bg-muted/40 md:block md:w-64 lg:w-72">
      {/* Bagian Logo / Header Sidebar - Disesuaikan tingginya */}
      <div className="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center justify-center gap-2 text-xl font-bold">
          <span className="text-primary">AniBox</span>
        </Link>
      </div>

      {/* Bagian Menu Navigasi */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              // Gunakan TanStack Router untuk mendapatkan state aktif
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                "[&.active]:bg-primary/10 [&.active]:text-primary",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
