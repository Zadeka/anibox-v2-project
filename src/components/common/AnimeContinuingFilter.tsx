// src/components/common/AnimeContinuingFilter.tsx
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnimeContinuingFilterProps {
  value?: boolean;
  onChange: (value: boolean | undefined) => void;
}

export function AnimeContinuingFilter({
  value,
  onChange,
}: AnimeContinuingFilterProps) {
  const getLabel = () => {
    if (value === true) return "🔄 Continuing";
    if (value === false) return "🆕 New Series";
    return "Semua";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          {getLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Tipe Rilis
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange(undefined)}>
          📺 Semua Anime
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange(false)}>
          🆕 New Series (Baru)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange(true)}>
          🔄 Continuing (Lanjutan)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
