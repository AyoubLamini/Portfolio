'use client'

import { useEffect, useState } from 'react'
import { Download } from "lucide-react"
import Link from 'next/link'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    // { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (href: string) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                scrolled
                    ? 'py-4 bg-neutral-bg/80 backdrop-blur-md border-b border-neutral-border'
                    : 'py-6 bg-transparent border-b border-transparent'
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="#hero"
                    onClick={() => scrollTo('#hero')}
                    className="font-sans font-bold text-lg tracking-tight text-neutral-ink select-none"
                >
                    Ayoub Lamini
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="font-sans text-sm font-medium text-neutral-ink-muted hover:text-neutral-ink transition-colors duration-200"
                        >
                            {link.label}
                        </button>
                    ))}

                    <a
                        href="/Ayoub_Lamini_Resume_2026.pdf"
                        download
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-neutral-border text-neutral-ink font-sans text-sm rounded-md bg-neutral-surface hover:bg-neutral-border hover:text-neutral-ink transition-all duration-200"
                    >
                        Resume <Download size={14} />
                    </a>
                </div>


                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-px bg-neutral-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-6 h-px bg-neutral-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-6 h-px bg-neutral-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>


            <div
                className={`md:hidden transition-all duration-300 overflow-hidden bg-neutral-bg/95 border-b border-neutral-border ${
                    menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
            >
                <div className="px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-left font-sans text-sm font-medium text-neutral-ink-muted hover:text-neutral-ink transition-colors"
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        href="/Ayoub_Lamini_Resume_2026.pdf"
                        download
                        className="inline-flex items-center justify-between w-full px-3.5 py-2 border border-neutral-border text-neutral-ink font-sans text-sm rounded-md bg-neutral-surface hover:bg-neutral-border transition-all duration-200"
                    >
                        <span>Download Resume</span>
                        <Download size={14} />
                    </a>
                </div>
            </div>
        </nav>
    )
}
