// src/components/common/AnimeStatusFilter.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnimeStatusFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function AnimeStatusFilter({ value, onChange }: AnimeStatusFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          {value ? `Status: ${value}` : "Status"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Pilih Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange(undefined)}>
          Semua Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("airing")}>
          Sedang Tayang
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("complete")}>
          Selesai
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("upcoming")}>
          Akan Datang
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
