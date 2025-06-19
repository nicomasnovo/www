import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// import { _day } from '@/utils/theme'
function init() {
  const colorByDay = () => {
    const day = new Date().getDay()
    //   const day = _day
    const colors = [
      0x2e409a, 0x2c5364, 0x621e19, 0x7e3a63, 0x2a5554, 0x5a0715, 0x780206
    ]

    const secColors = [
      0x5a0715, 0x0d1f26, 0x0d1f26, 0x050133, 0x06070c, 0x240b36, 0x061161
    ]
    return [colors[day], secColors[day]]
  }

  const canvas = document.getElementById('letter-canvas')
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  )
  camera.position.set(0, 1, 3)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  })

  renderer.setClearColor(colorByDay()[1], 0)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const loader = new GLTFLoader()
  let model

  loader.load('/assets/nico.glb', (gltf) => {
    model = gltf.scene
    scene.add(model)

    const box = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    box.getSize(size)

    model.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xccccccc,
          roughness: 0.3,
          metalness: 1
        })
      }
    })

    const cameraDistance = Math.max(size.x, size.y, size.z) * 1.5
    camera.position.set(0, size.y * 2.5, cameraDistance)
  })
  function createSpotLight(color, position, angle, penumbra) {
    const light = new THREE.SpotLight(color, 100)
    light.position.set(...position)
    light.angle = angle
    light.penumbra = penumbra
    light.decay = 2
    light.distance = 0

    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    light.shadow.camera.near = 1
    light.shadow.camera.far = 10
    light.shadow.focus = 1

    scene.add(light)
    return light
  }

  const [mainColor, secColor] = colorByDay()

  createSpotLight(mainColor, [0, 2, 2], Math.PI / 2, 1)
  createSpotLight(secColor, [0, 2, 1], Math.PI / 3, 0)

  const starGeometry = new THREE.BufferGeometry()
  const starCount = 10000
  const positions = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const starTexture = new THREE.TextureLoader().load('/assets/circle.png')
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    map: starTexture,
    transparent: true,
    opacity: 1
  })

  const starField = new THREE.Points(starGeometry, starMaterial)
  scene.add(starField)

  let rotationXDirection = -0.001

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  function animate() {
    requestAnimationFrame(animate)

    starField.rotation.x += 0.0005
    starField.rotation.y -= 0.0005

    if (model) {
      model.rotation.y += 0.01
      model.rotation.x += rotationXDirection
      if (model.rotation.x <= -1) rotationXDirection = 0.001
      else if (model.rotation.x >= 0) rotationXDirection = -0.001
    }

    renderer.render(scene, camera)
  }
  animate()
}
document.addEventListener('astro:page-load', (e) => {
  init()
})
