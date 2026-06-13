'use client'

import { useState } from 'react'
import Image from 'next/image'

/* ─────────────────────────────────────────────────────────────
   Data — update links/images as needed
───────────────────────────────────────────────────────────── */
const webProjects = [
    {
        id: 'dashboard',
        title: '1337 Vacations',
        subtitle: 'Student vacation management platform',
        description: 'Frontend for 1337 students to manage and track vacations. Implements real-time updates, light & dark mode, and React hooks.',
        tags: ['React.js', 'HTML', 'CSS', 'Hooks', 'Web App'],
        accentColor: '#00d4ff',
        link: 'https://github.com/AyoubLamini/1337-Vacations',
        imageBg: '/1337-vacations.png',
        shape: '◈',
        ongoing: false,
    },
    {
        id: 'ecommerce',
        title: 'QuickAnnonce',
        subtitle: 'Avito-like classifieds platform',
        description: 'Full-stack web app for posting and managing ads with authentication, CRUD operations, and a React frontend communicating with Laravel API via Axios.',
        tags: ['Laravel', 'React.js', 'Axios', 'MySQL', 'Passport', 'CRUD'],
        accentColor: '#ff6b35',
        link: 'https://github.com/AyoubLamini/QuickAnnonce',
        imageBg: '/pciture123.png',
        shape: '⬡',
        ongoing: false,
    },
    {
        id: 'saas',
        title: 'API Monitor SaaS',
        subtitle: 'API monitoring platform in progress',
        description: 'A production-ready SaaS platform for monitoring APIs, managing teams, and tracking service performance. Currently under development with authentication and dashboards.',
        tags: ['Next.js', 'TypeScript', 'NestJS', 'API', 'postgresql', 'prisma', 'react-query', 'tailwind'],
        accentColor: '#22c55e',
        link: 'https://github.com/AyoubLamini/ApiMonitor',
        imageBg: '/Api_watch.png',
        shape: '⬢',
        ongoing: true,
    },

]

/* ─────────────────────────────────────────────────────────────
   Constants — tweak these for layout feel
───────────────────────────────────────────────────────────── */
const CARD_W = 340          // card width  (px)
const CARD_H = 500          // card height (px)
const X_STEP = 240          // horizontal gap between slots
const ROT_DEG = 15          // rotation per slot (deg)
const SCALE_STEP = 0.14     // scale reduction per slot away from center

/* ─────────────────────────────────────────────────────────────
   Card component
───────────────────────────────────────────────────────────── */
interface CardProps {
    project: typeof webProjects[0]
    position: number            // integer: card index − active index
    isActive: boolean
    onHover: () => void
}

function ProjectCard({ project, position, isActive, onHover }: CardProps) {
    const [btnHovered, setBtnHovered] = useState(false)
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const abs = Math.abs(position)

    // ── transform values derived purely from position integer ──
    const translateX = position * X_STEP
    const rotate = position * ROT_DEG
    const scale = Math.max(0.55, 1 - abs * SCALE_STEP)
    const zIndex = 50 - abs * 10
    const opacity = abs >= 3 ? 0 : abs === 2 ? 0.6 : 1

    return (
        <div
            onMouseEnter={onHover}
            onClick={() => window.open(project.link, '_blank')}
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                transformOrigin: 'bottom center',
                transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease',
                zIndex,
                opacity,
                cursor: 'pointer',
                willChange: 'transform',
            }}
        >
            {/* ── Card shell ── */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 24,
                    overflow: 'hidden',
                    backgroundColor: '#0a0a0f',
                    border: `1px solid ${isActive ? `${project.accentColor}55` : `${project.accentColor}18`}`,
                    boxShadow: isActive
                        ? `0 32px 72px -8px ${project.accentColor}35, 0 0 0 1px ${project.accentColor}18`
                        : '0 8px 32px rgba(0,0,0,0.55)',
                    transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
                }}
            >
                {/* ── Preview Toggle Button ── */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsPreviewMode(!isPreviewMode)
                    }}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isPreviewMode ? project.accentColor : '#fff',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)',
                        transition: 'color 0.3s, background 0.3s',
                    }}
                    title="Toggle Full Image Preview"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isPreviewMode ? (
                            <>
                                <polyline points="4 14 10 14 10 20"></polyline>
                                <polyline points="20 10 14 10 14 4"></polyline>
                                <line x1="14" y1="10" x2="21" y2="3"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </>
                        ) : (
                            <>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <polyline points="9 21 3 21 3 15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </>
                        )}
                    </svg>
                </button>

                {/* ── Ongoing Badge ── */}
                {project.ongoing && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            zIndex: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(234,179,8,0.4)',
                            borderRadius: 999,
                            padding: '4px 10px',
                        }}
                    >
                        <span
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#eab308',
                                display: 'inline-block',
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        />
                        <span
                            style={{
                                fontSize: 9,
                                fontFamily: 'JetBrains Mono, monospace',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: '#eab308',
                            }}
                        >
                            In Progress
                        </span>
                    </div>
                )}

                {/* ── "Image" — Project Background ── */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: isPreviewMode ? '100%' : '55%',
                        transition: 'height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                >
                    <Image
                        src={project.imageBg}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority={isActive}
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>

                {/* ── Top accent line ── */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                        opacity: isActive ? 0.9 : 0.25,
                        transition: 'opacity 0.4s ease',
                    }}
                />

                {/* ── Bottom gradient overlay (for text readability) ── */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '65%',
                        background: `linear-gradient(to top, #0a0a0f 20%, rgba(10,10,15,0.8) 60%, transparent 100%)`,
                        pointerEvents: 'none',
                        opacity: isPreviewMode ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                    }}
                />

                {/* ── Text overlay — fixed at card bottom ── */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '20px 20px 22px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        opacity: isPreviewMode ? 0 : 1,
                        transform: isPreviewMode ? 'translateY(20px)' : 'translateY(0)',
                        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        pointerEvents: isPreviewMode ? 'none' : 'auto',
                    }}
                >
                    {/* Subtitle pill */}
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 10,
                            fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: project.accentColor,
                            background: `${project.accentColor}18`,
                            border: `1px solid ${project.accentColor}30`,
                            borderRadius: 999,
                            padding: '3px 10px',
                            width: 'fit-content',
                        }}
                    >
                        <span
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: project.accentColor,
                                display: 'inline-block',
                            }}
                        />
                        {project.subtitle}
                    </span>

                    {/* Title */}
                    <h3
                        style={{
                            margin: 0,
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#e8e8f0',
                            lineHeight: 1.2,
                        }}
                    >
                        {project.title}
                    </h3>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: 9,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    color: '#9ca3af',
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 6,
                                    padding: '2px 7px',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* View Project button */}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setBtnHovered(true)}
                        onMouseLeave={() => setBtnHovered(false)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            color: isActive ? project.accentColor : '#6b7280',
                            background: isActive
                                ? `${project.accentColor}18`
                                : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${isActive ? `${project.accentColor}40` : 'rgba(255,255,255,0.08)'}`,
                            borderRadius: 10,
                            padding: '8px 0',
                            textDecoration: 'none',
                            transition: 'background 0.3s ease, color 0.3s ease, transform 0.2s ease',
                            transform: btnHovered ? 'translateY(-1px)' : 'none',
                        }}
                    >
                        View Project
                        <span style={{ display: 'inline-block', transition: 'transform 0.2s ease', transform: btnHovered ? 'translateX(3px)' : 'none' }}>→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   Carousel
───────────────────────────────────────────────────────────── */
export default function WebProjectsCarousel() {
    const [activeIndex, setActiveIndex] = useState(2) // start with center card

    return (
        <div style={{ marginTop: 96 }}>

            {/* ── Section Header ── */}
            <div style={{ marginBottom: 56, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                    className="font-mono"
                    style={{
                        fontSize: 12,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#00d4ff',
                    }}
                >
                    — Web Development
                </span>
                <h3
                    className="text-ghost-white"
                    style={{ margin: 0, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700 }}
                >
                    Full-Stack{' '}
                    <span className="gradient-text">Web Apps</span>
                </h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: 14, maxWidth: 480 }}>
                    Modern web experiences built with cutting-edge frameworks, real-time capabilities, and premium UI design.
                </p>
            </div>

            {/* ── Stage ── */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: CARD_H + 60,
                    perspective: '1000px',
                    // No overflow:hidden → cards fully visible, no clips
                }}
            >
                {webProjects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        position={i - activeIndex}
                        isActive={i === activeIndex}
                        onHover={() => setActiveIndex(i)}
                    />
                ))}
            </div>

            {/* ── Controls ── */}
            <div
                style={{
                    marginTop: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                }}
            >
                {/* Prev */}
                <NavButton
                    onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                    disabled={activeIndex === 0}
                    dir="left"
                />

                {/* Dots */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {webProjects.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Select ${p.title}`}
                            style={{
                                width: i === activeIndex ? 26 : 6,
                                height: 6,
                                borderRadius: 999,
                                background: i === activeIndex
                                    ? webProjects[activeIndex].accentColor
                                    : 'rgba(255,255,255,0.15)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'width 0.4s cubic-bezier(0.25,0.46,0.45,0.94), background 0.4s ease',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Next */}
                <NavButton
                    onClick={() => setActiveIndex((i) => Math.min(webProjects.length - 1, i + 1))}
                    disabled={activeIndex === webProjects.length - 1}
                    dir="right"
                />
            </div>

            {/* ── Counter label ── */}
            <p
                className="font-mono"
                style={{
                    marginTop: 16,
                    textAlign: 'center',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#4b5563',
                }}
            >
                {activeIndex + 1} / {webProjects.length} — {webProjects[activeIndex].title}
            </p>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   Small helper: arrow button
───────────────────────────────────────────────────────────── */
function NavButton({
    onClick,
    disabled,
    dir,
}: {
    onClick: () => void
    disabled: boolean
    dir: 'left' | 'right'
}) {
    const [hov, setHov] = useState(false)
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            aria-label={dir === 'left' ? 'Previous' : 'Next'}
            style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: `1px solid ${disabled ? 'rgba(255,255,255,0.05)' : hov ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}`,
                background: disabled ? 'rgba(255,255,255,0.02)' : hov ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                color: disabled ? '#2a2a3a' : '#e8e8f0',
                cursor: disabled ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                flexShrink: 0,
            }}
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {dir === 'left'
                    ? <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    : <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                }
            </svg>
        </button>
    )
}
