class PickHelper {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
    }
    pick(normalizedPosition, scene, camera) {
        if (normalizedPosition.x != -10 && normalizedPosition.y != -10) {
            this.raycaster.setFromCamera(normalizedPosition, camera);
            const intersectedObjects = this.raycaster.intersectObjects(scene.children);
            if (intersectedObjects.length) {
                this.pickedObject = intersectedObjects[0].object;
                press();
            }
        }
    }
}

const pickPosition = { x: 0, y: 0 }; // координаты объекта, на который нажимаем
const pickHelper = new PickHelper();

clearPickPosition();

function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
}

function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y
}

function clearPickPosition() {
    pickPosition.x = -10;
    pickPosition.y = -10;
}

let t = 0;

function press() {
    t += 0.05;
    pickHelper.pickedObject.rotation.x = t;
}

window.addEventListener('mousedown', setPickPosition); // устанавливаем координаты наведенного объект
window.addEventListener('mouseup', clearPickPosition); // сбрасываем координаты

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    pickHelper.pick(pickPosition, scene, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();