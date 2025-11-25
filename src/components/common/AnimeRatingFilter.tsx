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
          className="bg-primary text-white backdrop-blur-sm hover:border- hover:border-primary hover:bg-secondary/70 hover:text-primary"
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
        <DropdownMenuItem
          onClick={() => onChange(undefined)}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Semua Rating
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("g")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          G - Semua Umur
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("pg")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          PG - Anak-anak
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("pg13")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          PG-13 - Remaja 13+
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("r")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          R - 17+ (Violence & Profanity)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("r+")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          R+ - Mild Nudity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
