'use client'

import { useRef, useState } from 'react'
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
    const formRef = useRef<HTMLFormElement>(null)
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [focused, setFocused] = useState<string | null>(null)
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
        <section id="contact" className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] bg-cyber-blue/5 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold text-ghost-white">
                        Let&apos;s Build{' '}
                        <span className="gradient-text">Something</span>
                    </h2>
                    <p className="mt-6 text-muted text-lg max-w-xl mx-auto">
                        Have a project in mind? Want to collaborate? Or just want to talk tech?
                        I&apos;m always open to interesting conversations.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-16 h-16 rounded-full border-2 border-cyber-blue flex items-center justify-center mb-6"
                                    style={{ boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
                                    <span className="text-cyber-blue text-2xl">✓</span>
                                </div>
                                <h3 className="text-xl font-bold text-ghost-white mb-2">Message Sent!</h3>
                                <p className="text-muted">I&apos;ll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <label className="font-mono text-xs text-muted tracking-widest mb-2 block">
                                        NAME
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        className="w-full bg-white/3 border rounded-xl px-4 py-3 text-black placeholder-muted outline-none transition-all duration-300 font-mono text-sm"
                                        style={{
                                            borderColor: focused === 'name' ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)',
                                            boxShadow: focused === 'name' ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                                        }}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="font-mono text-xs text-muted tracking-widest mb-2 block">
                                        EMAIL
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        className="w-full bg-white/3 border rounded-xl px-4 py-3 text-black placeholder-muted outline-none transition-all duration-300 font-mono text-sm"
                                        style={{
                                            borderColor: focused === 'email' ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)',
                                            boxShadow: focused === 'email' ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                                        }}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="font-mono text-xs text-muted tracking-widest mb-2 block">
                                        MESSAGE
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        className="w-full bg-white/3 border rounded-xl px-4 py-3 text-black placeholder-muted outline-none transition-all duration-300 font-mono text-sm resize-none"
                                        style={{
                                            borderColor: focused === 'message' ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.08)',
                                            boxShadow: focused === 'message' ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                                        }}
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    data-cursor-hover
                                    className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-mono text-sm font-medium transition-all duration-300 relative overflow-hidden"
                                    style={{
                                        background: loading ? 'rgba(0,212,255,0.1)' : 'rgba(0,212,255,0.15)',
                                        border: '1px solid rgba(0,212,255,0.4)',
                                        color: '#00d4ff',
                                        boxShadow: '0 0 30px rgba(0,212,255,0.1)',
                                    }}
                                >
                                    <span className="relative z-10">
                                        {loading ? 'SENDING...' : 'SEND MESSAGE'}
                                    </span>
                                    {!loading && (
                                        <Send
                                            size={16}
                                            className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                                        />
                                    )}
                                    {loading && (
                                        <div className="w-4 h-4 border border-cyber-blue border-t-transparent rounded-full animate-spin" />
                                    )}
                                    <div className="absolute inset-0 bg-cyber-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>

                                {error && (
                                    <p className="text-red-400 font-mono text-xs text-center mt-2">
                                        Something went wrong. Please try again or email me directly.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>

                    <div className="space-y-6">
                        <p className="font-mono text-xs text-muted tracking-widest mb-8">FIND ME ON</p>
                        {socials.map((social) => {
                            const Icon = social.icon
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor-hover
                                    className="group flex items-center gap-4 p-5 rounded-xl border border-white/6 hover:border-cyber-blue/30 bg-white/2 hover:bg-cyber-blue/5 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-lg border border-white/10 group-hover:border-cyber-blue/40 flex items-center justify-center transition-all duration-300">
                                        <Icon size={18} className="text-muted group-hover:text-cyber-blue transition-colors duration-300" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-ghost-white font-medium text-sm group-hover:text-white transition-colors">
                                            {social.label}
                                        </p>
                                        <p className="text-muted text-xs font-mono mt-0.5">{social.handle}</p>
                                    </div>
                                    <ArrowUpRight
                                        size={16}
                                        className="text-muted group-hover:text-cyber-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                                    />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-mono text-xs text-muted">
                    © 2025 Ayoub Lamini. Built with love & code.
                </p>
                <p className="font-mono text-xs text-muted">
                    <span className="text-cyber-blue">LA</span> — Software Developer
                </p>
            </div>
        </section>
    )
}
