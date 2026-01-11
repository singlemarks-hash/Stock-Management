import { ChefHat, Coffee, Snowflake, Flower2, Sun, Leaf, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInventory } from "@/lib/inventory-context";
import type { Team, Season } from "@shared/schema";
import { teamLabels, seasonLabels, seasonMonths } from "@shared/schema";
import { cn } from "@/lib/utils";

const teamIcons: Record<Team, typeof ChefHat> = {
  kitchen: ChefHat,
  cafe: Coffee,
};

const seasonIcons: Record<Season, typeof Snowflake> = {
  winter: Snowflake,
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
};

const seasonColors: Record<Season, string> = {
  winter: "text-blue-500 dark:text-blue-400",
  spring: "text-pink-500 dark:text-pink-400",
  summer: "text-amber-500 dark:text-amber-400",
  fall: "text-orange-500 dark:text-orange-400",
};

const seasonBgColors: Record<Season, string> = {
  winter: "bg-blue-50 dark:bg-blue-950/30",
  spring: "bg-pink-50 dark:bg-pink-950/30",
  summer: "bg-amber-50 dark:bg-amber-950/30",
  fall: "bg-orange-50 dark:bg-orange-950/30",
};

export function AppSidebar() {
  const { selectedTeam, setSelectedTeam, selectedSeason, setSelectedSeason } = useInventory();

  const teams: Team[] = ["kitchen", "cafe"];
  const seasons: Season[] = ["winter", "spring", "summer", "fall"];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ChefHat className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold">식재료 관리</h1>
            <p className="text-xs text-muted-foreground">재고 관리 시스템</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-4">
            팀 선택
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((team) => {
                const Icon = teamIcons[team];
                const isSelected = selectedTeam === team;
                return (
                  <SidebarMenuItem key={team}>
                    <SidebarMenuButton
                      onClick={() => setSelectedTeam(team)}
                      className={cn(
                        "w-full justify-start gap-3",
                        isSelected && "bg-sidebar-accent"
                      )}
                      data-testid={`button-team-${team}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{teamLabels[team]}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-4">
            시즌 선택
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md border border-sidebar-border px-3 py-2 hover-elevate",
                    seasonBgColors[selectedSeason]
                  )}
                  data-testid="button-season-dropdown"
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = seasonIcons[selectedSeason];
                      return <Icon className={cn("h-4 w-4", seasonColors[selectedSeason])} />;
                    })()}
                    <span className="text-sm font-medium">{seasonLabels[selectedSeason].replace(" 시즌", "")}</span>
                    <span className="text-xs text-muted-foreground">{seasonMonths[selectedSeason]}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {seasons.map((season) => {
                  const Icon = seasonIcons[season];
                  return (
                    <DropdownMenuItem
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer",
                        selectedSeason === season && seasonBgColors[season]
                      )}
                      data-testid={`button-season-${season}`}
                    >
                      <Icon className={cn("h-4 w-4", seasonColors[season])} />
                      <span>{seasonLabels[season].replace(" 시즌", "")}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{seasonMonths[season]}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent className="px-4 py-2">
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                현재 선택: <span className="font-medium text-foreground">{teamLabels[selectedTeam]}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                시즌: <span className={cn("font-medium", seasonColors[selectedSeason])}>{seasonLabels[selectedSeason]}</span>
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
