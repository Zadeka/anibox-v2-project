# 🎬 AniBox v2

> Modern anime discovery platform built with React, TypeScript, and TanStack Router

AniBox adalah aplikasi web modern untuk menjelajahi, mencari, dan menemukan anime favorit Anda. Dibangun dengan teknologi terkini untuk performa optimal dan pengalaman pengguna yang menyenangkan.

## ✨ Fitur

- 🔍 **Pencarian Anime** - Cari anime berdasarkan judul, genre, dan kategori
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat (mobile, tablet, desktop)
- 🌓 **Dark/Light Mode** - Toggle tema sesuai preferensi dengan multiple color schemes
- 🎨 **Modern UI** - Komponen UI dari Shadcn/UI dengan Tailwind CSS
- ⚡ **Fast Navigation** - Routing cepat dengan TanStack Router
- 🎯 **Type-Safe** - Full TypeScript support untuk development yang lebih aman

## 🚀 Tech Stack

- **Frontend Framework:** React 19.2
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7.2
- **Routing:** TanStack Router v1.136
- **Styling:** Tailwind CSS v3.4
- **UI Components:** Shadcn/UI (Radix UI)
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Theme:** next-themes

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm atau yarn

### Setup

1. Clone repository

```bash
git clone <repository-url>
cd anibox-v2-project
```

2. Install dependencies

```bash
npm install
```

3. Jalankan development server

```bash
npm run dev
```

4. Buka browser di `http://localhost:5173`

## 🛠️ Available Scripts

```bash
npm run dev      # Jalankan development server
npm run build    # Build untuk production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
anibox-v2-project/
├── src/
│   ├── api/              # API integration & services
│   ├── components/       # React components
│   │   ├── common/       # Reusable components
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   └── ui/           # Shadcn UI components
│   ├── constants/        # Constants & configuration
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── routes/           # TanStack Router pages
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles & theme variables
├── public/               # Static assets
└── package.json
```

## 🎨 Theme Customization

AniBox mendukung dark/light mode dengan multiple color schemes. Theme dapat diubah melalui toggle button di header.

### Available Themes

- **Violet/Purple** - Elegan dan modern (default)
- **Ocean Blue** - Professional dan clean
- **Emerald Green** - Fresh dan energetic
- **Blue-Purple** - Futuristic gradient
- **Teal-Green** - Calm dan modern

Lihat `src/index.css` untuk kustomisasi CSS variables.

## 🗺️ Routes

| Route             | Description                   |
| ----------------- | ----------------------------- |
| `/`               | Halaman utama - Anime Populer |
| `/search`         | Pencarian anime               |
| `/genres/anime`   | Daftar genre anime            |
| `/anime/:animeId` | Detail anime                  |

## 🔧 Configuration

### Tailwind Config

Konfigurasi Tailwind CSS ada di `tailwind.config.js` dengan custom color scheme dan plugins.

### TypeScript Config

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - App-specific config
- `tsconfig.node.json` - Node-specific config

### Vite Config

`vite.config.ts` sudah dikonfigurasi dengan:

- React plugin
- TanStack Router plugin
- Path aliases (`@/`)

## 🎯 Development Guidelines

### Code Style

- Gunakan TypeScript untuk type safety
- Follow ESLint rules yang sudah dikonfigurasi
- Gunakan Prettier untuk code formatting
- Gunakan komponen Shadcn/UI untuk konsistensi

### Component Guidelines

- Pisahkan logic dari presentational components
- Gunakan custom hooks untuk reusable logic
- Implement proper TypeScript types/interfaces
- Follow React best practices

## 📝 License

Private project - All rights reserved

## 🤝 Contributing

Ini adalah project private. Untuk kontribusi, silakan hubungi maintainer.

---

**Built with ❤️ using React + TypeScript + Vite**
