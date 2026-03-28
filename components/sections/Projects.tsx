'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WebProjectsCarousel from '@/components/sections/WebProjectsCarousel'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const projects = [
    {
        id: 'minishell',
        title: 'Minishell',
        category: 'Systems / C',
        description:
            'A fully functional POSIX-compliant shell built from scratch. Implements lexing, parsing, heredocs, pipes, redirections, signals, and built-in commands.',
        tags: ['C', 'POSIX', 'Processes', 'Signals', 'Parsing'],
        color: '#00d4ff',
        icon: '/bashIcon.png',
        github: 'https://github.com/AyoubLamini/42-Minishell',
        highlight: 'Handles 100% of bash edge cases tested',
    },
    {
        id: 'irc-server',
        title: 'IRC Server',
        category: 'Networking / C++',
        description:
            'RFC 2812-compliant IRC server supporting multiple clients, channels, operators, and real-time messaging via non-blocking I/O and poll().',
        tags: ['C++', 'Sockets', 'RFC 2812', 'poll()', 'Networking'],
        color: '#00ffee',
        icon: '/IrcIcon.png',
        github: 'https://github.com/ayoublamini/irc-server',
        highlight: 'Supports 100+ concurrent clients',
    },
    {
        id: 'cub3d',
        title: 'cub3D',
        category: 'Graphics / C',
        description:
            'A Wolfenstein-style 3D raycasting engine built from scratch using only a minimal graphics library. Features textured walls, sprites, and smooth movement.',
        tags: ['C', 'Raycasting', 'Math', 'Graphics', 'Game Engine'],
        color: '#ff6b35',
        icon: '/cubeIcon.png',
        github: 'https://github.com/Mazouz0/Cub3D_42',
        highlight: 'Pure raycasting — no OpenGL',
    },
    {
        id: 'inception',
        title: 'Inception',
        category: 'DevOps / Docker',
        description:
            'Multi-container Docker infrastructure using docker-compose. Sets up NGINX with TLS, WordPress with php-fpm, and MariaDB — each in its own container with custom Dockerfiles and persistent volumes.',
        tags: ['Docker', 'docker-compose', 'NGINX', 'WordPress', 'MariaDB'],
        color: '#a855f7',
        icon: '/dockerIcon.png',
        github: 'https://github.com/AyoubLamini/Inception',
        highlight: 'Full infra from scratch — no pre-built images',
    },
    {
        id: 'ft-transcendence',
        title: 'ft_transcendence',
        category: 'Full-Stack / Web',
        description:
            'The 42 common core capstone — a real-time multiplayer Pong game with OAuth authentication, live chat, friend system, match history, and user profiles. Built as a single-page application.',
        tags: ['TypeScript', 'Fastify', 'LiteSql', 'WebSockets', 'Docker'],
        color: '#22c55e',
        icon: '/pongIcon.png',
        github: 'https://github.com/YounesMoukhlij/ft_transcendence_42',
        highlight: '42 common core final project',
    },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })

    useEffect(() => {
        if (!cardRef.current) return

        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                },
            }
        )
    }, [index])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
        setTilt({ x, y })
    }

    const handleMouseLeave = () => {
        setHovered(false)
        setTilt({ x: 0, y: 0 })
    }

    return (
        <div
            ref={cardRef}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor-hover
            style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
            }}
        >
            <div
                className="relative h-full p-6 rounded-2xl border overflow-hidden"
                style={{
                    background: 'rgba(10, 10, 15, 0.8)',
                    borderColor: hovered ? `${project.color}40` : 'rgba(255,255,255,0.06)',
                    boxShadow: hovered ? `0 0 40px ${project.color}15, 0 20px 60px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
            >
                <div
                    className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                        opacity: hovered ? 1 : 0,
                    }}
                />

                <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: project.color,
                        opacity: hovered ? 0.04 : 0,
                    }}
                />

                <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={project.icon}
                            alt={project.title}
                            width={50}
                            height={40}
                        />
                    </div>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 text-sm font-mono transition-all duration-300 px-2 py-1 rounded-md border border-transparent"
                        style={{ color: 'rgba(136,136,136,0.8)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = project.color
                            e.currentTarget.style.borderColor = `${project.color}30`
                            e.currentTarget.style.backgroundColor = `${project.color}10`
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(136,136,136,0.8)'
                            e.currentTarget.style.borderColor = 'transparent'
                            e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        GitHub ↗
                    </a>
                </div>

                <div className="mb-1">
                    <p className="font-mono text-xs mb-2" style={{ color: project.color }}>
                        {project.category}
                    </p>
                    <h3 className="text-xl font-bold text-ghost-white mb-3 group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                </div>

                <div
                    className="mt-4 px-3 py-1.5 rounded-lg inline-block"
                    style={{ background: `${project.color}10`, border: `1px solid ${project.color}20` }}
                >
                    <p className="font-mono text-xs" style={{ color: project.color }}>
                        ✓ {project.highlight}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 rounded font-mono text-xs text-muted border border-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Projects() {
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!titleRef.current) return
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                },
            }
        )
    }, [])

    return (
        <section id="projects" className="relative py-32 px-6 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-cyber-blue/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div ref={titleRef} className="mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-ghost-white">
                        Selected{' '}
                        <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mt-4 text-muted max-w-xl">
                        From kernel-level C to production web apps — each project a different layer of the stack.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                <WebProjectsCarousel />
            </div>
        </section>
    )
}
