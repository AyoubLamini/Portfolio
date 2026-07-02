'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface SmoothScrollProps {
    children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<any>(null)
    const pathname = usePathname()

    useEffect(() => {
        let lenis: any

        const initLenis = async () => {
            const Lenis = (await import('lenis')).default

            lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            })

            lenisRef.current = lenis


            try {
                const gsap = (await import('gsap')).default
                const { ScrollTrigger } = await import('gsap/ScrollTrigger')
                gsap.registerPlugin(ScrollTrigger)

                lenis.on('scroll', ScrollTrigger.update)

                gsap.ticker.add((time: number) => {
                    lenis.raf(time * 1000)
                })
                gsap.ticker.lagSmoothing(0)
            } catch {
                // GSAP not available, use RAF
                const raf = (time: number) => {
                    lenis.raf(time)
                    requestAnimationFrame(raf)
                }
                requestAnimationFrame(raf)
            }
        }

        initLenis()

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy()
                lenisRef.current = null
            }
        }
    }, [])


    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
    }, [pathname])

    return <>{children}</>
}
