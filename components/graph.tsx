'use client'
import { GraphStructure } from "@/constants/graph";
import { GraphNode, DesktopGraphNode, GraphCard } from "@/components/atom/graphnode";
import { useState } from "react";

type GraphProps = {
    data: GraphStructure;
    data_secondary?: Array<Array<GraphStructure>>;
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

export function TitleGraph({ data, data_secondary }: GraphProps) {
  const children = data.composed_of ?? []

  return (
    <div className="w-full overflow-x-auto py-10">
      <div className="mx-auto flex flex-col items-center gap-12 min-w-full">

        {/* ===== Graph (VERTICAL) ===== */}
        <div className="flex flex-col items-center">

          {/* Root */}
          <GraphCard
            title={data.title}
            img={data.img}
            name={data.name}
          />

          {/* Connector down */}
          {children.length > 0 && (
            <>
              <div className="h-8 w-0.5 bg-primary" />

              {/* Children container */}
              <div className="relative flex gap-8">

                {/* Horizontal spine */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />

                {children.map((child, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Vertical connector */}
                    <div className="h-6 w-0.5 bg-primary" />

                    {typeof child === "string" ? (
                      <GraphCard title={child} />
                    ) : (
                      <GraphCard
                        title={child.title}
                        img={child.img}
                        name={child.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ===== Secondary block (NOT a graph) ===== */}
        {data_secondary && data_secondary.length > 0 && (
          <div className="flex flex-col gap-6">
            {data_secondary.map((child, i) => (
              <div className="flex flex-wrap justify-center gap-6 max-w-5xl" key={i}>
                {child.map((item, j) => (
                  <GraphCard
                    key={j}
                    title={item.title}
                    img={item.img}
                    name={item.name}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
