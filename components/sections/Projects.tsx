'use client'

import { useState, useEffect } from 'react'
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import PianoTextButton from '@/components/ui/PianoTextButton'

type Project = {
    id: string
    title: string
    category: string
    categoryLabel: string
    description: string
    tags: string[]
    github: string
    demo: boolean | null
    date: string | null
    isModalOpen: boolean
    canBePreviewed: boolean
    images: string[]
    video: string | null
}

const projects: Project[] = [
     {
        id: 'ft-transcendence',
        title: 'ft_transcendence',
        category: 'web',
        categoryLabel: 'Full-Stack / Web',
        description: 'A full-stack multiplayer Pong platform featuring real-time gameplay with WebSockets, OAuth authentication, live chat, friend management, match history, blockchain-backed scores, and customizable user profiles.',
        tags: ['TypeScript', 'NextJs', 'Fastify', 'WebSockets', 'Docker', 'Solidity', 'BLOCKCHAIN'],
        github: 'https://github.com/YounesMoukhlij/ft_transcendence_42',
        demo: true,
        date: 'January 2026',
        isModalOpen: false,
        canBePreviewed: true,
        images: ['/ft_trans/1.png', '/ft_trans/2.png', '/ft_trans/3.png', '/ft_trans/4.png'],
        video: '/ft_trans/vid.mp4'
    },
    {
        id: 'api-monitor',
        title: 'API Monitor SaaS',
        category: 'web',
        categoryLabel: 'Full-Stack / Web',
        description: 'A monitoring platform for APIs and servers featuring uptime checks, response time tracking, authentication and refresh token, and incident notification systemm through email and Discord.',
        tags: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind'],
        github: 'https://github.com/AyoubLamini/ApiMonitor',
        demo: null,
        date: 'June 2026',
        isModalOpen: false,
        canBePreviewed: true,
        images: ['/Api_watch/1.png', '/Api_watch/2.png', '/Api_watch/3.png', '/Api_watch/4.png', '/Api_watch/5.png', '/Api_watch/6.png', '/Api_watch/7.png', '/Api_watch/8.png'],
        video: null
    },
    {
        id: 'minishell',
        title: 'Minishell',
        category: 'systems',
        categoryLabel: 'Systems / C',
        description: 'A fully functional POSIX-compliant shell built from scratch. Implements lexing, parsing, heredocs, pipes, redirections, signals, and built-in commands.',
        tags: ['C', 'POSIX', 'Processes', 'Signals', 'Parsing'],
        github: 'https://github.com/AyoubLamini/42-Minishell',
        demo: null,
        date: 'July 2024',
        isModalOpen: false,
        canBePreviewed: false,
        images: ['/bashIcon.png'],
        video: null
    },
    {
        id: 'irc-server',
        title: 'IRC Server',
        category: 'systems',
        categoryLabel: 'Networking / C++',
        description: 'RFC 2812-compliant IRC server supporting multiple clients, channels, operators, and real-time messaging via non-blocking I/O and poll().',
        tags: ['C++', 'Sockets', 'poll()', 'Networking', 'RFC 2812'],
        github: 'https://github.com/ayoublamini/irc-server',
        demo: null,
        date: 'May 2025',
        isModalOpen: false,
        canBePreviewed: false,
        images: ['/IrcIcon.png'],
        video: null
    },
    {
        id: 'cub3d',
        title: 'cub3D',
        category: 'systems',
        categoryLabel: 'Graphics / C',
        description: 'A Wolfenstein-style 3D raycasting engine built from scratch. Features textured walls, sprites, rendering calculations, and collision systems.',
        tags: ['C', 'Raycasting', 'Math', 'Graphics'],
        github: 'https://github.com/Mazouz0/Cub3D_42',
        demo: null,
        date: 'December 2024',
        isModalOpen: false,
        canBePreviewed: false,
        images: ['/cubeIcon.png'],
        video: null
    },
    {
        id: 'inception',
        title: 'Inception',
        category: 'web',
        categoryLabel: 'DevOps / Docker',
        description: 'Multi-container Docker infrastructure using docker-compose. Configures NGINX with TLS, WordPress with php-fpm, MariaDB, and custom Dockerfiles.',
        tags: ['Docker', 'docker-compose', 'NGINX', 'WordPress', 'MariaDB'],
        github: 'https://github.com/AyoubLamini/Inception',
        demo: null,
        date: 'August 2025',
        isModalOpen: false,
        canBePreviewed: false,
        images: ['/dockerIcon.png'],
        video: null
    },
    {
        id: 'vacations-1337',
        title: '1337 Vacations',
        category: 'web',
        categoryLabel: 'Web / React',
        description: 'Vacation management frontend for 1337 school students. features both student vacation date picker and admin dashboard for requests management.',
        tags: ['React.js', 'HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/AyoubLamini/1337-Vacations',
        demo: null,
        date: 'April 2023',
        isModalOpen: false,
        canBePreviewed: true,
        images: ['/1337-vacation/1.png', '/1337-vacation/2.png', '/1337-vacation/3.png',  '/1337-vacation/5.png', '/1337-vacation/6.png', '/1337-vacation/7.png', '/1337-vacation/8.png', '/1337-vacation/9.png', '/1337-vacation/10.png'],
        video: null 
    },
    {
        id: 'quick-annonce',
        title: 'QuickAnnonce',
        category: 'web',
        categoryLabel: 'Web / React & Laravel',
        description: 'My first full stack Web App, features CRUD operations through API, Laravel passport token management, and React friendly UI',
        tags: ['Laravel', 'React.js', 'Axios', 'MySQL', 'Passport'],
        github: 'https://github.com/AyoubLamini/QuickAnnonce',
        demo: null,
        date: 'July 2023',
        isModalOpen: false,
        canBePreviewed: false,
        images: [],
        video: null
    }
]

export default function Projects() {
    const [filter, setFilter] = useState<'all' | 'systems' | 'web'>('all')
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    const filteredProjects = projects.filter(
        (project) => filter === 'all' || project.category === filter
    )


    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [activeProject])


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveProject(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const openPreview = (project: Project) => {
        setActiveProject(project)
        setCurrentSlideIndex(0)
    }

    const activeMedia = activeProject ? [
        ...(activeProject.video ? [{ type: 'video', src: activeProject.video }] : []),
        ...(activeProject.images ? activeProject.images.map(img => ({ type: 'image', src: img })) : [])
    ] : [];

    return (
        <section id="projects" className="py-24 border-t border-neutral-border bg-neutral-bg px-6">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="font-sans font-bold text-4xl sm:text-5xl text-neutral-ink tracking-tight">
                            Projects
                        </h2>
                    </div>


                    <div className="flex items-center gap-1 border border-neutral-border p-1 bg-neutral-surface rounded-md self-start md:self-auto">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 text-xs font-sans font-medium rounded-md transition-all ${
                                filter === 'all'
                                    ? 'bg-neutral-bg text-neutral-ink shadow-sm'
                                    : 'text-neutral-ink-muted hover:text-neutral-ink'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('systems')}
                            className={`px-3 py-1 text-xs font-sans font-medium rounded-md transition-all ${
                                filter === 'systems'
                                    ? 'bg-neutral-bg text-neutral-ink shadow-sm'
                                    : 'text-neutral-ink-muted hover:text-neutral-ink'
                            }`}
                        >
                            Systems (C/C++)
                        </button>
                        <button
                            onClick={() => setFilter('web')}
                            className={`px-3 py-1 text-xs font-sans font-medium rounded-md transition-all ${
                                filter === 'web'
                                    ? 'bg-neutral-bg text-neutral-ink shadow-sm'
                                    : 'text-neutral-ink-muted hover:text-neutral-ink'
                            }`}
                        >
                            Web & DevOps
                        </button>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group flex flex-col justify-between p-6 rounded-md border border-neutral-border bg-neutral-surface hover:border-neutral-ink-muted/30 transition-colors duration-150"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <span className="font-mono text-[10px] text-primary font-semibold tracking-wider uppercase">
                                        {project.categoryLabel}
                                    </span>
                                </div>

                                <h3 className="font-sans font-semibold text-lg text-neutral-ink mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-ink-muted text-sm leading-relaxed mb-6 text-pretty">
                                    {project.description}
                                </p>
                            </div>

                            <div>

                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 rounded font-mono text-[10px] text-neutral-ink-muted bg-neutral-bg border border-neutral-border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>


                               <div className="flex items-center gap-4 pt-4 border-t border-neutral-border/50">
                                  {project.canBePreviewed && (
                                      <button
                                          onClick={(e) => {
                                              e.stopPropagation()
                                              openPreview(project)
                                          }}
                                          className="text-xs font-mono text-neutral-ink-muted hover:text-neutral-ink transition-colors"
                                      >
                                          <PianoTextButton  />
                                      </button>
                                  )}
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 text-xs font-mono text-neutral-ink-muted hover:text-neutral-ink transition-colors ml-auto"
                                    >
                                        <Github size={12} /> github
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {activeProject && (
                <div className="fixed inset-0 bg-neutral-bg/90 backdrop-blur-sm z-[150] flex items-center justify-center p-4 md:p-8">

                    <div className="relative bg-neutral-surface border border-neutral-border rounded-md  max-w-7xl h-[90vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setActiveProject(null)}
                            className="absolute top-4 right-4 z-50 p-1.5 bg-neutral-bg/85 border border-neutral-border hover:border-neutral-ink-muted rounded-full text-neutral-ink-muted hover:text-neutral-ink transition-all"
                            aria-label="Close modal"
                        >
                            <X size={16} />
                        </button>

                        <div className="w-full md:w-6/8 h-[45%] md:h-full bg-neutral-bg border-b md:border-b-0 md:border-r border-neutral-border relative flex items-center justify-center p-6 select-none">
                            {activeMedia.length > 0 ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {activeMedia[currentSlideIndex]?.type === 'video' ? (
                                        <video
                                            src={activeMedia[currentSlideIndex].src}
                                            controls
                                            autoPlay
                                            muted
                                            className="max-w-full max-h-full object-contain rounded-md"
                                        />
                                    ) : (
                                        <img
                                            src={activeMedia[currentSlideIndex]?.src}
                                            alt={`Media will be added soon`}
                                            className="max-w-full max-h-full object-contain rounded-md"
                                        />
                                    )}

                                    {activeMedia.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setCurrentSlideIndex((prev) =>
                                                        prev === 0 ? activeMedia.length - 1 : prev - 1
                                                    )
                                                }}
                                                className="absolute left-2 p-1.5 bg-neutral-surface/90 border border-neutral-border hover:border-neutral-ink-muted rounded-full text-neutral-ink-muted hover:text-neutral-ink transition-colors"
                                                aria-label="Previous slide"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setCurrentSlideIndex((prev) =>
                                                        prev === activeMedia.length - 1 ? 0 : prev + 1
                                                    )
                                                }}
                                                className="absolute right-2 p-1.5 bg-neutral-surface/90 border border-neutral-border hover:border-neutral-ink-muted rounded-full text-neutral-ink-muted hover:text-neutral-ink transition-colors"
                                                aria-label="Next slide"
                                            >
                                                <ChevronRight size={18} />
                                            </button>

                                            <div className="absolute bottom-2 flex gap-1.5">
                                                {activeMedia.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentSlideIndex(idx)}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                                                            idx === currentSlideIndex
                                                                ? 'bg-primary w-3'
                                                                : 'bg-neutral-border hover:bg-neutral-ink-muted/50'
                                                        }`}
                                                        aria-label={`Go to slide ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <span className="font-mono text-xs text-neutral-ink-muted">No preview image</span>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 h-[55%] md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                            <div>
                                <span className="font-mono text-[10px] text-primary font-semibold tracking-wider uppercase">
                                    {activeProject.categoryLabel}
                                </span>
                                <h3 className="font-sans font-bold text-2xl text-neutral-ink mt-1">
                                    {activeProject.title}
                                </h3>
                                <p className="text-neutral-ink-muted text-sm leading-relaxed mt-4">
                                    {activeProject.description}
                                </p>

                                <div className="mt-6">
                                    <h4 className="font-mono text-[10px] text-neutral-ink-muted uppercase tracking-wider mb-2">Technologies</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeProject.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded font-mono text-[10px] text-neutral-ink-muted bg-neutral-bg border border-neutral-border"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-neutral-border/50 pt-4 space-y-2">
                                    <div className="flex justify-between text-xs font-sans">
                                        <span className="text-neutral-ink-muted">Date</span>
                                        <span className="text-neutral-ink font-medium">
                                            {activeProject.date}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs font-sans">
                                        <span className="text-neutral-ink-muted">Source Code</span>
                                        <a
                                            href={activeProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline font-mono text-[11px]"
                                        >
                                            github.com ↗
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-neutral-border/50">
                                <button
                                    onClick={() => setActiveProject(null)}
                                    className="flex-1 py-2 text-xs font-sans font-medium text-neutral-ink border border-neutral-border rounded-md bg-neutral-bg hover:bg-neutral-surface transition-colors"
                                >
                                    Close
                                </button>
                                <a
                                    href={activeProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2 text-xs font-sans font-medium text-neutral-bg bg-primary hover:bg-primary-hover rounded-md text-center transition-colors"
                                >
                                    View Source
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
