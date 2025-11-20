// src/components/common/AnimeSortFilter.tsx
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnimeSortFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function AnimeSortFilter({ value, onChange }: AnimeSortFilterProps) {
  const getSortLabel = (sortValue?: string) => {
    switch (sortValue) {
      case "score":
        return "Rating Tertinggi";
      case "popularity":
        return "Popularitas";
      case "favorites":
        return "Favorit";
      case "start_date":
        return "Tanggal Rilis";
      case "title":
        return "Judul (A-Z)";
      default:
        return "Urutkan";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {getSortLabel(value)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Urutkan Berdasarkan
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange(undefined)}>
          Default
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("score")}>
          Rating Tertinggi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("popularity")}>
          Popularitas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("favorites")}>
          Favorit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("start_date")}>
          Tanggal Rilis
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("title")}>
          Judul (A-Z)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
