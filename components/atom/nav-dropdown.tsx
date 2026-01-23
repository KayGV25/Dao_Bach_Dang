'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'

type DropdownLeaf = string

interface DropdownNavigableGroup {
  default: string
  [label: string]: DropdownValue
}

interface DropdownContainerGroup {
  [label: string]: DropdownValue
}

type DropdownValue =
  | DropdownLeaf
  | DropdownNavigableGroup
  | DropdownContainerGroup

export type DropdownData = Record<string, DropdownValue>

function isGroup(value: DropdownValue): value is Record<string, DropdownValue> {
  return typeof value === 'object'
}

function getChildren(
  group: Record<string, DropdownValue>
): [string, DropdownValue][] {
  return Object.entries(group).filter(([k]) => k !== 'default')
}

function getDefaultPath(value: DropdownValue): string | null {
  if (typeof value === 'object' && value !== null && 'default' in value) {
    return (value as { default: string }).default
  }
  return null
}

function resolveHref(
  value: DropdownValue,
  basePath: string
): string {
  if (typeof value === 'string') {
    return basePath + value
  }

  const def = getDefaultPath(value)
  if (def) {
    return basePath + def
  }

  return '/'
}

export function DesktopDropdown({
  isOpen,
  data,
  onNavigate
}: {
  isOpen: boolean
  data: DropdownData
  onNavigate: () => void
}) {
  const [activePath, setActivePath] = useState<string[]>([])

  function getLevelData(level: number): DropdownData | null {
    let current: DropdownValue = data

    for (let i = 0; i < level; i++) {
      if (
        isGroup(current) &&
        activePath[i] &&
        isGroup(current[activePath[i]])
      ) {
        current = current[activePath[i]]
      } else {
        return null
      }
    }

    return isGroup(current) ? current : null
  }

  function getBasePath(level: number): string {
    let current: DropdownValue = data
    let path = ''

    for (let i = 0; i < level; i++) {
      if (
        isGroup(current) &&
        activePath[i] &&
        isGroup(current[activePath[i]])
      ) {
        const next: DropdownValue = current[activePath[i]]
        const def = getDefaultPath(next)
        if (def) path += def
        current = next
      }
    }

    return path
  }

  const levels: DropdownData[] = []
  let level = 0

  while (true) {
    const levelData = getLevelData(level)
    if (!levelData) break
    levels.push(levelData)
    level++
  }

  return (
    <div className="hidden sm:block">
      <div
        className={`py-3 px-7 flex origin-top transition-transform duration-200
          ${isOpen ? 'scale-y-100' : 'scale-y-0'}
        `}
      >
        {levels.map((levelData, levelIndex) => (
          <div
            key={levelIndex}
            className={`flex flex-col min-w-50 gap-2 ${
              levelIndex > 0 ? 'border-l-2' : ''
            }`}
          >
            {Object.entries(levelData)
              .filter(([key]) => key !== 'default')
              .map(([label, value]) => {
                const group = isGroup(value)
                const basePath = getBasePath(levelIndex)
                const href = resolveHref(value, basePath)

                const row = (
                  <div
                    onMouseEnter={() => {
                      if (group) {
                        setActivePath(prev => {
                          const next = prev.slice(0, levelIndex)
                          next[levelIndex] = label
                          return next
                        })
                      } else {
                        setActivePath(prev => prev.slice(0, levelIndex))
                      }
                    }}
                    className="px-3 py-2 rounded hover:bg-zinc-100 cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-medium">{label}</span>
                    {group && <SlArrowDown className="text-xs -rotate-90" />}
                  </div>
                )

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={onNavigate}
                    className="block"
                  >
                    {row}
                  </Link>
                )
              })}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MobileDropdown({
  isOpen,
  data,
  level = 0,
  onNavigate,
  basePath = '',
}: {
  isOpen: boolean
  data: DropdownData
  level?: number
  onNavigate: () => void
  basePath?: string
}) {
  const [openKey, setOpenKey] = useState<string | null>(null)

  function toggle(key: string) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    <div className="block sm:hidden">
      <div
        className={`flex flex-col origin-top overflow-hidden transition-all duration-300
          ${isOpen ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        {Object.entries(data).map(([label, value]) => {
          const group = isGroup(value)
          const expanded = openKey === label
          const def = getDefaultPath(value)
          const href = resolveHref(value, basePath)

          return (
            <div key={label}>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ paddingLeft: 16 + level * 16 }}
              >
                <Link
                  href={href}
                  onClick={onNavigate}
                  className="font-medium flex-1"
                >
                  {label}
                </Link>

                {group && (
                  <button
                    type="button"
                    onClick={() => toggle(label)}
                    className="p-2"
                  >
                    <SlArrowDown
                      className={`transition-transform duration-300 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {group && (
                <div
                  className={`overflow-hidden transition-all duration-300
                    ${expanded ? 'max-h-125' : 'max-h-0'}
                  `}
                >
                  <MobileDropdown
                    isOpen={expanded}
                    data={Object.fromEntries(getChildren(value))}
                    level={level + 1}
                    onNavigate={onNavigate}
                    basePath={def ? basePath + def : basePath}
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
