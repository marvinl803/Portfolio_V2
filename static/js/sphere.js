// // Create the scene
// const scene = new THREE.Scene();

// // Create the camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.5 / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 5);

// // Create the renderer
// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth * 0.47, window.innerHeight);

// // Attach the renderer's canvas to the div with class "hero__right"
// const container = document.querySelector('.hero__right');
// container.appendChild(renderer.domElement);

// // Create geometry (sphere)
// const geometry = new THREE.SphereGeometry(2.8, 100, 100);

// // Load shaders
// const vertexShader = `
//     varying vec3 vNormal;
//     varying vec3 vPosition;

//     uniform float time;

//     void main() {
//         vNormal = normal;
//         vPosition = position;

//         vec3 newPosition = position + normal * sin(position.y * 5.0 + time) * 0.08;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//     }
// `;

// const fragmentShader = `
//     varying vec3 vNormal;
//     varying vec3 vPosition;

//     void main() {
//         gl_FragColor = vec4(0.5 + 0.5 * vNormal, 1.0);
//     }
// `;

// // Create custom shader material
// const material = new THREE.ShaderMaterial({
//     vertexShader: vertexShader,
//     fragmentShader: fragmentShader,
//     uniforms: {
//         time: { value: 0.0 }
//     }
// });

// // Create the mesh (sphere)
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// // Function to handle sphere size
// function handleSphereSize() {
//     const containerHeight = container.clientHeight;
//     const containerWidth = container.clientWidth;

//     // Set the maximum sphere height (avoid overflow)
//     const maxHeight = containerHeight * 0.8;  // Make it 80% of container height
//     const maxWidth = containerWidth * 0.8;   // Make it 80% of container width

//     // Calculate sphere scale based on window size, keeping the aspect ratio
//     const widthScale = containerWidth / window.innerWidth;
//     const heightScale = containerHeight / window.innerHeight;

//     // Use the smaller scale to prevent overflow, also apply maxWidth and maxHeight limits
//     const scale = Math.min(widthScale, heightScale, maxHeight / 2.3, maxWidth / 2.3); // Max size is based on sphere's base radius (2.3)

//     // Apply the scaling to the sphere
//     sphere.scale.set(scale, scale, scale);
// }

// // Handle window resizing
// function onWindowResize() {
//     // Update camera aspect ratio
//     camera.aspect = window.innerWidth * 0.5 / window.innerHeight;
//     camera.updateProjectionMatrix();

//     // Update renderer size to match the container size
//     renderer.setSize(window.innerWidth * 0.47, window.innerHeight);

//     // Update sphere size
//     handleSphereSize();
// }

// // Add the resize event listener
// window.addEventListener('resize', onWindowResize);

// // Call onWindowResize initially to set the correct size on page load
// onWindowResize();

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
    
//     // Update the time uniform
//     material.uniforms.time.value += 0.01;

//     // Render the scene
//     renderer.render(scene, camera);
// }

// // Start the animation
// animate();
