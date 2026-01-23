'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type ImageCarouselProps = {
  images: string[]
  text?: string
  interval?: number // milliseconds
}

export function ImageCarousel({
  images,
  text,
  interval = 4000
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (images.length === 0) return null

  return (
    <div className="relative w-full h-125 overflow-hidden">
      {/* TRACK */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="relative min-w-full h-full shrink-0"
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* TEXT OVERLAY */}
      {text && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <h2 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
            {text}
          </h2>
        </div>
      )}
    </div>
  )
}
