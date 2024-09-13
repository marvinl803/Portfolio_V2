// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.5/ window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);

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

// Create the mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update the time uniform
    material.uniforms.time.value += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
