'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const RetroComputer = dynamic(() => import('@/components/canvas/RetroComputer'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border border-cyber-blue border-t-transparent rounded-full animate-spin" />
        </div>
    ),
})

export default function ModelSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        gsap.fromTo(
            textRef.current.children,
            { opacity: 0, x: -40 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 75%',
                },
            }
        )
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-20 px-6 overflow-hidden min-h-[80vh] flex items-center"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-void via-void-2 to-void pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] bg-cyber-blue/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div ref={textRef}>
                        <h2 className="text-5xl md:text-6xl font-bold text-ghost-white leading-tight mb-6">
                            The Mind
                            <br />
                            Behind the{' '}
                            <span className="gradient-text">Code</span>
                        </h2>
                        <p className="text-muted leading-relaxed mb-6">
                            I live at the intersection of low-level precision and high-level creativity. Whether it&apos;s debugging a segfault at 2am or crafting a pixel-perfect UI, I bring the same obsessive attention to detail.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Location', value: 'Morocco 🇲🇦' },
                                { label: 'School', value: '1337 — 42 Network' },
                                { label: 'Focus', value: 'Web dev' },
                                { label: 'Status', value: 'Open to Work ✓' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-muted w-20">{item.label}</span>
                                    <span className="w-px h-4 bg-white/10" />
                                    <span className="font-mono text-sm text-ghost-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[500px] lg:h-[600px]">
                        <div
                            className="absolute inset-0 rounded-full border border-cyber-blue/10 m-8 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)',
                            }}
                        />
                        <div className="absolute inset-0 rounded-full border border-cyber-blue/5 m-4 animate-spin-slow pointer-events-none" />

                        <div className="absolute bottom-4 right-4 font-mono text-xs text-muted/40 pointer-events-none">
                            CLICK & DRAG →
                        </div>

                        <RetroComputer />
                    </div>
                </div>
            </div>
        </section>
    )
}
