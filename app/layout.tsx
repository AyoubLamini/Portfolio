import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Ayoub Lamini — Software Developer',
    description: 'Full-Stack Developer & Systems Programmer. Specializing in C, C++, Next.js, and modern web technologies. 1337 (42 Network) & ISTA ISGI.',
    keywords: ['Ayoub Lamini', 'Software Developer', 'Systems Programmer', 'C', 'C++', 'Next.js', 'React', '1337', 'ISTA ISGI', 'Morocco'],
    authors: [{ name: 'Ayoub Lamini' }],
    openGraph: {
        title: 'Ayoub Lamini — Software Developer',
        description: 'Full-Stack Developer & Systems Programmer',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
