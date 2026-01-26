"use client"

import Image from "next/image"
import { useState, useMemo } from "react"
import { Lightbox } from "@/components/atom/lightBox"
import { createBlurDataURL } from "@/util/blur"

type MasonryGalleryProps = {
  images: string[]
}

const SPANS = [10, 13, 16, 17]

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // Deterministic layout
  const spans = useMemo(
    () => images.map((_, i) => SPANS[i % SPANS.length]),
    [images]
  )

  return (
    <>
      <div
        className="
          grid grid-cols-2 gap-4
          sm:grid-cols-4
          lg:grid-cols-6
          auto-rows-[10px]
        "
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            style={{ gridRowEnd: `span ${spans[i]}` }}
            onClick={() => setActiveImage(src)}
          >
            <Image
              src={src}
              alt=""
              fill={true}
              loading="lazy"
              placeholder="blur"
              blurDataURL={createBlurDataURL()}
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {activeImage && (
        <Lightbox
          src={activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </>
  )
}
