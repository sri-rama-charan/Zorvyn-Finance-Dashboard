import { useState, useEffect } from 'react'

const easeOutExpo = (t) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function useCountUp(endValue, duration = 1500) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const target = parseFloat(endValue) || 0
    if (target === 0) return setCount(0)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const current = target * easeOutExpo(progress)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    const frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [endValue, duration])

  return count
}