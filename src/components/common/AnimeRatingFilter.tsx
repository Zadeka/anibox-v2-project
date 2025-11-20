// src/components/common/AnimeRatingFilter.tsx
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnimeRatingFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function AnimeRatingFilter({ value, onChange }: AnimeRatingFilterProps) {
  const getRatingLabel = (rating?: string) => {
    switch (rating) {
      case "g":
        return "G - Semua Umur";
      case "pg":
        return "PG - Anak-anak";
      case "pg13":
        return "PG-13 - Remaja";
      case "r":
        return "R - 17+";
      case "r+":
        return "R+ - Mild Nudity";
      case "rx":
        return "RX - Hentai";
      default:
        return "Rating";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <Shield className="mr-2 h-4 w-4" />
          {value ? getRatingLabel(value) : "Rating"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Pilih Rating
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange(undefined)}>
          Semua Rating
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("g")}>
          G - Semua Umur
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("pg")}>
          PG - Anak-anak
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("pg13")}>
          PG-13 - Remaja 13+
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("r")}>
          R - 17+ (Violence & Profanity)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("r+")}>
          R+ - Mild Nudity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
