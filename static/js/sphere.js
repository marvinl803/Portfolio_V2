// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.5 / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth * 0.47, window.innerHeight);

// Attach the renderer's canvas to the div with class "hero__right"
const container = document.querySelector('.hero__right');
container.appendChild(renderer.domElement);

// Create geometry (sphere)
const geometry = new THREE.SphereGeometry(2.3, 100, 100);

// Load shaders
const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform float time;

    void main() {
        vNormal = normal;
        vPosition = position;
        
        vec3 newPosition = position + normal * sin(position.y * 5.0 + time) * 0.08;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;

const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        gl_FragColor = vec4(0.5 + 0.5 * vNormal, 1.0);
    }
`;

// Create custom shader material
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        time: { value: 0.0 }
    }
});

// Create the mesh (sphere)
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Function to handle sphere size based on media query
function handleMediaQueryChange() {
    if (mediaQuerySmall.matches) {
        // Scale sphere for very small screens (max-width: 480px)
        sphere.scale.set(0.3, 0.3, 0.3);  // Small sphere
    } else if (mediaQueryMedium.matches) {
        // Scale sphere for medium screens (max-width: 768px)
        sphere.scale.set(0.5, 0.5, 0.5);  // Medium-sized sphere
    } else if (mediaQueryLarge.matches) {
        // Scale sphere for medium screens (max-width: 768px)
        sphere.scale.set(0.65, 0.65, 0.65);  // Medium-sized sphere
    } else if (mediaQueryXLarge.matches) {
        // Scale sphere for medium screens (max-width: 768px)
        sphere.scale.set(0.75, 0.75, 0.75);  // Medium-sized sphere
    } else {
        // Default size for larger screens
        sphere.scale.set(1, 1, 1);  // Full-size sphere
    }
}

// Create media queries for screen widths
const mediaQuerySmall = window.matchMedia("(max-width: 480px)");
const mediaQueryMedium = window.matchMedia("(max-width: 768px)");
const mediaQueryLarge = window.matchMedia("(max-width: 1024px)");
const mediaQueryXLarge = window.matchMedia("(max-width: 1440px)");

// Add listeners for media query changes
mediaQuerySmall.addListener(handleMediaQueryChange);
mediaQueryMedium.addListener(handleMediaQueryChange);

// Call the function initially to set the correct size on page load
handleMediaQueryChange();

// Handle window resizing
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth * 0.5 / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size to match the container size
    renderer.setSize(window.innerWidth * 0.47, window.innerHeight);
}

// Add the resize event listener
window.addEventListener('resize', onWindowResize);

// Call onWindowResize initially to set the correct size on page load
onWindowResize();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update the time uniform
    material.uniforms.time.value += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation
animate();
