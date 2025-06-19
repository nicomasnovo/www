import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const canvas = document.getElementById('letter-canvas')
const scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 1, 3)

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

const ambientLight = new THREE.AmbientLight(0x404040, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5).normalize()
scene.add(directionalLight)

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
        color: 0xff2e98,
        roughness: 0.2,
        metalness: 0.5
      })
    }
  })

  const cameraDistance = Math.max(size.x, size.y, size.z) * 1.5
  camera.position.set(0, size.y * 2, cameraDistance)
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

let rotationXDirection = -0.001

function animate() {
  requestAnimationFrame(animate)

  if (model) {
    model.rotation.y += 0.01

    model.rotation.x += rotationXDirection
    if (model.rotation.x <= -1) {
      rotationXDirection = 0.001
    } else if (model.rotation.x >= 0) {
      rotationXDirection = -0.001
    }
  }

  renderer.render(scene, camera)
}

animate()

canvas.onclick = function (e) {
  window.location.href = '/'
}

canvas.addEventListener('mouseenter', () => {
  canvas.style.cursor = 'pointer'
  const hoverPopup = document.createElement('div')
  hoverPopup.textContent = 'Wanna go back?'

  hoverPopup.style.position = 'fixed'
  hoverPopup.style.padding = '10px'
  hoverPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  hoverPopup.style.color = 'white'
  hoverPopup.style.borderRadius = '5px'
  hoverPopup.style.fontSize = '14px'
  hoverPopup.style.pointerEvents = 'none'
  hoverPopup.style.zIndex = '1000'

  document.body.appendChild(hoverPopup)

  const updatePosition = (event) => {
    hoverPopup.style.left = `${event.pageX + 10}px`
    hoverPopup.style.top = `${event.pageY + 10}px`
  }

  canvas.addEventListener('mousemove', updatePosition)

  canvas.addEventListener(
    'mouseleave',
    () => {
      hoverPopup.remove()
      hoverArea.removeEventListener('mousemove', updatePosition)
    },
    { once: true }
  )
})
