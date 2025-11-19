// src/components/Layout/Header.tsx
// ... (Import tetap sama seperti sebelumnya) ...
import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { sidebarNavItems } from '@/constants/navigation';

export function Header() {
  return (
    // PERUBAHAN PENTING DISINI:
    // 1. Hapus 'sm:h-auto'
    // 2. Tambahkan 'lg:h-[60px]' agar persis sama dengan tinggi logo Sidebar
    <header className="sticky top-0 z-30 flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 backdrop-blur sm:px-6">
      
      {/* ... (Sisa isi komponen Header sama persis seperti sebelumnya) ... */}
      
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">AniBox</span>
            </Link>
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex">
         <DynamicBreadcrumb />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
}

// ... (Komponen Helper DynamicBreadcrumb, ModeToggle, UserNav tetap sama) ...
function DynamicBreadcrumb() {
    const pathname = useLocation({ select: (location) => location.pathname });
    const pathSegments = pathname.split('/').filter(Boolean);
  
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const title = segment.charAt(0).toUpperCase() + segment.slice(1);
  
            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={href}>{title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  
  function ModeToggle() {
    const { setTheme, theme } = useTheme();
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
  
  function UserNav() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }