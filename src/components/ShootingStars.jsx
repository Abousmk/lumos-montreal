import React, { useEffect, useState, useRef } from "react"

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4)
  const offset = Math.random() * window.innerWidth

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 }
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 }
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 }
    case 3:
      return { x: 0, y: offset, angle: 315 }
    default:
      return { x: 0, y: 0, angle: 45 }
  }
}

export const ShootingStars = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#d4af37",
  trailColor = "#2d4a7c",
  starWidth = 10,
  starHeight = 1,
  maxStars = 8,
  className = ""
}) => {
  const [stars, setStars] = useState([])
  const svgRef = useRef(null)

  useEffect(() => {
    let timeoutId
    let isCancelled = false

    const createStar = () => {
      if (isCancelled) return
      const { x, y, angle } = getRandomStartPoint()
      const newStar = {
        id: `${Date.now()}-${Math.random()}`,
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      }

      setStars((prevStars) => {
        const nextStars = [...prevStars, newStar]
        if (nextStars.length <= maxStars) {
          return nextStars
        }
        return nextStars.slice(nextStars.length - maxStars)
      })

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
      timeoutId = setTimeout(createStar, randomDelay)
    }

    createStar()

    return () => {
      isCancelled = true
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [minSpeed, maxSpeed, minDelay, maxDelay, maxStars])

  useEffect(() => {
    let animationFrame

    const animate = () => {
      setStars((prevStars) =>
        prevStars
          .map((prevStar) => {
            const newX = prevStar.x + prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180)
            const newY = prevStar.y + prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180)
            const newDistance = prevStar.distance + prevStar.speed
            const newScale = 1 + newDistance / 100

            const isOutOfBounds =
              newX < -40 ||
              newX > window.innerWidth + 40 ||
              newY < -40 ||
              newY > window.innerHeight + 40

            if (isOutOfBounds) {
              return null
            }

            return {
              ...prevStar,
              x: newX,
              y: newY,
              distance: newDistance,
              scale: newScale,
            }
          })
          .filter(Boolean)
      )

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const gradientId = useRef(`gradient-${Math.random().toString(36).slice(2)}`).current

  return (
    <svg
      ref={svgRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {stars.map((star) => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#${gradientId})`}
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ))}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  )
}