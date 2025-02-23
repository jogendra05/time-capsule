import { motion } from "framer-motion";
import { useState } from "react";
import { CapsuleCard } from "@/components/capsule-card";
import { GradientWrapper } from "@/components/gradient-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, Search, SlidersHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockCapsules } from "@/lib/mock-data";
import type { Capsule } from "@shared/schema";

type FilterType = "all" | "locked" | "unlocked";
type SortType = "newest" | "oldest" | "opening-soon";

const getPosition = (index: number) => {
  return index % 2 === 0 ? "left" : "right";
};

const ConnectorLine = ({ from }: { from: "left" | "right" }) => {
  const isLeft = from === "left";
  const pathD = isLeft 
    ? "M50 0 Q 75 50 100 100"
    : "M50 0 Q 25 50 0 100";

  return (
    <svg
      className="absolute left-1/2 -bottom-[40px] z-0 h-[40px] w-full -translate-x-1/2 transform"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={pathD}
        className="stroke-muted-foreground/40"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [search, setSearch] = useState("");

  const filterCapsules = (capsules: Capsule[]) => {
    let filtered = capsules;

    if (search) {
      filtered = filtered.filter(
        (capsule) =>
          capsule.title.toLowerCase().includes(search.toLowerCase()) ||
          capsule.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "locked") {
      filtered = filtered.filter(
        (capsule) => new Date(capsule.openDate) > new Date()
      );
    } else if (filter === "unlocked") {
      filtered = filtered.filter(
        (capsule) => new Date(capsule.openDate) <= new Date()
      );
    }

    return filtered.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sort === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return (
          new Date(a.openDate).getTime() - new Date(b.openDate).getTime()
        );
      }
    });
  };

  const filteredCapsules = filterCapsules(mockCapsules);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50/50">
      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <GradientWrapper className="p-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Memory Timeline</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Journey through time with our collection of digital memories. Discover
              stories, milestones, and shared experiences preserved for the future.
            </p>
          </motion.div>
        </GradientWrapper>

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search capsules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Select
                      value={filter}
                      onValueChange={(value: FilterType) => setFilter(value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Capsules</SelectItem>
                        <SelectItem value="locked">Locked</SelectItem>
                        <SelectItem value="unlocked">Unlocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter capsules by status</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Select
                      value={sort}
                      onValueChange={(value: SortType) => setSort(value)}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="opening-soon">Opening Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sort capsules by date</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            <div className="flex gap-2">
              {filter !== "all" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="h-6 px-2 text-xs"
                >
                  {filter}
                  <span className="ml-1">×</span>
                </Button>
              )}
              {search && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearch("")}
                  className="h-6 px-2 text-xs"
                >
                  "{search}"
                  <span className="ml-1">×</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Alternating Timeline Layout */}
        {filteredCapsules.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative flex flex-col items-center space-y-8">
              {filteredCapsules.map((capsule, index) => {
                const position = getPosition(index);
                const alignment = position === "left" 
                  ? "self-start mr-auto" 
                  : "self-end ml-auto";

                return (
                  <div key={capsule.id} className={`relative z-10 w-full md:w-1/2 ${alignment}`}>
                    <CapsuleCard
                      capsule={capsule}
                      index={index}
                      className="relative bg-background hover:z-20 w-full max-w-[500px]"
                    />
                    {index !== filteredCapsules.length - 1 && (
                      <ConnectorLine from={position} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No capsules found</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
