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
          className="bg-primary text-white backdrop-blur-sm hover:border-2 hover:border-primary hover:bg-secondary/70 hover:text-primary"
        >
          {value ? `Status: ${value}` : "Status"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Pilih Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onChange(undefined)}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Semua Status
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("airing")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Sedang Tayang
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("complete")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Selesai
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("upcoming")}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          Akan Datang
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
