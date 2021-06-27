const canvas = document.getElementById('canvas3D'); // контейнер, в котором лежат объемные объекты
const renderer = new THREE.WebGLRenderer({ canvas }); // рендер
const scene = new THREE.Scene(); // сцена
scene.background = new THREE.Color(0xeeeeee); // цвет фона

// камера
const camera = new THREE.OrthographicCamera(-15, 15, 15, -15, 1, 100);
camera.zoom = 1.3;
camera.position.set(0, 0, 50);

// свет
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(10, 20, 15);
scene.add(light);

controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;

const material = new THREE.MeshLambertMaterial({ color: 0x424242 });

// куб 
const geometry1 = new THREE.BoxGeometry(12, 12, 12);
const cube = new THREE.Mesh(geometry1, material);
cube.position.z = 18;
scene.add(cube);
// шар
const geometry2 = new THREE.SphereGeometry(6, 25, 25);
const sphere = new THREE.Mesh(geometry2, material);
sphere.position.z = 0;
scene.add(sphere);
// крест
const geometry3 = new THREE.BoxGeometry(4, 4, 4);
const cross = new THREE.Group();
// делаем кубы
function createPart(geometry, material, x, y, z) {
    const part = new THREE.Mesh(geometry, material);
    part.position.set(x, y, z);
    return part;
}
// массив частей для креста
const parts = [
    part1 = createPart(geometry3, material, 0, 0, -14),
    part2 = createPart(geometry3, material, 0, 0, -18),
    part3 = createPart(geometry3, material, 0, 0, -22),
    part4 = createPart(geometry3, material, -4, 0, -18),
    part5 = createPart(geometry3, material, 0, 4, -18),
    part6 = createPart(geometry3, material, 4, 0, -18),
    part7 = createPart(geometry3, material, 0, -4, -18)
];

parts.forEach(function(item) {
    cross.add(item);
});

scene.add(cross);

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

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();