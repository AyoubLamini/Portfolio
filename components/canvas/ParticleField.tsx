'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.setSize(window.innerWidth, window.innerHeight)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 3

        // Particles
        const count = 2500
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // Spread in a sphere
            const radius = Math.random() * 5 + 1
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i3 + 2] = radius * Math.cos(phi)

            // Color: cyan to blue gradient
            const t = Math.random()
            colors[i3] = t * 0.0 + (1 - t) * 0.0       // R
            colors[i3 + 1] = t * 0.83 + (1 - t) * 0.6  // G
            colors[i3 + 2] = t * 1.0 + (1 - t) * 0.73  // B

            sizes[i] = Math.random() * 2 + 0.5
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        const material = new THREE.PointsMaterial({
            size: 0.015,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        // Mouse tracking
        let mouseX = 0
        let mouseY = 0
        let targetX = 0
        let targetY = 0

        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', onMouseMove)

        // Resize
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize)

        // Animation loop
        let animFrame: number
        let time = 0

        const animate = () => {
            animFrame = requestAnimationFrame(animate)
            time += 0.001

            // Smooth mouse follow
            targetX += (mouseX - targetX) * 0.02
            targetY += (mouseY - targetY) * 0.02

            particles.rotation.y = time * 0.05 + targetX * 0.3
            particles.rotation.x = time * 0.02 + targetY * 0.2

            renderer.render(scene, camera)
        }

        animate()

        return () => {
            cancelAnimationFrame(animFrame)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    )
}
