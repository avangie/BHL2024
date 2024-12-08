'use client'

import React, { useEffect, useRef } from 'react'

const UniverseBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars: Star[] = []
        const nebulae: Nebula[] = []

        class Star {
            x: number
            y: number
            baseSize: number
            size: number
            brightness: number
            color: string
            pulseSpeed: number
            pulsePhase: number
            visible: boolean
            visibilityDuration: number
            visibilityTimer: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.baseSize = Math.random() * 2 + 0.5
                this.size = this.baseSize
                this.brightness = Math.random()
                this.color = Math.random() > 0.7 ? '#ff8f00' : '#ffffff'
                this.pulseSpeed = Math.random() * 0.05 + 0.02
                this.pulsePhase = Math.random() * Math.PI * 2
                this.visible = Math.random() > 0.2
                this.visibilityDuration = Math.random() * 1000000 + 2000
                this.visibilityTimer = Math.random() * this.visibilityDuration
            }

            update(deltaTime: number) {
                // Update visibility
                this.visibilityTimer += deltaTime
                if (this.visibilityTimer > this.visibilityDuration) {
                    this.visible = !this.visible
                    this.visibilityTimer = 0
                    this.visibilityDuration = Math.random() * 5000 + 2000
                }

                // Update pulsing
                this.pulsePhase += this.pulseSpeed
                this.size = this.baseSize * (1 + Math.sin(this.pulsePhase) * 0.3)
            }

            draw() {
                if (!ctx || !this.visible) return

                // Main star glow
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 4
                )
                gradient.addColorStop(0, this.color)
                gradient.addColorStop(1, 'transparent')

                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()

                // Star core
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        class Nebula {
            points: { x: number; y: number }[]
            color: string
            alpha: number
            phase: number

            constructor() {
                this.points = []
                const centerX = Math.random() * canvas!.width
                const centerY = Math.random() * canvas!.height

                for (let i = 0; i < 10; i++) {
                    this.points.push({
                        x: centerX + (Math.random() - 0.5) * 400,
                        y: centerY + (Math.random() - 0.5) * 400
                    })
                }

                this.color = '#1e3a8a'
                this.alpha = Math.random() * 0.3 + 0.1
                this.phase = Math.random() * Math.PI * 2
            }

            draw() {
                if (!ctx) return

                ctx.save()
                ctx.globalAlpha = this.alpha * (Math.sin(this.phase) * 0.2 + 0.8)

                ctx.beginPath()
                ctx.moveTo(this.points[0].x, this.points[0].y)

                for (let i = 0; i < this.points.length - 1; i++) {
                    const xc = (this.points[i].x + this.points[i + 1].x) / 2
                    const yc = (this.points[i].y + this.points[i + 1].y) / 2
                    ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc)
                }

                ctx.closePath()

                const gradient = ctx.createLinearGradient(
                    canvas!.width / 2 - 200,
                    canvas!.height / 2 - 200,
                    canvas!.width / 2 + 200,
                    canvas!.height / 2 + 200
                )
                gradient.addColorStop(0, '#1e3a8a')
                gradient.addColorStop(0.5, '#1e40af')
                gradient.addColorStop(1, '#1e3a8a')

                ctx.fillStyle = gradient
                ctx.fill()

                ctx.restore()

                this.phase += 0.002
            }
        }

        for (let i = 0; i < 200; i++) {
            stars.push(new Star())
        }

        for (let i = 0; i < 5; i++) {
            nebulae.push(new Nebula())
        }

        function drawBackground() {
            if (!ctx) return
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas!.height)
            gradient.addColorStop(0, '#000000')
            gradient.addColorStop(1, '#0a0f2a')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas!.width, canvas!.height)
        }

        let lastTime = 0
        function animate(currentTime: number) {
            if (!ctx) return
            const deltaTime = currentTime - lastTime
            lastTime = currentTime

            ctx.clearRect(0, 0, canvas!.width, canvas!.height)

            drawBackground()
            nebulae.forEach(nebula => nebula.draw())
            stars.forEach(star => {
                star.update(deltaTime)
                star.draw()
            })

            requestAnimationFrame(animate)
        }

        animate(0)

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
        />
    )
}

export default UniverseBackground

