/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'neutral-bg': '#09090b',
                'neutral-surface': '#18181b',
                'neutral-border': '#27272a',
                'neutral-ink': '#f4f4f5',
                'neutral-ink-muted': '#a1a1aa',
                'primary': '#4f46e5',
                'primary-hover': '#4338ca',
                'primary-light': '#818cf8',
            },
            fontFamily: {
                sans: ['Manrope', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
