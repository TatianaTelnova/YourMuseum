const canvas = document.getElementById('canvas3D'); // контейнер, в котором лежат объемные объекты

const renderer = new THREE.WebGLRenderer({ canvas }); // рендер

const scene = new THREE.Scene(); // сцена
scene.background = new THREE.Color(0xeeeeee); // цвет фона

// камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 15); // насколько близко расположена камера

const color = 0xffffff; // свет
const intensity = 0.5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(8, 15, 10);
scene.add(light);

controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;

// координатные линии
const axesHelper = new THREE.AxesHelper(15);
axesHelper.name = "axesHelper";
scene.add(axesHelper);
let axes = true;

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

let block = document.getElementById('block');

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