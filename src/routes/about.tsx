// src/routes/about.tsx

import { createFileRoute } from "@tanstack/react-router";
import { Code, Users, MonitorCog } from "lucide-react"; // Ikon baru untuk programmer

// WAJIB: Definisi rute untuk /about
export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="flex mb-6 border-b-2 border-primary pb-2 text-4xl font-extrabold text-primary items-center">
        AniBox: Code, Community, and Creativity <MonitorCog className="ml-6 h-10 w-10 text-primary" />
      </h1>

      {/* Bagian Visi & Misi (Untuk Semua) */}
      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-foreground">
          Jembatan Antara Hobi dan Teknologi
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          <strong className="text-primary">AniBox</strong> adalah perwujudan
          dari fusi antara kecintaan pada budaya animasi Jepang dan dedikasi
          pada kode yang bersih dan efisien. Kami membangun platform ini untuk
          menyediakan akses data anime yang cepat, akurat, dan dirancang dengan
          estetika yang menghargai penggemar.
        </p>
      </section>

      {/* Grid Fokus Audiens */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Kolom 1: Untuk Komunitas Anime (User) */}
        <section className="rounded-xl bg-secondary/70 p-6 shadow-lg">
          <Users className="mb-3 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Fokus Utama: Pengalaman Penggemar
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Target utama kami adalah kenyamanan Anda. Kami menyajikan data dari
            Jikan API dengan tata letak yang intuitif, *filtering* yang
            responsif, dan *layout* yang mulus. AniBox adalah alat bantu andalan
            Anda untuk melacak jadwal rilis, mendalami detail karakter, dan
            bernavigasi tanpa *lag*.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 pl-4 text-sm text-muted-foreground">
            <li>Navigasi cepat tanpa *loading* ulang halaman penuh.</li>
            <li>*Dark/Light Mode* yang nyaman.</li>
            <li>Akses mudah ke detail produksi dan media.</li>
          </ul>
        </section>

        {/* Kolom 2: Untuk Komunitas Programmer (Developer) */}
        <section className="rounded-xl bg-secondary/70 p-6 shadow-lg">
          <Code className="mb-3 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Built for Scale: Fondasi Teknis
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Kami berkomitmen pada *best practice* dan *type safety*. Proyek ini
            dibangun di atas tumpuan teknologi modern yang bisa diandalkan dan
            diperluas:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 pl-4 text-sm text-muted-foreground">
            <li>
              <strong className="text-primary">Vite + TypeScript:</strong> Untuk
              kecepatan dan keamanan tipe.
            </li>
            <li>
              <strong className="text-primary">TanStack Router:</strong> Untuk
              *routing* berbasis file dan *type-safe* yang efisien.
            </li>
            <li>
              <strong className="text-primary">Tailwind + Shadcn:</strong> Untuk
              desain yang responsif dan mudah dikustomisasi.
            </li>
            <li>
              <strong className="text-primary">Axios + Jikan API:</strong> Untuk
              koneksi data yang terstruktur.
            </li>
          </ul>
          <p className="mt-3 text-sm font-semibold text-primary/80">
            Kami menyambut saran dan *insight* teknis dari sesama *developer*!
          </p>
        </section>
      </div>

      <hr className="my-10" />

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-bold text-foreground">
          Berbasis Komunitas, Didukung Data
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Kami menyadari bahwa kekuatan dunia anime terletak pada **semangat
          kolektif para penggemarnya**. Meskipun AniBox dikembangkan dengan
          fondasi data yang solid, semangat kami diarahkan untuk melayani dan
          memberdayakan komunitas:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-primary">Pendekatan User-Centric:</strong>{" "}
            Desain dan fitur kami terus dikembangkan dengan mempertimbangkan
            kemudahan navigasi dan pengalaman pengguna yang menyenangkan.
          </li>
          <li>
            <strong className="text-primary">
              Eksplorasi yang Terpersonalisasi:
            </strong>{" "}
            Kami bertujuan agar setiap pengguna merasa seperti sedang membuka
            "kotak" yang dibuat khusus untuk selera mereka.
          </li>
          <li>
            <strong className="text-primary">Transparansi Informasi:</strong>{" "}
            Kami berkomitmen menyajikan data yang seakurat mungkin, mulai dari
            detail produksi hingga detail karakter minor.
          </li>
        </ul>
      </section>

      <hr className="my-10" />

      {/* Penutup */}
      <section>
        <h2 className="mb-3 text-2xl font-bold text-foreground">
          Isi Konten yang Dapat Anda Akses
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Sebagai gudang data yang komprehensif, AniBox menyediakan beberapa
          kategori informasi inti:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-secondary/60 p-4 shadow-inner">
            <h3 className="text-lg font-semibold text-primary">
              Detail Teknis dan Produksi
            </h3>
            <p className="text-sm text-muted-foreground">
              Informasi studio, sutradara, format penayangan (TV, Movie, OVA,
              ONA), dan sumber adaptasi.
            </p>
          </div>
          <div className="rounded-lg bg-secondary/60 p-4 shadow-inner">
            <h3 className="text-lg font-semibold text-primary">
              Daftar Karakter & Peran
            </h3>
            <p className="text-sm text-muted-foreground">
              Basis data karakter lengkap, klasifikasi peran (Main, Supporting),
              dan informasi Seiyuu (pengisi suara).
            </p>
          </div>
          <div className="rounded-lg bg-secondary/60 p-4 shadow-inner">
            <h3 className="text-lg font-semibold text-primary">
              Media Pendukung
            </h3>
            <p className="text-sm text-muted-foreground">
              Data visual, *trailer* resmi, dan daftar lagu tema (Opening &
              Ending) yang terkait.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
