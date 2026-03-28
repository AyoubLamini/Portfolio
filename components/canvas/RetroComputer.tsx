'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function RetroComputer() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const width = mount.clientWidth
        const height = mount.clientHeight

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(width, height)
        renderer.shadowMap.enabled = true
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 200)
        camera.position.set(0, 1, 5)
        camera.lookAt(0, 0, 0)

        const ambientLight = new THREE.AmbientLight(0x111122, 3)
        scene.add(ambientLight)

        const keyLight = new THREE.DirectionalLight(0x00d4ff, 4)
        keyLight.position.set(2, 3, 4)
        keyLight.castShadow = true
        scene.add(keyLight)

        const rimLight = new THREE.DirectionalLight(0x00ffee, 2)
        rimLight.position.set(-3, 1, -2)
        scene.add(rimLight)

        const bottomLight = new THREE.PointLight(0x0066ff, 1.5, 10)
        bottomLight.position.set(0, -2, 2)
        scene.add(bottomLight)

        const topAccentLight = new THREE.PointLight(0xa855f7, 1, 8)
        topAccentLight.position.set(1, 3, 0)
        scene.add(topAccentLight)

        const modelGroup = new THREE.Group()
        scene.add(modelGroup)

        const loader = new GLTFLoader()
        loader.load(
            '/models/retro_computer.glb',
            (gltf) => {
                const model = gltf.scene

                model.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh
                        const materials = Array.isArray(mesh.material)
                            ? mesh.material
                            : [mesh.material]
                        materials.forEach((mat) => {
                            mat.side = THREE.DoubleSide
                            mat.depthWrite = true
                            mat.depthTest = true
                        })
                        mesh.frustumCulled = false
                    }
                })

                const box = new THREE.Box3().setFromObject(model)
                const center = box.getCenter(new THREE.Vector3())
                const size = box.getSize(new THREE.Vector3())
                const maxDim = Math.max(size.x, size.y, size.z)
                const scale = 2.5 / maxDim
                model.scale.setScalar(scale)
                model.position.sub(center.multiplyScalar(scale))

                modelGroup.add(model)
            },
            undefined,
            (error) => {
                console.error('Error loading GLB model:', error)
            }
        )

        const particleCount = 60
        const particleGeo = new THREE.BufferGeometry()
        const particlePos = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2
            const radius = 2 + Math.random() * 0.8
            const height = (Math.random() - 0.5) * 3
            particlePos[i * 3] = Math.cos(angle) * radius
            particlePos[i * 3 + 1] = height
            particlePos[i * 3 + 2] = Math.sin(angle) * radius
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
        const particleMat = new THREE.PointsMaterial({
            color: 0x00d4ff,
            size: 0.02,
            transparent: true,
            opacity: 0.5,
        })
        const particleSystem = new THREE.Points(particleGeo, particleMat)
        scene.add(particleSystem)

        const canvas = renderer.domElement
        let isDragging = false
        let prevMouseX = 0
        let prevMouseY = 0
        const INITIAL_ROT_Y = -2.0268
        const INITIAL_ROT_X = -0.1440
        let dragRotY = INITIAL_ROT_Y
        let dragRotX = INITIAL_ROT_X
        let targetRotY = INITIAL_ROT_Y
        let targetRotX = INITIAL_ROT_X

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            isDragging = true
            prevMouseX = e.clientX
            prevMouseY = e.clientY
            canvas.style.cursor = 'grabbing'
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return
            e.preventDefault()
            e.stopPropagation()
            const deltaX = e.clientX - prevMouseX
            const deltaY = e.clientY - prevMouseY
            dragRotY += deltaX * 0.008
            dragRotX += deltaY * 0.008
            dragRotX = Math.max(-0.8, Math.min(0.8, dragRotX))
            prevMouseX = e.clientX
            prevMouseY = e.clientY
        }

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false
                canvas.style.cursor = 'grab'
            }
        }

        canvas.style.cursor = 'grab'
        canvas.addEventListener('mousedown', onMouseDown)
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mouseup', onMouseUp)
        canvas.addEventListener('mouseleave', onMouseUp)

        const onResize = () => {
            const w = mount.clientWidth
            const h = mount.clientHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
        window.addEventListener('resize', onResize)

        let animFrame: number
        let time = 0

        const animate = () => {
            animFrame = requestAnimationFrame(animate)
            time += 0.01

            targetRotY += (dragRotY - targetRotY) * 0.08
            targetRotX += (dragRotX - targetRotX) * 0.08

            modelGroup.rotation.y = targetRotY + Math.sin(time * 0.3) * 0.05
            modelGroup.rotation.x = targetRotX
            modelGroup.position.y = Math.sin(time * 0.5) * 0.1
            particleSystem.rotation.y = time * 0.08

            renderer.render(scene, camera)
        }

        animate()

        return () => {
            cancelAnimationFrame(animFrame)
            canvas.removeEventListener('mousedown', onMouseDown)
            canvas.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('mouseup', onMouseUp)
            canvas.removeEventListener('mouseleave', onMouseUp)
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
            className="w-full h-full relative z-10"
            style={{ minHeight: '400px', touchAction: 'none' }}
        />
    )
}
