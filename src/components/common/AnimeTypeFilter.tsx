// src/components/common/AnimeTypeFilter.tsx
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnimeTypeFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function AnimeTypeFilter({ value, onChange }: AnimeTypeFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <Filter className="mr-2 h-4 w-4" />
          {value ? `Type: ${value.toUpperCase()}` : "Tipe Anime"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Pilih Tipe
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange(undefined)}>
          Semua Tipe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("tv")}>
          TV Series
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("movie")}>
          Movie
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("ova")}>OVA</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("special")}>
          Special
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("ona")}>ONA</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
