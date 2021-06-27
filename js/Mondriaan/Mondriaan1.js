const canvas = document.getElementById('canvas3D'); // контейнер, в котором лежат объемные объекты

const renderer = new THREE.WebGLRenderer({ canvas }); // рендер

const scene = new THREE.Scene(); // сцена
scene.background = new THREE.Color(0x000000); // цвет фона

// камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 33); // насколько близко расположена камера

// свет
const color = 0xffffff;
const intensity1 = 1;
const light1 = new THREE.DirectionalLight(color, intensity1);
light1.position.set(8, 10, 15);
scene.add(light1);

const intensity2 = 0.5;
const light2 = new THREE.DirectionalLight(color, intensity2);
light2.position.set(-10, 10, 10);
scene.add(light2)

let position = { x: 0, y: 0, z: 0 };

// делаем кубы
function createPart(geometry, color, position) {
    let material = new THREE.MeshLambertMaterial({ color: color });
    const part = new THREE.Mesh(geometry, material);
    part.position.set(position.x, position.y, position.z);
    return part;
}

const geometry1 = new THREE.BoxGeometry(32, 32, 4);
const geometry2 = new THREE.BoxGeometry(7, 15.5, 4);
const geometry3 = new THREE.BoxGeometry(7, 15.5, 4);
const geometry4 = new THREE.BoxGeometry(7, 7, 4);

const geometry5 = new THREE.BoxGeometry(28, 7, 4);
const geometry6 = new THREE.BoxGeometry(3, 3, 4);
const geometry7 = new THREE.BoxGeometry(3, 3, 4);

let parts = [
    part1 = createPart(geometry1, 0xe53935, { x: 4, y: 4, z: 0 }),
    part2 = createPart(geometry2, 0xffffff, { x: -16.5, y: 12.25, z: 0 }),
    part3 = createPart(geometry3, 0xffffff, { x: -16.5, y: -4.25, z: 0 }),
    part4 = createPart(geometry4, 0x536dfe, { x: -16.5, y: -16.5, z: 0 }),
    part5 = createPart(geometry5, 0xffffff, { x: 2, y: -16.5, z: 0 }),
    part6 = createPart(geometry6, 0xffffff, { x: 18.5, y: -14.5, z: 0 }),
    part7 = createPart(geometry7, 0xfff176, { x: 18.5, y: -18.5, z: 0 }),
];

parts.forEach(function(item) {
    scene.add(item);
});

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