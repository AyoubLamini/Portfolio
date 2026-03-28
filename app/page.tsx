'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import ModelSection from '@/components/sections/ModelSection'
import Testimonials from '@/components/sections/Testimonials'

const IntroAnimation = dynamic(() => import('@/components/intro/IntroAnimation'), {
    ssr: false,
})
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
    ssr: false,
})
const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), {
    ssr: false,
})

export default function Home() {
    const [introComplete, setIntroComplete] = useState(false)
    const [showIntro, setShowIntro] = useState(true)

    useEffect(() => {
        // Check if intro was already shown this session
        const shown = sessionStorage.getItem('intro-shown')
        if (shown) {
            setShowIntro(false)
            setIntroComplete(true)
        }
    }, [])

    const handleIntroComplete = () => {
        sessionStorage.setItem('intro-shown', 'true')
        setIntroComplete(true)
        setTimeout(() => setShowIntro(false), 1000)
    }

    return (
        <>
            {/* Custom cursor */}
            <CustomCursor />

            {/* Intro animation */}
            {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

            {/* Main content */}
            <SmoothScroll>
                <main
                    className="relative"
                    style={{
                        opacity: introComplete ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                    }}
                >
                    <Navbar />
                    <Hero />
                    <ModelSection />
                    <About />
                    <Projects />
                    <Testimonials />
                    <Skills />
                    <Contact />
                </main>
            </SmoothScroll>
        </>
    )
}
