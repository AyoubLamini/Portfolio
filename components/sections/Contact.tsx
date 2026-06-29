'use client'

import { useState } from 'react'
import { Github, Linkedin, Mail, Send, ArrowUpRight } from 'lucide-react'

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/ayoublamini',
        icon: Github,
        handle: '@ayoublamini',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/ayoublamini',
        icon: Linkedin,
        handle: 'Ayoub Lamini',
    },
    {
        label: 'Email',
        href: 'mailto:ayoublamini.dev@gmail.com',
        icon: Mail,
        handle: 'ayoublamini.dev@gmail.com',
    },
]

export default function Contact() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(false)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formState.email)) {
            setError(true)
            return
        }

        setLoading(true)
        try {
            const res = await fetch('https://formspree.io/f/xbdpgryl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            })
            if (res.ok) {
                setSubmitted(true)
                setFormState({ name: '', email: '', message: '' })
            } else {
                setError(true)
            }
        } catch {
            setError(true)
        }
        setLoading(false)
    }

    return (
        <section id="contact" className="py-24 border-t border-neutral-border bg-neutral-bg px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="font-sans font-bold text-4xl sm:text-5xl text-neutral-ink tracking-tight">
                        Get In Touch
                    </h2>
                    <p className="mt-3 text-neutral-ink-muted max-w-lg leading-relaxed text-sm">
                        want to collaborate, build something together ? or just want to connect, reach out and say Hi!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Form */}
                    <div>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center p-12 border border-neutral-border bg-neutral-surface rounded-md text-center">
                                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-4">
                                    <span className="text-primary text-lg">✓</span>
                                </div>
                                <h3 className="font-sans font-semibold text-lg text-neutral-ink mb-1">Message Sent</h3>
                                <p className="text-neutral-ink-muted text-sm">I&apos;ll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="font-mono text-[10px] text-neutral-ink-muted tracking-wider uppercase mb-2 block">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-neutral-surface border border-neutral-border text-neutral-ink placeholder-neutral-ink-muted/40 rounded-md px-4 py-2.5 text-sm outline-none focus:border-primary transition-all duration-150"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="font-mono text-[10px] text-neutral-ink-muted tracking-wider uppercase mb-2 block">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-neutral-surface border border-neutral-border text-neutral-ink placeholder-neutral-ink-muted/40 rounded-md px-4 py-2.5 text-sm outline-none focus:border-primary transition-all duration-150"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="font-mono text-[10px] text-neutral-ink-muted tracking-wider uppercase mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-neutral-surface border border-neutral-border text-neutral-ink placeholder-neutral-ink-muted/40 rounded-md px-4 py-2.5 text-sm outline-none focus:border-primary transition-all duration-150 resize-none"
                                        placeholder="Briefly describe your project or opportunity..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-sans text-sm font-medium bg-primary text-neutral-bg hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                    {!loading && <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />}
                                </button>

                                {error && (
                                    <p className="text-red-400 font-mono text-xs text-center mt-2">
                                        Something went wrong. Please try again or email me directly.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                        <p className="font-mono text-[10px] text-neutral-ink-muted tracking-wider uppercase mb-4">Connect</p>
                        {socials.map((social) => {
                            const Icon = social.icon
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 p-4 rounded-md border border-neutral-border bg-neutral-surface hover:border-neutral-ink-muted/30 transition-all duration-150"
                                >
                                    <div className="w-9 h-9 rounded-md bg-neutral-bg border border-neutral-border flex items-center justify-center transition-all duration-150">
                                        <Icon size={16} className="text-neutral-ink-muted group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-neutral-ink font-medium text-sm transition-colors">
                                            {social.label}
                                        </p>
                                        <p className="text-neutral-ink-muted text-xs font-mono mt-0.5">{social.handle}</p>
                                    </div>
                                    <ArrowUpRight
                                        size={14}
                                        className="text-neutral-ink-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                                    />
                                </a>
                            )
                        })}
                    </div>
                </div>

                {/* Footer credit */}
                <div className="mt-24 pt-8 border-t border-neutral-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-[11px] text-neutral-ink-muted">
                        © 2026 Ayoub Lamini. Built with code.
                    </p>
                    <p className="font-mono text-[11px] text-neutral-ink-muted">
                        Ayoub Lamini — Software Developer
                    </p>
                </div>
            </div>
        </section>
    )
}
