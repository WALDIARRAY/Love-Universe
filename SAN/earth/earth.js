
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// ==========================================
// LOCATION COORDINATES
// ==========================================

// Approximate city-area coordinates.
// Distance is calculated from these coordinates.

const locations = {
    jiten: {
        name: "Jiten",
        city: "New Delhi, India",
        latitude: 28.6139,
        longitude: 77.2090,
        color: 0x79c8ff
    },

    sandhiya: {
        name: "Sandhiya",
        city: "Vandalur, Chennai",
        latitude: 12.8924,
        longitude: 80.0810,
        color: 0xff9fba
    }
};


// ==========================================
// ELEMENTS
// ==========================================

const globeContainer = document.getElementById("globe");

const loadingScreen = document.getElementById("loading");

const distanceNumber = document.getElementById("distanceNumber");

const distanceCaption = document.getElementById("distanceCaption");



const delhiLabel = document.getElementById("delhiLabel");

const chennaiLabel = document.getElementById("chennaiLabel");


// ==========================================
// DISTANCE CALCULATION
// ==========================================

function calculateDistance(pointA, pointB) {

    const earthRadius = 6371;

    const toRadians = degrees => degrees * Math.PI / 180;

    const lat1 = toRadians(pointA.latitude);
    const lat2 = toRadians(pointB.latitude);

    const deltaLat = toRadians(
        pointB.latitude - pointA.latitude
    );

    const deltaLon = toRadians(
        pointB.longitude - pointA.longitude
    );

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return Math.round(earthRadius * c);
}

const actualDistance = calculateDistance(
    locations.jiten,
    locations.sandhiya
);


// ==========================================
// THREE.JS SCENE
// ==========================================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    globeContainer.clientWidth / globeContainer.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 3.5);


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    globeContainer.clientWidth,
    globeContainer.clientHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

globeContainer.appendChild(renderer.domElement);


// ==========================================
// CONTROLS
// ==========================================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enableZoom = false;
controls.enablePan = false;

controls.minDistance = 1.8;
controls.maxDistance = 5.5;

controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;


// ==========================================
// LIGHTING
// ==========================================

scene.add(
    new THREE.AmbientLight(0xffffff, 1.2)
);

const sunlight = new THREE.DirectionalLight(
    0xffffff,
    2.2
);

sunlight.position.set(5, 3, 5);

scene.add(sunlight);


// ==========================================
// EARTH GROUP
// ==========================================

const earthGroup = new THREE.Group();

scene.add(earthGroup);

const earthGeometry = new THREE.SphereGeometry(
    1,
    96,
    96
);


// ==========================================
// EARTH TEXTURES
// ==========================================

const textureLoader = new THREE.TextureLoader();

textureLoader.setCrossOrigin("anonymous");

const earthTextureURL =
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

const normalTextureURL =
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";

const specularTextureURL =
    "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg";

const cloudsTextureURL =
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";


const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 12
});

const earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

earthGroup.add(earth);


// ==========================================
// LOAD EARTH TEXTURES
// ==========================================

let earthTextureLoaded = false;

textureLoader.load(
    earthTextureURL,

    texture => {

        texture.colorSpace = THREE.SRGBColorSpace;

        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;

        earthTextureLoaded = true;

        loadingScreen.classList.add("hidden");

        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 600);

    },

    undefined,

    error => {

        console.error("Earth texture failed to load:", error);

        loadingScreen.innerHTML = `
            <p>Earth texture couldn't load.</p>
            <p>Please check your internet connection.</p>
        `;

    }
);


// Normal map

textureLoader.load(
    normalTextureURL,

    texture => {

        earthMaterial.normalMap = texture;

        earthMaterial.normalScale.set(0.35, 0.35);

        earthMaterial.needsUpdate = true;

    },

    undefined,

    error => console.warn("Normal map unavailable:", error)
);


// Specular map

textureLoader.load(
    specularTextureURL,

    texture => {

        earthMaterial.specularMap = texture;

        earthMaterial.specular = new THREE.Color(0x444444);

        earthMaterial.needsUpdate = true;

    },

    undefined,

    error => console.warn("Specular map unavailable:", error)
);


// ==========================================
// CLOUD LAYER
// ==========================================

const cloudMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
});

const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.009, 96, 96),
    cloudMaterial
);

earthGroup.add(clouds);


textureLoader.load(
    cloudsTextureURL,

    texture => {

        texture.colorSpace = THREE.SRGBColorSpace;

        cloudMaterial.map = texture;
        cloudMaterial.needsUpdate = true;

    },

    undefined,

    error => console.warn("Cloud texture unavailable:", error)
);


// ==========================================
// ATMOSPHERE
// ==========================================

const atmosphereMaterial = new THREE.ShaderMaterial({

    vertexShader: `
        varying vec3 vNormal;

        void main() {

            vNormal = normalize(
                normalMatrix * normal
            );

            gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        varying vec3 vNormal;

        void main() {

            float intensity = pow(
                0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)),
                3.0
            );

            gl_FragColor = vec4(
                0.25,
                0.58,
                1.0,
                intensity * 0.22
            );
        }
    `,

    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
});

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.075, 96, 96),
    atmosphereMaterial
);

earthGroup.add(atmosphere);


// ==========================================
// COORDINATES TO 3D POSITION
// ==========================================

const EARTH_RADIUS = 1.018;

function coordinatesToVector(latitude, longitude, radius = EARTH_RADIUS) {

    const phi = (90 - latitude) * Math.PI / 180;

    const theta = (longitude + 180) * Math.PI / 180;

    const x = -radius * Math.sin(phi) * Math.cos(theta);

    const y = radius * Math.cos(phi);

    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}


// ==========================================
// LOCATION MARKERS
// ==========================================

function createMarker(location) {

    const position = coordinatesToVector(
        location.latitude,
        location.longitude
    );

    const group = new THREE.Group();

    group.position.copy(position);

    group.lookAt(
        position.clone().multiplyScalar(2)
    );

    const markerMaterial = new THREE.MeshBasicMaterial({
        color: location.color
    });

    const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 20, 20),
        markerMaterial
    );

    group.add(marker);


    const ring = new THREE.Mesh(

        new THREE.RingGeometry(0.018, 0.025, 40),

        new THREE.MeshBasicMaterial({
            color: location.color,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        })

    );

    group.add(ring);


    const outerRing = new THREE.Mesh(

        new THREE.RingGeometry(0.028, 0.031, 40),

        new THREE.MeshBasicMaterial({
            color: location.color,
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide
        })

    );

    group.add(outerRing);


    earthGroup.add(group);

    return {
        group,
        marker,
        ring,
        outerRing
    };

}


const jitenMarker = createMarker(locations.jiten);

const sandhiyaMarker = createMarker(locations.sandhiya);


// ==========================================
// CONNECTING ROUTE
// ==========================================

function createRoute() {

    const start = coordinatesToVector(
        locations.jiten.latitude,
        locations.jiten.longitude,
        1.025
    );

    const end = coordinatesToVector(
        locations.sandhiya.latitude,
        locations.sandhiya.longitude,
        1.025
    );

    const points = [];

    const segments = 100;

    for (let i = 0; i <= segments; i++) {

        const t = i / segments;

        const point = new THREE.Vector3().copy(start).lerp(end, t);

        point.normalize();

        const arcHeight =
            1.025 + Math.sin(Math.PI * t) * 0.075;

        point.multiplyScalar(arcHeight);

        points.push(point);

    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: 0xf4d8a4,
        transparent: true,
        opacity: 0
    });

    const line = new THREE.Line(geometry, material);

    earthGroup.add(line);

    return line;

}


const route = createRoute();


// ==========================================
// CAMERA VIEW
// ==========================================
function showIndia() {

    const midLat =
        (locations.jiten.latitude + locations.sandhiya.latitude) / 2;

    const midLon =
        (locations.jiten.longitude + locations.sandhiya.longitude) / 2;

    const midpoint = coordinatesToVector(midLat, midLon, 1);

    const direction = midpoint.clone().normalize();

    const quaternion = new THREE.Quaternion();

    quaternion.setFromUnitVectors(
        direction,
        new THREE.Vector3(0, 0, 1)
    );

    // Calculate which way north points after rotating the globe.
    const north = coordinatesToVector(midLat + 0.1, midLon, 1);

    north.applyQuaternion(quaternion);

    // Rotate the globe so north points upward.
    const roll = Math.atan2(north.x, north.y);

    const correction = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        roll
    );

    earthGroup.quaternion.copy(
        correction.multiply(quaternion)
    );

    controls.target.set(0, 0, 0);
}

showIndia(); 
    


// ==========================================
// RESET VIEW
// ==========================================

document.getElementById("resetView").addEventListener("click", () => {

    controls.autoRotate = false;

    showIndia();

    camera.position.set(0, 0, 3.5);

    controls.update();

    setTimeout(() => {
        controls.autoRotate = true;
    }, 1500);

});


// ==========================================
// MEASURE DISTANCE
// ==========================================
// ==========================================
// DISPLAY DISTANCE IMMEDIATELY
// ==========================================

distanceNumber.innerHTML = '≈1800 <span>KM</span>';
    `${actualDistance.toLocaleString("en-IN")} <span>KM</span>`;

distanceCaption.textContent =
    "The straight-line distance between our two locations. ❤️";

route.material.opacity = 0.9;
// ==========================================
// LOCATION LABEL POSITIONING
// ==========================================

const vector = new THREE.Vector3();

function updateLabelPosition(marker, label) {

    marker.group.getWorldPosition(vector);

    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) *
        globeContainer.clientWidth;

    const y = (-vector.y * 0.5 + 0.5) *
        globeContainer.clientHeight;


    const isVisible = vector.z < 1;

    label.classList.toggle(
        "visible",
        isVisible
    );


    if (isVisible) {

        label.style.left = `${x + 10}px`;

        label.style.top = `${y - 20}px`;

    }

}


// ==========================================
// RESPONSIVE RESIZE
// ==========================================

function resizeRenderer() {

    const width = globeContainer.clientWidth;

    const height = globeContainer.clientHeight;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}


window.addEventListener("resize", resizeRenderer);


// ==========================================
// ANIMATION LOOP
// ==========================================

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();


    // Gentle Earth rotation.

    if (controls.autoRotate) {

        clouds.rotation.y += 0.00008;

    }


    // Pulsating location markers.

    const pulse = 1 + Math.sin(elapsed * 3) * 0.15;

    jitenMarker.ring.scale.setScalar(pulse);

    sandhiyaMarker.ring.scale.setScalar(pulse);


    controls.update();

    renderer.render(scene, camera);


    updateLabelPosition(
        jitenMarker,
        delhiLabel
    );

    updateLabelPosition(
        sandhiyaMarker,
        chennaiLabel
    );

}


animate();


// ==========================================
// INITIAL DISTANCE DISPLAY
// ==========================================

console.log(
    "Distance between Jiten and Sandhiya:",
    actualDistance,
    "km"
);

// ==========================================
// RETURN TO CELESTIAL ATLAS
// ==========================================

function returnToAtlas() {
    window.location.href = "../index.html#universeHub";
}

document
    .getElementById("backButton")
    .addEventListener("click", returnToAtlas);

document
    .getElementById("finalBackButton")
    .addEventListener("click", returnToAtlas);