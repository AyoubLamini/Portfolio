'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Senior System Architect',
        message:
            "Ayoub has a rare ability to dive deep into low-level systems while maintaining a high-level product vision. His work on the distributed shell architecture was nothing short of impressive.",
        avatar: 'SC',
        color: '#00d4ff',
        time: '2d',
    },
    {
        id: 2,
        name: 'Michael Ross',
        role: 'Tech Lead @ StartUp',
        message:
            "I've worked with many developers, but few have the polish and attention to detail that Ayoub brings. He doesn't just write code; he crafts experiences. The 3D integration optimization was a game changer.",
        avatar: 'MR',
        color: '#a855f7',
        time: '1w',
    },
    {
        id: 3,
        name: 'David Kim',
        role: 'Peer @ 1337',
        message:
            "Watching Ayoub solve complex algorithmic challenges is a masterclass in logic. He pushes everyone around him to be better. A true 10x engineer in the making.",
        avatar: 'DK',
        color: '#00ffee',
        time: '3w',
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'Product Manager',
        message:
            "Responsive, creative, and technically brilliant. The dashboard he built for us is still the fastest internal tool we have. Highly recommended for any complex frontend work.",
        avatar: 'ED',
        color: '#ff6b35',
        time: '1m',
    },
]

function TestimonialCard({ data }: { data: typeof testimonials[0] }) {
    return (
        <div
            className="relative flex-shrink-0 w-[85vw] md:w-[600px] p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden group select-none"
            style={{
                boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                filter: 'blur(5px)',
                userSelect: 'none',
            }}
        >
            <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ background: data.color }}
            />

            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg"
                        style={{
                            background: `linear-gradient(135deg, ${data.color}20, ${data.color}10)`,
                            border: `1px solid ${data.color}40`,
                            color: data.color,
                        }}
                    >
                        {data.avatar}
                    </div>
                    <div>
                        <h4 className="font-bold text-ghost-white text-lg md:text-xl">{data.name}</h4>
                        <p className="text-sm text-muted font-mono">{data.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                    <span className="text-sm text-muted/50 font-mono">{data.time}</span>
                    <div className="w-6 h-6">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
                <p className="pl-6 text-lg md:text-xl text-muted leading-relaxed italic">&quot;{data.message}&quot;</p>
            </div>
        </div>
    )
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current
            const trigger = triggerRef.current

            if (!container || !trigger) return

            const totalWidth = container.scrollWidth
            const viewportWidth = window.innerWidth
            const scrollDistance = totalWidth - viewportWidth

            gsap.to(container, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,
                    start: "top top",
                    end: () => `+=${scrollDistance}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative bg-background"
        >
            <div ref={triggerRef} className="h-screen w-full flex flex-col justify-center relative overflow-hidden">
                <div className="px-6 mb-12 relative z-10 w-full flex items-center justify-center">
                    <div className="text-center md:text-left md:pl-12">
                        <h2 className="text-4xl md:text-6xl font-bold text-ghost-white mb-4">
                            Peer <span className="gradient-text">Feedback</span>
                        </h2>
                        <p className="text-muted text-center max-w-xl text-lg">
                            Waiting for your feedback — connect with me on{' '}
                            <a
                                href="https://www.linkedin.com/in/ayoub-lamini-844a68341/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyber-blue hover:underline"
                            >
                                LinkedIn
                            </a>
                            .
                        </p>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="flex gap-8 px-6 md:px-12 w-max items-center"
                >
                    {testimonials.map((t) => (
                        <TestimonialCard key={t.id} data={t} />
                    ))}
                    <div className="w-1 md:w-12 h-1 flex-shrink-0" />
                </div>
            </div>
        </section>
    )
}
