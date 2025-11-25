// src/components/common/AnimeContinuingFilter.tsx
import {
  BadgePlusIcon,
  PlayCircle,
  StepForwardIcon,
  TvIcon,
} from "lucide-react";
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
    if (value === true)
      return (
        <>
          <BadgePlusIcon className="mr-2 h-4 w-4" /> Continuing
        </>
      );
    if (value === false)
      return (
        <>
          <StepForwardIcon className="mr-2 h-4 w-4" />
          New Series
        </>
      );
    return <><PlayCircle className="mr-2 h-4 w-4" /> Semua</>;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary text-white backdrop-blur-sm hover:border-2 hover:border-primary hover:bg-secondary/70 hover:text-primary"
        >
          {getLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Tipe Rilis
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onChange(undefined)}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          <TvIcon className="mr-2 h-4 w-4" />
          Semua Anime
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange(false)}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          <BadgePlusIcon className="mr-2 h-4 w-4" />
          New Series (Baru)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange(true)}
          className="cursor-pointer focus:bg-primary data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground dark:data-[highlighted]:bg-primary dark:data-[highlighted]:text-primary-foreground"
        >
          <StepForwardIcon className="mr-2 h-4 w-4" />
          Continuing (Lanjutan)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
