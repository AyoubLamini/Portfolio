'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const timeline = [
     {
        year: '2023 - Now',
        title: '1337 — 42 Network',
        subtitle: 'Common Core Program',
        description:
            'Completed the Common Core at 1337/42, a peer-to-peer software engineering program. Built a strong foundation in C and C++, systems programming, algorithms, networking, and software architecture through a project-based learning under strict technical constraints.',
    },
    {
        year: '2021 - 2023',
        title: 'ISTA ISGI',
        subtitle: 'Full-Stack Development Diploma',
        description:
            'Two year program covering algorithms and web development, Structural diagrams, databases and project management, learnt modern frameworks (React, Laravel). as a result built my first full stack application.',
    }
   
    // {
    //     year: 'Now',
    //     title: 'Web Development Focus',
    //     subtitle: '1337 Common Core Graduate',
    //     description:
    //         'Strong foundation in C/C++ and system programming from 1337. Now specializing in modern web development , building full-stack applications, and actively seeking opportunities to grow and contribute.',
    // },
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
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                    },
                }
            )

            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 85%',
                    },
                }
            )

            const items = timelineRef.current?.querySelectorAll('.timeline-item')
            items?.forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: i * 0.1,
                        ease: 'power2.out',
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
            className="relative py-24 border-t border-neutral-border bg-neutral-bg px-6"
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Text & Capabilities */}
                    <div>
                        <div ref={titleRef}>
                            <h2 className="font-sans font-bold text-4xl sm:text-5xl text-neutral-ink tracking-tight leading-tight">
                                Who am I ?<br />

                            </h2>
                        </div>

                        <div ref={textRef} className="mt-8 space-y-6 max-w-xl">
                         <p className="text-neutral-ink-muted leading-relaxed text-base"> Hi, I&apos;m <span className="text-neutral-ink font-medium">Ayoub Lamini</span>, a software developer who enjoys building useful applications. </p>

<p className="text-neutral-ink-muted leading-relaxed text-base"> Studying at <span className="text-neutral-ink font-medium">1337 (42 Network)</span> taught me to understand what&apos;s happening behind the scenes instead of relying solely on frameworks or abstractions. That&apos;s where I developed a solid foundation in algorithms, memory management, networking, and software architecture. </p>

<p className="text-neutral-ink-muted leading-relaxed text-base"> Today, I use that systems background to build scalable applications that are clean, reliable, and enjoyable to use.</p>
<p className="text-neutral-ink-muted leading-relaxed text-base"> I&apos;m always looking for opportunities to learn, improve, and build software that solves real problems. </p>

                            {/* Dual identity cards */}
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-4">
                                <div className="p-4 rounded-md border border-neutral-border bg-neutral-surface">
                                    <p className="font-mono text-primary-light text-[11px] font-semibold tracking-wider uppercase mb-2">SYSTEMS</p>
                                    <p className="text-neutral-ink font-sans text-sm leading-relaxed">
                                        C · C++ · Unix · Algorithms · Data Structures · OOP
                                    </p>
                                </div>
                                <div className="p-4 rounded-md border border-neutral-border bg-neutral-surface">
                                    <p className="font-mono text-primary-light text-[11px] font-semibold tracking-wider uppercase mb-2">WEB</p>
                                    <p className="text-neutral-ink font-sans text-sm leading-relaxed">
                                        React · Next.js · TypeScript · Node.js · APIs
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Right Column: Timeline */}
                    <div ref={timelineRef} className="relative mt-8 lg:mt-2">
                        {/* Vertical line */}
                        <div className="absolute left-3 top-2 bottom-2 w-px bg-neutral-border" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <div key={i} className="timeline-item relative pl-10">
                                    {/* Timeline Node */}
                                    <div className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full border border-neutral-border bg-neutral-surface flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-ink-muted" />
                                    </div>

                                    {/* Content */}
                                    <div className="group">
                                        <span className="font-mono text-xs text-neutral-ink-muted/50 tracking-wider">
                                            {item.year}
                                        </span>
                                        <h3 className="text-lg font-semibold text-neutral-ink mt-1">
                                            {item.title}
                                        </h3>
                                        <p className="font-sans text-xs text-neutral-ink-muted font-medium mb-3">
                                            {item.subtitle}
                                        </p>
                                        <p className="text-neutral-ink-muted text-sm leading-relaxed max-w-lg">
                                            {item.description}
                                        </p>
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
