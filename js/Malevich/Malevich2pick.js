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
                change = true;
                this.pickedObject = intersectedObjects[0].object;
            }
            clearPickPosition();
        }
    }
}

let t = 0;
let black = true; // флаг для цвета
let change = false; // флаг для формы
let up = true; // флаг для направления
let vl = 0;

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

window.addEventListener('click', setPickPosition);

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    t += 0.01;
    pickHelper.pick(pickPosition, scene, camera);
    if (change == true) {
        if (vl > 5 || vl < 0) { // выбираем направление
            up = !up;
            if (+vl.toFixed(2) == 0) {
                change = false;
                black = !black;
            }
        }
        up ? vl += 0.05 : vl -= 0.05;
        updateVertices(pickHelper.pickedObject, vl, t);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();