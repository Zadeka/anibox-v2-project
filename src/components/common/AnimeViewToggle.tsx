// src/components/common/AnimeViewToggle.tsx
import { Grid3x3, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnimeViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function AnimeViewToggle({
  viewMode,
  onViewModeChange,
}: AnimeViewToggleProps) {
  return (
    <Tabs value={viewMode} onValueChange={(v) => onViewModeChange(v as any)}>
      <TabsList className="duration-300 animate-in fade-in">
        {/* 1. TabsTrigger untuk Grid View */}
        <TabsTrigger
          value="grid"
          className="font-semibold text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
        >
          <Grid3x3 className="mr-2 h-4 w-4" />
          Grid
        </TabsTrigger>

        {/* 2. TabsTrigger untuk List View */}
        <TabsTrigger
          value="list"
          className="font-semibold text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
        >
          <List className="mr-2 h-4 w-4" />
          List
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
