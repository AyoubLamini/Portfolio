'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface IntroAnimationProps {
    onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const lRef = useRef<HTMLSpanElement>(null)
    const aRef = useRef<HTMLSpanElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLDivElement>(null)
    const glitchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete,
                })
            },
        })

        // Initial state
        gsap.set([lRef.current, aRef.current], {
            opacity: 0,
            scale: 0.3,
            y: 60,
        })
        gsap.set(lineRef.current, { scaleX: 0, opacity: 0 })
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 })

        // Animation sequence
        tl
            // Letters appear
            .to(lRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: 'expo.out',
            })
            .to(aRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: 'expo.out',
            }, '-=0.5')
            // Line appears
            .to(lineRef.current, {
                scaleX: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
            }, '-=0.2')
            // Subtitle appears
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
            })
            // Hold
            .to({}, { duration: 0.8 })
            // Glitch effect
            .to([lRef.current, aRef.current], {
                x: () => gsap.utils.random(-4, 4),
                duration: 0.05,
                repeat: 6,
                yoyo: true,
                ease: 'none',
            })
            // Scale up and exit
            .to([lRef.current, aRef.current], {
                scale: 8,
                opacity: 0,
                duration: 0.7,
                ease: 'expo.in',
                stagger: 0.05,
            })
            .to([lineRef.current, subtitleRef.current], {
                opacity: 0,
                duration: 0.3,
            }, '-=0.5')

        return () => {
            tl.kill()
        }
    }, [onComplete])

    return (
        <div
            ref={overlayRef}
            id="intro-overlay"
            className="fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Scan line */}
            <div className="scan-line" />

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyber-blue opacity-50" />
            <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyber-blue opacity-50" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyber-blue opacity-50" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyber-blue opacity-50" />

            {/* Main content */}
            <div className="flex flex-col items-center gap-6">
                {/* LA initials */}
                <div className="flex items-center gap-2 select-none">
                    <span
                        ref={lRef}
                        className="text-[20vw] font-bold leading-none gradient-text"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.05em' }}
                    >
                        L
                    </span>
                    <span
                        ref={aRef}
                        className="text-[20vw] font-bold leading-none gradient-text"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.05em' }}
                    >
                        A
                    </span>
                </div>

                {/* Line */}
                <div
                    ref={lineRef}
                    className="h-px w-48 origin-left"
                    style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
                />

                {/* Subtitle */}
                <div
                    ref={subtitleRef}
                    className="font-mono text-sm tracking-[0.3em] text-muted uppercase"
                >
                    Ayoub Lamini
                </div>
            </div>

            {/* Bottom status */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted tracking-widest opacity-50">
                INITIALIZING<span className="blink">_</span>
            </div>
        </div>
    )
}
