'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, Github, Linkedin } from 'lucide-react'

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const techRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 })

            gsap.set([titleRef.current, subtitleRef.current, techRef.current, ctaRef.current], {
                opacity: 0,
                y: 10,
            })

            tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
              .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
              .to(techRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
              .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
        })

        return () => ctx.revert()
    }, [])

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-bg px-6"
        >

            <div className="relative z-10 max-w-4xl mx-auto text-center">

                <h1
                    ref={titleRef}
                    className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl text-neutral-ink tracking-tighter leading-none mb-6 text-balance"
                >
                    Ayoub Lamini
                </h1>


                <p
                    ref={subtitleRef}
                    className="font-sans text-lg sm:text-xl md:text-2xl text-neutral-ink-muted max-w-2xl mx-auto mb-4 leading-relaxed text-balance"
                >
                    Software Engineer & Web Developer. <br /> 
                </p>


                <p
                    ref={techRef}
                    className="font-mono text-xs sm:text-sm text-neutral-ink-muted/60 tracking-wider mb-10"
                >
                    C · C++ · TypeScript · Next.js · Node.js
                </p>


                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={scrollToAbout}
                        className="group flex items-center gap-2 px-6 py-2.5 rounded-md font-sans text-sm font-medium bg-primary text-neutral-bg hover:bg-primary-hover transition-colors duration-150 shadow-sm"
                    >
                        Explore My Work
                        <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-150" />
                    </button>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/ayoublamini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-md border border-neutral-border flex items-center justify-center text-neutral-ink-muted hover:text-neutral-ink hover:bg-neutral-surface transition-all duration-150"
                            aria-label="GitHub Profile"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ayoub-lamini-844a68341/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-md border border-neutral-border flex items-center justify-center text-neutral-ink-muted hover:text-neutral-ink hover:bg-neutral-surface transition-all duration-150"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>


            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer select-none"
                onClick={scrollToAbout}
            >
                <span className="font-mono text-[10px] text-neutral-ink-muted/50 tracking-widest">SCROLL</span>
                <div className="w-px h-10 bg-gradient-to-b from-neutral-border to-transparent" />
            </div>
        </section>
    )
}
