import * as THREE from 'three'
;(function () {
  function createRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    return renderer
  }

  function createCamera() {
    return new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  }

  function createStarField() {
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 10000
    const positions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )

    const starTexture = new THREE.TextureLoader().load('/assets/circle.png')

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      map: starTexture,
      transparent: true,
      opacity: 1
    })

    return new THREE.Points(starGeometry, starMaterial)
  }

  function initThreeScene(container) {
    const canvReference = document.getElementById('space')
    const scene = new THREE.Scene()
    const camera = createCamera()
    const renderer = createRenderer(canvReference)
    container.appendChild(renderer.domElement)

    const starField = createStarField()
    scene.add(starField)

    camera.position.z = 100

    function animate() {
      requestAnimationFrame(animate)

      starField.rotation.x += 0.002
      starField.rotation.y -= 0.002

      renderer.render(scene, camera)
    }

    animate()

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    })
  }

  initThreeScene(document.body)
})()
