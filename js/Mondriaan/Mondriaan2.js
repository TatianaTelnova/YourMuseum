const canvas = document.getElementById('canvas3D'); // контейнер, в котором лежат объемные объекты

const renderer = new THREE.WebGLRenderer({ canvas }); // рендер

const scene = new THREE.Scene(); // сцена
scene.background = new THREE.Color(0xeeeeee); // цвет фона

// камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 33); // насколько близко расположена камера

// свет
const color = 0xffffff;
const intensity1 = 1;
const light1 = new THREE.DirectionalLight(color, intensity1);
// light.position.set(5, 15, 20);
light1.position.set(8, 10, 15);
scene.add(light1);

const intensity2 = 0.5;
const light2 = new THREE.DirectionalLight(color, intensity2);

const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    // map: new THREE.TextureLoader().load('img/texture.jpg')
});

const cube = new THREE.Mesh(geometry, material);
cube.rotation.z = THREE.Math.degToRad(45);
scene.add(cube);

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