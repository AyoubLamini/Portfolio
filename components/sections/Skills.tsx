'use client'

const skillCategories = [
    {
        title: 'Systems & Low-Level',
        description: 'Memory management, systems programming, and POSIX development.',
        skills: ['C', 'C++', 'Linux / Unix', 'Shell Scripting', 'Makefile / CMake', 'GDB / Valgrind', 'Network Sockets'],
    },
    {
        title: 'Web & Databases',
        description: 'Building high-performance, real-time web applications and relational databases.',
        skills: ['TypeScript', 'React / Next.js', 'Node.js / NestJS', 'Fastify', 'WebSockets', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    },
    {
        title: 'DevOps & Workflow',
        description: 'Infrastructure management, containerized setups, and version control.',
        skills: ['Docker / Compose', 'NGINX', 'Redis', 'Git', 'CI/CD Pipelines', 'REST APIs', 'Figma'],
    },
]

export default function Skills() {
    return (
        <section id="skills" className="py-24 border-t border-neutral-border bg-neutral-bg px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <h2 className="font-sans font-bold text-4xl sm:text-5xl text-neutral-ink tracking-tight">
                        Technical Stack
                    </h2>
                    <p className="mt-3 text-neutral-ink-muted max-w-lg leading-relaxed text-sm">
                        
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map((category) => (
                        <div
                            key={category.title}
                            className="p-6 rounded-md border border-neutral-border bg-neutral-surface flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-sans font-semibold text-lg text-neutral-ink mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-neutral-ink-muted text-xs leading-relaxed mb-6">
                                    {category.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 rounded font-mono text-[11px] text-neutral-ink-muted bg-neutral-bg border border-neutral-border"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
