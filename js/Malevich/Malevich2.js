const canvas = document.getElementById('canvas3D'); // контейнер, в котором лежат объемные объекты

const renderer = new THREE.WebGLRenderer({ canvas }); // рендер

const scene = new THREE.Scene(); // сцена
scene.background = new THREE.Color(0xeeeeee); // цвет фона

// камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 20); // насколько близко расположена камера

const color = 0xffffff; // свет
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 15);
scene.add(light);

let geometry = new THREE.PlaneGeometry(15, 15, 30, 30); // фигура
let material = new THREE.MeshStandardMaterial({
    color: 0x000000,
    flatShading: THREE.FlatShading,
    side: THREE.DoubleSide,
    metalness: 0,
    roughness: 0.5,
    refractionRatio: 0.25
});

let figure = new THREE.Mesh(geometry, material);
scene.add(figure);

let perlin = new Perlin();

function updateVertices(fgr, vl, t) {
    let vertices = fgr.geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        let noise = perlin.noise(vertices[i] / 10 + t, vertices[i + 1] / 10 + t);
        vertices[i + 2] = noise * vl / 2;
    }
    black ? fgr.material.color.r += 0.005 : fgr.material.color.r -= 0.005;
    fgr.geometry.attributes.position.needsUpdate = true;
    fgr.material.color.needsUpdate = true;
}

// взаимодействие
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}