'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const skills = {
    systems: [
        { name: 'C', level: 95 },
        { name: 'C++', level: 90 },
        { name: 'Linux / Unix', level: 88 },
        { name: 'Shell / Bash', level: 85 },
        { name: 'Makefile / CMake', level: 80 },
        { name: 'Networking (Sockets)', level: 82 },
        { name: 'Git', level: 90 },
    ],
    web: [
        { name: 'TypeScript', level: 88 },
        { name: 'React / Next.js', level: 92 },
        { name: 'Node.js', level: 82 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'WebSockets', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'Three.js / WebGL', level: 72 },
    ],
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
    const barRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!barRef.current || !fillRef.current) return

        gsap.set(fillRef.current, { width: 0 })

        ScrollTrigger.create({
            trigger: barRef.current,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(fillRef.current, {
                    width: `${level}%`,
                    duration: 1.2,
                    delay,
                    ease: 'power3.out',
                })
            },
        })
    }, [level, delay])

    return (
        <div ref={barRef} className="group">
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm text-ghost-white/80 group-hover:text-ghost-white transition-colors">
                    {name}
                </span>
                <span className="font-mono text-xs text-cyber-blue">{level}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                    ref={fillRef}
                    className="h-full rounded-full relative"
                    style={{
                        background: 'linear-gradient(90deg, #0099bb, #00d4ff, #00ffee)',
                        boxShadow: '0 0 10px rgba(0,212,255,0.5)',
                    }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#00d4ff]" />
                </div>
            </div>
        </div>
    )
}

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!titleRef.current) return

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                },
            }
        )
    }, [])

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-32 px-6 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 cyber-grid-bg opacity-30" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Title */}
                <div ref={titleRef} className="mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold text-ghost-white">
                        Technical{' '}
                        <span className="gradient-text">Stack</span>
                    </h2>
                    <p className="mt-4 text-muted max-w-xl">
                        From bare-metal systems to pixel-perfect interfaces — the full spectrum.
                    </p>
                </div>

                {/* Skills grid */}
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Systems */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded border border-cyber-blue/40 flex items-center justify-center">
                                <span className="text-cyber-blue text-xs font-mono">SYS</span>
                            </div>
                            <h3 className="text-xl font-semibold text-ghost-white">Systems & Low-Level</h3>
                        </div>
                        <div className="space-y-6">
                            {skills.systems.map((skill, i) => (
                                <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
                            ))}
                        </div>
                    </div>

                    {/* Web */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded border border-neon-cyan/40 flex items-center justify-center">
                                <span className="text-neon-cyan text-xs font-mono">WEB</span>
                            </div>
                            <h3 className="text-xl font-semibold text-ghost-white">Web & Modern Stack</h3>
                        </div>
                        <div className="space-y-6">
                            {skills.web.map((skill, i) => (
                                <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech tags */}
                <div className="mt-20">
                    <p className="font-mono text-xs text-muted tracking-widest mb-6">ALSO FAMILIAR WITH</p>
                    <div className="flex flex-wrap gap-3">
                        {['Docker', 'Nginx', 'Redis', 'GraphQL', 'Prisma', 'Figma', 'GDB', 'Valgrind', 'Python'].map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 border border-white/10 rounded-full font-mono text-xs text-muted hover:border-cyber-blue/40 hover:text-ghost-white transition-all duration-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
