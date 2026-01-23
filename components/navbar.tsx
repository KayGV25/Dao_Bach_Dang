'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HamburgerMenu } from '@/components/atom/hamburger-menu'
import { DesktopDropdown, MobileDropdown } from '@/components/atom/nav-dropdown'
import { DROPDOWN_CONTENT } from '@/constants/nav'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: PointerEvent) => {
      if (!navRef.current) return
      if (!navRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  return (
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-10 w-full flex flex-col"
    >
      <div className="w-full bg-primary px-4 py-2 flex justify-between items-center">
        <div className="flex gap-1">
          <HamburgerMenu
            isOpen={isOpen}
            onToggle={() => setIsOpen(o => !o)}
          />

          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="flex">
              <Image src="/logo_dao.png" alt="Đạo Bạch Đằng" width={40} height={40} />
              <p className="border-l-2 px-2 self-center font-bold text-background">
                Đạo Bạch Đằng
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className='w-full bg-background backdrop-blur-md text-black'>
        <MobileDropdown
          isOpen={isOpen}
          data={DROPDOWN_CONTENT}
          onNavigate={() => setIsOpen(false)}
        />
        <DesktopDropdown
          isOpen={isOpen}
          data={DROPDOWN_CONTENT}
          onNavigate={() => setIsOpen(false)}
        />
      </div>
    </nav>
  )
}
