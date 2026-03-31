import { useEffect, useRef, useState } from 'react'

export function useSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const [trackWidth, setTrackWidth] = useState(0)

  useEffect(() => {
    if (!sliderRef.current || !trackRef.current) return

    const updateSize = () => {
      setSliderWidth(sliderRef.current?.offsetWidth ?? 0)
      setTrackWidth(trackRef.current?.scrollWidth ?? 0)
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)

    observer.observe(sliderRef.current)
    observer.observe(trackRef.current)

    return () => observer.disconnect()
  }, [])

  const minTranslateX = currentPage * sliderWidth
  const maxTranslateX = Math.max(trackWidth - sliderWidth, 0)
  const translateX = Math.min(minTranslateX, maxTranslateX)

  const canSlideLeft = currentPage > 0
  const canSlideRight = translateX + sliderWidth < trackWidth

  const slideLeft = () => {
    if (canSlideLeft) setCurrentPage((prev) => prev - 1)
  }
  const slideRight = () => {
    if (canSlideRight) setCurrentPage((prev) => prev + 1)
  }

  return {
    sliderRef,
    trackRef,
    translateX,
    canSlideLeft,
    canSlideRight,
    slideLeft,
    slideRight,
  }
}
