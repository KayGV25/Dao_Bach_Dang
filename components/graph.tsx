'use client'
import { GraphStructure } from "@/constants/graph";
import { GraphNode, DesktopGraphNode } from "@/components/atom/graphnode";
import { useState } from "react";

type GraphProps = {
    data: GraphStructure;
};

export function HierarchyGraph({ data }: GraphProps) {
  const [activePath, setActivePath] = useState<string | null>(null);
  return (
    <div className="w-full px-4 py-6">
      {/* Mobile */}
      <div className="block md:hidden">
        <GraphNode node={data} />
      </div>

      {/* Desktop */}
      <div className="hidden mx-auto w-fit md:block">
        <DesktopGraphNode
          node={data}
          path="0"
          activePath={activePath}
          setActivePath={setActivePath}
        />
      </div>
    </div>
  );
}
