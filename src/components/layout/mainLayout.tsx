import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function MainLayout() {
  return (
    <div className="bg-muted/40 flex min-h-screen w-full flex-col md:flex-row">
      {/* SIDEBAR (Kiri) */}
      <Sidebar />

      {/* KONTEN UTAMA (Kanan) */}
      {/* PERBAIKAN: 
          Saya menghapus 'sm:py-4' dan 'sm:gap-4' dari div di bawah ini.
          Sekarang Header akan menempel sempurna di bagian atas.
      */}
      <div className="flex w-full flex-col">
        {/* HEADER (Atas) */}
        <Header />

        {/* HALAMAN (Isi) */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
          {/* Outlet adalah tempat halaman (Home, Search, dll) muncul */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
