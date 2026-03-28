'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0
        let animFrame: number

        const lerp = (start: number, end: number, factor: number) =>
            start + (end - start) * factor

        const animate = () => {
            ringX = lerp(ringX, mouseX, 0.12)
            ringY = lerp(ringY, mouseY, 0.12)

            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`

            animFrame = requestAnimationFrame(animate)
        }

        animate()

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (!isVisible) setIsVisible(true)
        }

        const onEnter = () => setIsVisible(true)
        const onLeave = () => setIsVisible(false)
        const onDown = () => setIsClicking(true)
        const onUp = () => setIsClicking(false)

        // Detect hoverable elements
        const addHover = () => setIsHovering(true)
        const removeHover = () => setIsHovering(false)

        const hoverables = document.querySelectorAll(
            'a, button, [data-cursor-hover], input, textarea, select, label'
        )
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', addHover)
            el.addEventListener('mouseleave', removeHover)
        })

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseenter', onEnter)
        document.addEventListener('mouseleave', onLeave)
        document.addEventListener('mousedown', onDown)
        document.addEventListener('mouseup', onUp)

        return () => {
            cancelAnimationFrame(animFrame)
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseenter', onEnter)
            document.removeEventListener('mouseleave', onLeave)
            document.removeEventListener('mousedown', onDown)
            document.removeEventListener('mouseup', onUp)
            hoverables.forEach((el) => {
                el.removeEventListener('mouseenter', addHover)
                el.removeEventListener('mouseleave', removeHover)
            })
        }
    }, [isVisible])

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-opacity duration-300"
                style={{
                    width: isHovering ? '6px' : '8px',
                    height: isHovering ? '6px' : '8px',
                    background: '#00d4ff',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: '0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.5)',
                    transition: 'width 0.2s, height 0.2s, opacity 0.3s',
                }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border transition-all duration-200"
                style={{
                    width: isHovering ? '52px' : isClicking ? '28px' : '36px',
                    height: isHovering ? '52px' : isClicking ? '28px' : '36px',
                    borderColor: isHovering ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.35)',
                    opacity: isVisible ? 1 : 0,
                    background: isHovering ? 'rgba(0,212,255,0.05)' : 'transparent',
                    transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), opacity 0.3s, border-color 0.3s',
                }}
            />
        </>
    )
}
