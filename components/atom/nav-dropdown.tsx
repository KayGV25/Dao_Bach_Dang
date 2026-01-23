'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SlArrowDown } from "react-icons/sl";

interface DropdownTree {
  [label: string]: string | DropdownTree;
}

type DropdownValue = string | DropdownTree;

type DropdownData = Record<string, DropdownValue>;

export function DesktopDropdown({
  isOpen,
  data,
  onNavigate
}: {
  isOpen: boolean
  data: DropdownData
  onNavigate: () => void
}) {
  const [activePath, setActivePath] = useState<string[]>([]);

  function getLevelData(level: number): DropdownData | null {
    let current: DropdownValue = data;

    for (let i = 0; i < level; i++) {
      if (
        typeof current === 'object' &&
        activePath[i] &&
        typeof current[activePath[i]] === 'object'
      ) {
        current = current[activePath[i]];
      } else {
        return null;
      }
    }

    return typeof current === 'object' ? current : null;
  }

  const levels: DropdownData[] = [];
  let level = 0;

  while (true) {
    const levelData = getLevelData(level);
    if (!levelData) break;
    levels.push(levelData);
    level++;
  }

  return (
    <div className="hidden sm:block">
      <div
        className={`h-fit py-3 px-7 flex flex-row gap-6 w-full
          transition-transform duration-200 origin-top
          ${isOpen ? 'scale-y-100' : 'scale-y-0'}
        `}
      >
        {levels.map((levelData, levelIndex) => (
          <div key={levelIndex} className="flex flex-col gap-2 min-w-50">
            {Object.entries(levelData).map(([key, value]) => {
              const isObject = typeof value === 'object';

              const row = (
                <div
                  onMouseEnter={() => {
                    if (isObject) {
                      setActivePath(prev => {
                        const next = prev.slice(0, levelIndex);
                        next[levelIndex] = key;
                        return next;
                      });
                    } else {
                      setActivePath(prev => prev.slice(0, levelIndex));
                    }
                  }}
                  className="px-3 py-2 rounded hover:bg-zinc-100 cursor-pointer"
                >
                  {isObject ? (
                    <span className="font-medium">{key}</span>
                  ) : (
                    <span>{key}</span>
                  )}
                </div>
              );

              return typeof value === 'string' ? (
                <Link
                  key={key}
                  href={value}
                  className="block"
                  onClick={onNavigate}
                >
                  {row}
                </Link>
              ) : (
                <div key={key}>{row}</div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}


export function MobileDropdown({
  isOpen,
  data,
  level = 0,
  onNavigate,
}: {
  isOpen: boolean
  data: DropdownTree
  level?: number
  onNavigate: () => void
}) {
  // ✅ only ONE open item per level
  const [openKey, setOpenKey] = useState<string | null>(null)

  function toggle(key: string) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    <div className="block sm:hidden">
      <div
        className={`flex flex-col w-full origin-top overflow-hidden
          transition-all duration-200
          ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
        `}
      >
        {Object.entries(data).map(([label, value]) => {
          const isGroup = typeof value === 'object'
          const isExpanded = openKey === label

          const rowContent = (
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ paddingLeft: 16 + level * 16 }}
            >
              <span className="font-medium">{label}</span>

              {isGroup && (
                <SlArrowDown
                  className={`text-sm transition-transform duration-200
                    ${isExpanded ? 'rotate-180' : 'rotate-0'}
                  `}
                />
              )}
            </div>
          )

          return (
            <div key={label} className="w-full">
              {isGroup ? (
                <button
                  type="button"
                  onClick={() => toggle(label)}
                  className="w-full text-left hover:bg-zinc-100"
                >
                  {rowContent}
                </button>
              ) : (
                <Link
                  href={value}
                  onClick={onNavigate}
                  className="block w-full hover:bg-zinc-100"
                >
                  {rowContent}
                </Link>
              )}

              {isGroup && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded
                      ? 'max-h-250 opacity-100 scale-y-100'
                      : 'max-h-0 opacity-0 scale-y-95'}
                  `}
                >
                  <MobileDropdown
                    isOpen={isExpanded}
                    data={value}
                    level={level + 1}
                    onNavigate={onNavigate}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
