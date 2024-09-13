const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.5 / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 4.5); // Adjust camera position

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth * 0.47, window.innerHeight); // Adjust size based on container width
renderer.setClearColor(0x000000, 0); // Set background color

// Attach the renderer's canvas to the div with class "who__left"
const container = document.querySelector('.who__left');
container.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Create a canvas and draw text on it
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 256; // Adjust size as needed
canvas.height = 128;

// Initial text position
let textX = canvas.width / 2;
let textY = canvas.height / 2;

function updateCanvas() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    context.fillStyle = '#dc9dcd';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = '90px lato';
    context.fillStyle = '#555';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Hello ', textX, textY);
}

// Initial canvas update
updateCanvas();

// Create a texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Set the cube's material with pink color and texture
const material = new THREE.MeshStandardMaterial({ map: texture}); // Pink color

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// Create OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true; // Enable auto rotation
controls.autoRotateSpeed = 2; // Adjust rotation speed

//Set light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// add light direction
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(1,1,1)
scene.add(directionalLight)

// Animation variables
let time = 0;

// Create the animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update text position
    textX = canvas.width / 2 + Math.sin(time) * 50; // Example movement (sinusoidal)

    // Update canvas with new text position
    updateCanvas();

    // Update texture with new canvas content
    texture.needsUpdate = true;

    // Update controls if using OrbitControls
    controls.update();

    // Render scene
    renderer.render(scene, camera);

    // Increase time for animation
    time += 0.03;
}

animate();