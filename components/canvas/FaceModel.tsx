'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FaceModel() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const width = mount.clientWidth
        const height = mount.clientHeight

        // Scene setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(width, height)
        renderer.shadowMap.enabled = true
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
        camera.position.set(0, 0, 4)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x111122, 2)
        scene.add(ambientLight)

        const frontLight = new THREE.DirectionalLight(0x00d4ff, 3)
        frontLight.position.set(0, 2, 3)
        scene.add(frontLight)

        const rimLight = new THREE.DirectionalLight(0x00ffee, 1.5)
        rimLight.position.set(-3, 1, -1)
        scene.add(rimLight)

        const bottomLight = new THREE.PointLight(0x0066ff, 1, 10)
        bottomLight.position.set(0, -3, 2)
        scene.add(bottomLight)

        // Build a stylized abstract head using geometry
        const headGroup = new THREE.Group()

        // Main head shape (slightly elongated sphere)
        const headGeo = new THREE.SphereGeometry(1, 32, 32)
        // Slightly flatten to make it more head-like
        headGeo.scale(0.85, 1.05, 0.9)

        const headMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a14,
            metalness: 0.8,
            roughness: 0.2,
            wireframe: false,
        })
        const head = new THREE.Mesh(headGeo, headMat)
        headGroup.add(head)

        // Wireframe overlay
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.08,
        })
        const wireHead = new THREE.Mesh(headGeo.clone(), wireMat)
        headGroup.add(wireHead)

        // Eye sockets (dark recesses)
        const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16)
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 })

        const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
        leftEye.position.set(-0.28, 0.1, 0.78)
        headGroup.add(leftEye)

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
        rightEye.position.set(0.28, 0.1, 0.78)
        headGroup.add(rightEye)

        // Eye glow
        const glowGeo = new THREE.SphereGeometry(0.06, 8, 8)
        const glowMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff })

        const leftGlow = new THREE.Mesh(glowGeo, glowMat)
        leftGlow.position.set(-0.28, 0.1, 0.82)
        headGroup.add(leftGlow)

        const rightGlow = new THREE.Mesh(glowGeo, glowMat)
        rightGlow.position.set(0.28, 0.1, 0.82)
        headGroup.add(rightGlow)

        // Add point lights at eyes for glow effect
        const leftEyeLight = new THREE.PointLight(0x00d4ff, 0.5, 1)
        leftEyeLight.position.copy(leftGlow.position)
        headGroup.add(leftEyeLight)

        const rightEyeLight = new THREE.PointLight(0x00d4ff, 0.5, 1)
        rightEyeLight.position.copy(rightGlow.position)
        headGroup.add(rightEyeLight)

        // Scan lines (horizontal rings)
        for (let i = 0; i < 5; i++) {
            const ringGeo = new THREE.TorusGeometry(0.88 - i * 0.02, 0.002, 4, 64)
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.15 - i * 0.02,
            })
            const ring = new THREE.Mesh(ringGeo, ringMat)
            ring.rotation.x = Math.PI / 2
            ring.position.y = 0.4 - i * 0.25
            headGroup.add(ring)
        }

        // Floating particles around head
        const particleCount = 80
        const particleGeo = new THREE.BufferGeometry()
        const particlePos = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2
            const radius = 1.4 + Math.random() * 0.4
            const height = (Math.random() - 0.5) * 2.5
            particlePos[i * 3] = Math.cos(angle) * radius
            particlePos[i * 3 + 1] = height
            particlePos[i * 3 + 2] = Math.sin(angle) * radius
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
        const particleMat = new THREE.PointsMaterial({
            color: 0x00d4ff,
            size: 0.02,
            transparent: true,
            opacity: 0.6,
        })
        const particleSystem = new THREE.Points(particleGeo, particleMat)
        headGroup.add(particleSystem)

        scene.add(headGroup)

        // Mouse tracking
        let mouseX = 0
        let mouseY = 0
        let targetRotX = 0
        let targetRotY = 0

        const onMouseMove = (e: MouseEvent) => {
            const rect = mount.getBoundingClientRect()
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
            mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2
        }
        window.addEventListener('mousemove', onMouseMove)

        // Resize
        const onResize = () => {
            const w = mount.clientWidth
            const h = mount.clientHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
        window.addEventListener('resize', onResize)

        // Animation
        let animFrame: number
        let time = 0

        const animate = () => {
            animFrame = requestAnimationFrame(animate)
            time += 0.01

            // Smooth mouse follow
            targetRotY += (mouseX * 0.3 - targetRotY) * 0.05
            targetRotX += (mouseY * 0.2 - targetRotX) * 0.05

            headGroup.rotation.y = targetRotY + Math.sin(time * 0.3) * 0.05
            headGroup.rotation.x = targetRotX

            // Pulse eye glow
            const pulse = Math.sin(time * 2) * 0.3 + 0.7
            leftEyeLight.intensity = pulse * 0.5
            rightEyeLight.intensity = pulse * 0.5

            // Rotate particles
            particleSystem.rotation.y = time * 0.1

            renderer.render(scene, camera)
        }

        animate()

        return () => {
            cancelAnimationFrame(animFrame)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className="w-full h-full"
            style={{ minHeight: '400px' }}
        />
    )
}
