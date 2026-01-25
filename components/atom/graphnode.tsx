import { GraphStructure } from "@/constants/graph";

type GraphNodeProps = {
  node: GraphStructure | string;
  depth?: number;
};

type DesktopNodeProps = {
  node: GraphStructure | string;
  path: string;
  activePath: string | null;
  setActivePath: (p: string | null) => void;
};

export function GraphNode({ node, depth = 0 }: GraphNodeProps) {
  const indentClass = depth > 0 ? "ml-4" : "";

  /* ---------- Leaf ---------- */
  if (typeof node === "string") {
    return (
      <div className={`relative ${indentClass}`}>
        <span className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm wrap-break-words">
          {node}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${indentClass}`}>
      {/* Node */}
      <span className="block w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm font-medium wrap-break-words">
        {node.title}
      </span>

      {/* Children */}
      {node.composed_of && (
        <div className="mt-3 flex flex-col gap-2 ml-4 border-l border-gray-300">
          {node.composed_of.map((child, i) => (
            <GraphNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DesktopGraphNode({
  node,
  path,
  activePath,
  setActivePath,
}: DesktopNodeProps) {
  const isActive = activePath !== null && activePath.startsWith(path);

  if (typeof node === "string") {
    return (
      <span
        onMouseEnter={() => setActivePath(path)}
        onMouseLeave={() => setActivePath(null)}
        className={`inline-block w-48 rounded-md border px-3 py-2 text-sm wrap-break-words transition-colors hover:cursor-pointer
          ${
            isActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-300 bg-white"
          }
        `}
      >
        {node}
      </span>
    );
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-6 items-center">
      {/* Parent */}
      <span
        onMouseEnter={() => setActivePath(path)}
        onMouseLeave={() => setActivePath(null)}
        className={`inline-block w-48 rounded-md border px-3 py-2 text-sm font-medium wrap-break-words transition-colors hover:cursor-pointer
          ${
            isActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-400 bg-white"
          }
        `}
      >
        {node.title}
      </span>

      {/* Children */}
      {node.composed_of && (
        <div className="relative grid auto-rows-max gap-y-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300" />

          {node.composed_of.map((child, i) => {
            const childPath = `${path}-${i}`;

            return (
              <div
                key={i}
                className="grid grid-cols-[1.5rem_auto] items-center"
                onMouseEnter={() => setActivePath(childPath)}
                onMouseLeave={() => setActivePath(null)}
              >
                <div className="h-0.5 bg-gray-300" />

                <DesktopGraphNode
                  node={child}
                  path={childPath}
                  activePath={activePath}
                  setActivePath={setActivePath}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
