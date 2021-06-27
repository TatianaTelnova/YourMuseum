class PickHelper {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
    }
    pick(normalizedPosition, scene, camera) {
        if (normalizedPosition.x != -10 && normalizedPosition.y != -10) {
            this.raycaster.setFromCamera(normalizedPosition, camera);
            const intersectedObjects = this.raycaster.intersectObjects(scene.children);
            if (intersectedObjects.length) { // если нажали на какие-то объекты
                this.pickedObject = intersectedObjects[0].object;
                press(this.pickedObject);
            }
            clearPickPosition();
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

function press(intersectedObjects) {
    let rnd;
    do {
        let sign = Math.random() < 0.5 ? -1 : 1;
        rnd = sign * (Math.floor(Math.random() * 3) + 1);
    } while (rnd == pickHelper.pickedObject.position.z)
    pickHelper.pickedObject.position.z = rnd;
}

window.addEventListener('click', setPickPosition);

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