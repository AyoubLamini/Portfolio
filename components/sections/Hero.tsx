'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ArrowDown, Github, Linkedin } from 'lucide-react'

const ParticleField = dynamic(() => import('@/components/canvas/ParticleField'), {
    ssr: false,
    loading: () => null,
})

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    // const badgeRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 })

            gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, scrollRef.current], {
                opacity: 0,
                y: 30,
            })

            tl
                // .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
                .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
                .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
                .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        })

        return () => ctx.revert()
    }, [])

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Particle background */}
            {mounted && <ParticleField />}

            {/* Grid background */}
            <div className="absolute inset-0 cyber-grid-bg opacity-40" />

            {/* Radial gradient center glow */}
            <div className="absolute inset-0 bg-gradient-radial from-cyber-blue/5 via-transparent to-transparent pointer-events-none" />

            {/* Large background "LA" */}
            <div
                className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <span
                    className="text-[40vw] font-bold leading-none"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(0,212,255,0.04)',
                        letterSpacing: '-0.05em',
                    }}
                >
                    LA
                </span>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                {/* <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                    </div>
                    <span className="font-mono text-xs text-muted tracking-widest">
                        AVAILABLE FOR WORK
                    </span>
                </div> */}

                {/* Main title */}
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6"
                    style={{ letterSpacing: '-0.03em' }}
                >
                    <span className="text-ghost-white">Ayoub</span>
                    <br />
                    <span className="gradient-text glow-text">Lamini</span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-ghost-white/60 max-w-2xl mx-auto mb-4 leading-relaxed"
                >
                    Software Engineer{' '}
                    <span className="text-ghost-white/60 mx-2">-</span>
                    {' '}Web Developer
                </p>

                <p className="font-mono text-sm text-muted/90 mb-10 tracking-wider">
                    C · C++ · TypeScript · Next.js · Nestjs
                </p>

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={scrollToAbout}
                        data-cursor-hover
                        className="group px-8 py-4 rounded-xl font-mono text-sm font-medium transition-all duration-300 relative overflow-hidden"
                        style={{
                            background: 'rgba(0,212,255,0.12)',
                            border: '1px solid rgba(0,212,255,0.4)',
                            color: '#00d4ff',
                            boxShadow: '0 0 30px rgba(0,212,255,0.1)',
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore My Work
                            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-cyber-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/ayoublamini"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-hover
                            className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-ghost-white hover:border-white/30 transition-all duration-300"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ayoub-lamini-844a68341/"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-hover
                            className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-ghost-white hover:border-white/30 transition-all duration-300"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                onClick={scrollToAbout}
                data-cursor-hover
            >
                <span className="font-mono text-xs text-muted tracking-widest">SCROLL</span>
                <div className="w-px h-12 bg-gradient-to-b from-cyber-blue/50 to-transparent relative overflow-hidden">
                    <div
                        className="absolute top-0 w-full h-4 bg-cyber-blue/80"
                        style={{ animation: 'scan 1.5s linear infinite' }}
                    />
                </div>
            </div>

            {/* Corner decorations */}
            {/* <div className="absolute top-24 left-6 hidden lg:block">
                <div className="font-mono text-xs text-muted/40 tracking-widest rotate-90 origin-left">
                    PORTFOLIO 2025
                </div>
            </div>
            <div className="absolute top-24 right-6 hidden lg:block">
                <div className="font-mono text-xs text-muted/40 tracking-widest -rotate-90 origin-right">
                    v1.0.0
                </div>
            </div> */}
        </section>
    )
}
