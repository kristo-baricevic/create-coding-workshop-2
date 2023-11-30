// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [ 520, 520],
  pixelsPerInch: 72,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("purple", .4);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(3, 3, -5);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader();
  const texture = loader.load("cray.png");
  const moonTexture = loader.load("psych.png");
  const moonTexture2 = loader.load("eyeball.png");
  const moonTexture3 = loader.load("circless.png");

  // Setup a material
  const material = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: texture,
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  const moonGroup = new THREE.Group();
  const moonMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture,
  });
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(1.5, 0.5, 0);
  moonMesh.scale.setScalar(0.25);
  moonGroup.add(moonMesh);
  scene.add(moonGroup);

  const moonGroup2 = new THREE.Group();
  const moonMaterial2 = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture2,
  });
  const moonMesh2 = new THREE.Mesh(geometry, moonMaterial2);
  moonMesh2.position.set(1.3, 0.3, 0);
  moonMesh2.scale.setScalar(0.15);
  moonGroup2.add(moonMesh2);
  scene.add(moonGroup2);

  const moonGroup3 = new THREE.Group();
  const moonMaterial3 = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture3,
  });
  const moonMesh3 = new THREE.Mesh(geometry, moonMaterial3);
  moonMesh3.position.set(.4, 0.5, 2.3);
  moonMesh3.scale.setScalar(0.35);
  moonGroup2.add(moonMesh3);
  scene.add(moonGroup3);

  const light = new THREE.PointLight("white", 1);
  light.position.set(75, 25, 35);
  scene.add(light);

  // scene.add(new THREE.GridHelper(5, 50));
  // scene.add(new THREE.AxesHelper(5, 50));

  // scene.add(new THREE.PointLightHelper(light, 0.4));

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.25;
      moonMesh.rotation.y = time * 0.75;
      moonGroup.rotation.y = time * .5;
      moonGroup2.rotation.y = time * .3;
      moonGroup3.rotation.y = time * .6;
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
