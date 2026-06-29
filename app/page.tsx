'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), {
    ssr: false,
})

export default function Home() {
    return (
        <SmoothScroll>
            <main className="relative bg-neutral-bg min-h-screen text-neutral-ink selection:bg-primary/20 selection:text-white">
                <Navbar />
                <Hero />
                <About />
                <Projects />
                {/* <Skills /> */}
                <Contact />
            </main>
        </SmoothScroll>
    )
}
