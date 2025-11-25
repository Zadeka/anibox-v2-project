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
          className="bg-primary text-white backdrop-blur-sm hover:border-2 hover:border-primary hover:bg-secondary/70 hover:text-primary"
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
        <DropdownMenuItem
          onClick={() => onChange(undefined)}
          className="cursor-pointer transition-colors duration-200 focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:focus:bg-primary dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Semua Tipe
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("tv")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          TV Series
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("movie")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Movie
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("ova")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          OVA
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("special")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Special
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("ona")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          ONA
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
