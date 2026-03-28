'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const timeline = [
    {
        year: '2021 - 2023',
        title: 'ISTA ISGI',
        subtitle: 'Full-Stack Development Diploma',
        description:
            'Two-year intensive program covering web development fundamentals, databases, and modern frameworks. Built my first production-ready applications.',
        color: '#00d4ff',
    },
    {
        year: '2023 - 2025',
        title: '1337 — 42 Network',
        subtitle: 'Common Core Program',
        description:
            'Peer-to-peer learning at one of the world\'s most rigorous coding schools. Mastered C, systems programming, algorithms, and built complex projects under extreme constraints.',
        color: '#00ffee',
    },
    {
        year: 'Now',
        title: 'Web Development Focus',
        subtitle: '1337 Common Core Graduate',
        description:
            'Strong foundation in C/C++ and system programming from 1337. Now specializing in modern web development, building full-stack applications, and actively seeking a web development internship to grow and contribute.',
        color: '#a855f7',
    },
]

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                    },
                }
            )

            // Text animation
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 80%',
                    },
                }
            )

            // Timeline items
            const items = timelineRef.current?.querySelectorAll('.timeline-item')
            items?.forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: 40 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        delay: i * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        },
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 px-6 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] bg-cyber-blue/5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] bg-neon-cyan/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left: Text */}
                    <div>
                        <div ref={titleRef}>
                            <h2 className="text-5xl md:text-6xl font-bold text-ghost-white leading-tight">
                                Systems
                                <br />
                                <span className="gradient-text">Thinker.</span>
                                <br />
                                Web Builder.
                            </h2>
                        </div>

                        <div ref={textRef} className="mt-8 space-y-5">
                            <p className="text-muted leading-relaxed text-lg">
                                I&apos;m <span className="text-ghost-white font-medium">Ayoub Lamini</span>, a software developer who operates at both ends of the stack — from writing memory-safe C code to shipping polished Next.js applications.
                            </p>
                            <p className="text-muted leading-relaxed">
                                My journey through <span className="text-cyber-blue">1337 (42 Network)</span> forged a problem-solving mindset that goes beyond syntax — understanding how computers actually work, from process management to network protocols.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Combined with modern web expertise, I build things that are both technically sound and visually compelling. I believe the best software is invisible — it just works, fast and elegantly.
                            </p>

                            {/* Dual identity cards */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 rounded-xl border border-cyber-blue/20 bg-cyber-blue/5">
                                    <p className="font-mono text-cyber-blue text-xs tracking-widest mb-2">SYSTEMS</p>
                                    <p className="text-ghost-white font-medium text-sm">C · C++ · Unix · Algorithm · Data structures · OOP </p>
                                </div>
                                <div className="p-4 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5">
                                    <p className="font-mono text-neon-cyan text-xs tracking-widest mb-2">WEB</p>
                                    <p className="text-ghost-white font-medium text-sm"> React · Next.js · TypeScript · NestJS</p>
                                </div>
                            </div>

                            {/* Stats */}
                            {/* <div className="flex gap-8 mt-8 pt-8 border-t border-white/5">
                                {[
                                    { value: '2+', label: 'Years at 1337' },
                                    { value: '10+', label: 'Projects Built' },
                                    { value: '2', label: 'Diplomas' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                                        <p className="text-muted text-sm mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div ref={timelineRef} className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-blue/50 via-neon-cyan/30 to-transparent" />

                        <div className="space-y-10">
                            {timeline.map((item, i) => (
                                <div key={i} className="timeline-item relative pl-12">
                                    {/* Dot */}
                                    <div
                                        className="absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center"
                                        style={{
                                            borderColor: item.color,
                                            background: `${item.color}10`,
                                            boxShadow: `0 0 20px ${item.color}30`,
                                        }}
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ background: item.color }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="group">
                                        <span className="font-mono text-xs tracking-widest" style={{ color: item.color }}>
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-ghost-white mt-1 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="font-mono text-sm text-muted mb-3">{item.subtitle}</p>
                                        <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
