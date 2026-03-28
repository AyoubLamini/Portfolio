'use client'

import { useEffect, useRef, useState } from 'react'
import {Download} from "lucide-react"
import Link from 'next/link'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
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
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'py-3 bg-void/80 backdrop-blur-xl border-b border-border-dim'
                    : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="#hero"
                    onClick={() => scrollTo('#hero')}
                    className="group flex items-center gap-2 select-none"
                    data-cursor-hover
                >
                    <div className="relative">
                        <span
                            className="text-2xl font-bold gradient-text"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            LA
                        </span>
                        <div className="absolute -inset-2 rounded-lg bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="relative font-mono text-sm text-muted hover:text-ghost-white transition-colors duration-300 group"
                            data-cursor-hover
                        >
                            <span className="text-cyber-blue mr-1 opacity-60">{'>'}</span>
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-blue group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}

                    <a
                        href="/Ayoub_Lamini_Resume_2026.pdf"
                        download
                        className="px-4 py-2 border border-cyber-blue/40 text-cyber-blue font-mono text-sm rounded hover:bg-cyber-blue/10 hover:border-cyber-blue transition-all duration-300"
                        data-cursor-hover
                    >
                        Resume <Download size={14} className="inline mb-0.5" />
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    data-cursor-hover
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-px bg-ghost-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-6 h-px bg-ghost-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-6 h-px bg-ghost-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 py-4 bg-void/95 backdrop-blur-xl border-t border-border-dim flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-left font-mono text-sm text-muted hover:text-ghost-white transition-colors"
                        >
                            <span className="text-cyber-blue mr-2">{'>'}</span>
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}
