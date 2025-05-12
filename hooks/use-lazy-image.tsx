"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

export function useLazyImage(src: string, options = { threshold: 0.1 }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: options.threshold,
  })

  useEffect(() => {
    if (inView && src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      img.onerror = (e) => {
        setError(new Error(`Failed to load image: ${src}`))
      }
    }
  }, [inView, src])

  return { ref, imageSrc, isLoaded, error }
}
