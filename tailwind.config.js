/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'neutral-bg': 'hsl(var(--neutral-bg) / <alpha-value>)',
                'neutral-surface': 'hsl(var(--neutral-surface) / <alpha-value>)',
                'neutral-border': 'hsl(var(--neutral-border) / <alpha-value>)',
                'neutral-ink': 'hsl(var(--neutral-ink) / <alpha-value>)',
                'neutral-ink-muted': 'hsl(var(--neutral-ink-muted) / <alpha-value>)',
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
