'use client'

import { useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
     {
        id: 'ft-transcendence',
        title: 'ft_transcendence',
        category: 'web',
        categoryLabel: 'Full-Stack / Web',
        description: 'A full-stack multiplayer Pong platform featuring real-time gameplay with WebSockets, OAuth authentication, live chat, friend management, match history, blockchain-backed scores, and customizable user profiles.',
        tags: ['TypeScript', 'NextJs', 'Fastify', 'WebSockets', 'Docker', 'Solidity', 'BLOCKCHAIN'],
        github: 'https://github.com/YounesMoukhlij/ft_transcendence_42',
        demo: null,
        ongoing: false,
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
        ongoing: false,
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
        ongoing: false,
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
        ongoing: false,
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
        ongoing: false,
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
        ongoing: false,
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
        ongoing: false,
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
        ongoing: false,
    }
]

export default function Projects() {
    const [filter, setFilter] = useState<'all' | 'systems' | 'web'>('all')

    const filteredProjects = projects.filter(
        (project) => filter === 'all' || project.category === filter
    )

    return (
        <section id="projects" className="py-24 border-t border-neutral-border bg-neutral-bg px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="font-sans font-bold text-4xl sm:text-5xl text-neutral-ink tracking-tight">
                            Projects
                        </h2>
                        {/* <p className="mt-3 text-neutral-ink-muted max-w-lg leading-relaxed text-sm">
                            A curated selection of my work spanning low-level C programming, networking, graphics engines, container DevOps, and modern full-stack web applications.
                        </p> */}
                    </div>

                    {/* Filter Bar */}
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

                {/* Projects Grid */}
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
                                    {project.ongoing && (
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-bg border border-neutral-border text-neutral-ink-muted font-mono text-[9px] uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                            Active
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-sans font-semibold text-lg text-neutral-ink mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-ink-muted text-sm leading-relaxed mb-6 text-pretty">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                {/* Tech Tags */}
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

                                {/* Actions */}
                                <div className="flex items-center gap-4 pt-4 border-t border-neutral-border/50">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-mono text-neutral-ink-muted hover:text-neutral-ink transition-colors"
                                    >
                                        <Github size={14} /> github ↗
                                    </a>
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-mono text-neutral-ink-muted hover:text-neutral-ink transition-colors"
                                        >
                                            <ExternalLink size={14} /> demo ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
