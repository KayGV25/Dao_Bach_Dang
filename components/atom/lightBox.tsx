"use client"

import { createBlurDataURL } from "@/util/blur"
import Image from "next/image"
import { useEffect } from "react"

type LightboxProps = {
  src: string
  onClose: () => void
}

export function Lightbox({ src, onClose }: LightboxProps) {
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = original
    }
  }, [])

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute -top-4 -right-4
            flex h-10 w-10 items-center justify-center
            text-xl text-white cursor-pointer
          "
        >
          X
        </button>

        <Image
          src={src}
          alt=""
          width={1600}
          height={1600}
          placeholder="blur"
          blurDataURL={createBlurDataURL()}
          className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
        />
      </div>
    </div>
  )
}
