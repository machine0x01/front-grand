"use client"

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  type: 'star' | 'planet' | 'nebula' | 'moon'
  color: string
}

interface SpaceBackgroundProps {
  dotCount?: number
  className?: string
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ 
  dotCount = 40, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = (): void => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize dots with moon-like white stars and celestial bodies
    const initDots = (): void => {
      dotsRef.current = Array.from({ length: dotCount }, (_, index) => {
        const type = Math.random() > 0.85 ? 'moon' : Math.random() > 0.7 ? 'planet' : Math.random() > 0.5 ? 'nebula' : 'star'
        const isMoon = type === 'moon'
        const isPlanet = type === 'planet'
        const isNebula = type === 'nebula'
        
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isMoon ? Math.random() * 4 + 3 : isPlanet ? Math.random() * 2 + 1 : isNebula ? Math.random() * 3 + 1.5 : Math.random() * 1.5 + 0.8,
          speed: isMoon ? Math.random() * 0.1 + 0.02 : isPlanet ? Math.random() * 0.2 + 0.05 : isNebula ? Math.random() * 0.15 + 0.03 : Math.random() * 0.4 + 0.1,
          opacity: isMoon ? Math.random() * 0.8 + 0.4 : isPlanet ? Math.random() * 0.4 + 0.2 : isNebula ? Math.random() * 0.2 + 0.1 : Math.random() * 0.8 + 0.3,
          type,
          color: isMoon ? 
            ['#ffffff', '#f8f8f8', '#f0f0f0', '#e8e8e8'][Math.floor(Math.random() * 4)] || '#ffffff' : 
            isPlanet ? 
            ['#ffffff', '#f5f5f5', '#e8e8e8', '#d0d0d0'][Math.floor(Math.random() * 4)] || '#ffffff' :
            isNebula ? 
            ['#ffffff', '#f8f8f8', '#e8e8e8', '#d8d8d8'][Math.floor(Math.random() * 4)] || '#ffffff' :
            ['#ffffff', '#f8f8f8', '#f0f0f0', '#e8e8e8'][Math.floor(Math.random() * 4)] || '#ffffff'
        }
      })
    }

    initDots()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw dots
      dotsRef.current.forEach((dot, index) => {
        // Move dot upward (slower movement)
        dot.y -= dot.speed

        // Reset dot if it goes off screen
        if (dot.y < -dot.size * 2) {
          dot.y = canvas.height + dot.size * 2
          dot.x = Math.random() * canvas.width
        }

        if (dot.type === 'moon') {
          // Draw moon with white glow and subtle craters
          const twinkle = Math.sin(Date.now() * 0.0002 + index) * 0.2 + 0.8
          
          // Outer glow (largest)
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.1 * twinkle})`
          ctx.fill()
          
          // Middle glow
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.3 * twinkle})`
          ctx.fill()
          
          // Moon core
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * twinkle})`
          ctx.fill()
          
          // Subtle crater effect
          ctx.beginPath()
          ctx.arc(dot.x + dot.size * 0.3, dot.y - dot.size * 0.2, dot.size * 0.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200, 200, 200, ${dot.opacity * 0.3 * twinkle})`
          ctx.fill()
          
        } else if (dot.type === 'planet') {
          // Draw small planet with white glow
          const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 2)
          gradient.addColorStop(0, dot.color)
          gradient.addColorStop(0.8, dot.color)
          gradient.addColorStop(1, 'rgba(0,0,0,0)')
          
          // Outer glow
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.1})`
          ctx.fill()
          
          // Inner glow
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.2})`
          ctx.fill()
          
          // Planet core
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
        } else if (dot.type === 'nebula') {
          // Draw small nebula with white glowing layers
          for (let i = 0; i < 3; i++) {
            const layerSize = dot.size * (1 + i * 0.3)
            const layerOpacity = dot.opacity * (1 - i * 0.2) * 0.3
            
            // Glow effect
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, layerSize * 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${layerOpacity * 0.5})`
            ctx.fill()
            
            // Nebula core
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, layerSize, 0, Math.PI * 2)
            ctx.fillStyle = `${dot.color}${Math.floor(layerOpacity * 255).toString(16).padStart(2, '0')}`
            ctx.fill()
          }
          
        } else {
          // Draw small star with white glowing effect
          const twinkle = Math.sin(Date.now() * 0.0005 + index) * 0.3 + 0.7
          
          // Outer glow (largest)
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.05 * twinkle})`
          ctx.fill()
          
          // Middle glow
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.1 * twinkle})`
          ctx.fill()
          
          // Inner glow
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.2 * twinkle})`
          ctx.fill()
          
          // Star core
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * twinkle})`
          ctx.fill()
          
          // Bright center
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * twinkle})`
          ctx.fill()
        }
      })

      // Draw subtle connecting lines between nearby stars only
      const stars = dotsRef.current.filter(dot => dot.type === 'star')
      stars.forEach((dot1, i) => {
        stars.slice(i + 1).forEach((dot2) => {
          const distance = Math.sqrt(
            Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2)
          )
          
          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(dot1.x, dot1.y)
            ctx.lineTo(dot2.x, dot2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - distance / 80)})`
            ctx.lineWidth = 0.3
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dotCount])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}

export default SpaceBackground 