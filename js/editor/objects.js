function axeschange() {
    let btn;
    if (axes) {
        let object = scene.getObjectByName('axesHelper');
        scene.remove(object);
        btn = document.getElementById('axes-green');
        btn.id = 'axes-pink';
    } else {
        const axesHelper = new THREE.AxesHelper(15);
        axesHelper.name = "axesHelper";
        scene.add(axesHelper);
        btn = document.getElementById('axes-pink');
        btn.id = 'axes-green';
    }
    axes = !axes;
}

function deletehtml(blockhtml) {
    while (blockhtml.firstChild) {
        blockhtml.firstChild.remove();
    }
}

function deleteobj() {
    let length = scene.children.length - 1;
    for (let i = 0; i < length; i++) {
        let object = scene.children[length - i];
        if (object.name != "axesHelper") {
            scene.remove(object);
        }
    }
}

function createobj(btn, values, position) {
    btn.style.backgroundColor = '#448aff';
    let prm = document.getElementById('parameters');
    let pst = document.getElementById('position');
    let blck = document.getElementById('block');
    let blckdl = document.getElementById('blockdel');
    let colorpanel = document.getElementById('color-picker');
    colorpanel.style.opacity = 0;

    deletehtml(prm);
    deletehtml(pst);
    deletehtml(blck);

    let geometry;
    switch (btn.innerHTML) {
        case 'Куб':
            geometry = new THREE.BoxGeometry(values[0].value, values[1].value, values[2].value);
            break;
        case 'Пирамида':
            geometry = new THREE.ConeGeometry(values[0].value, values[1].value, 3);
            break;
        case 'Сфера':
            geometry = new THREE.SphereGeometry(values[0].value, 25, 25);
            break;
        default:
            break;
    }
    let clr = document.getElementById('hex').innerHTML;
    let setlight = new THREE.Color().setHex(clr.replace("#", "0x"));
    let setbase = new THREE.Color().setRGB(setlight.r - 0.01, setlight.g - 0.001, setlight.b - 0.001);
    let material = new THREE.MeshLambertMaterial({ color: setlight, emissive: setbase });
    let part = new THREE.Mesh(geometry, material);
    part.position.set(position[0].value, position[1].value, position[2].value);
    scene.add(part);
    if ((scene.children.length == 3 && axes == true) || (scene.children.length == 2 && axes == false)) {
        let del = document.createElement('button');
        del.innerHTML = 'Очистить холст';
        del.id = 'pink';
        del.onclick = function() {
            deleteobj(blckdl);
            deletehtml(blckdl)
        };
        blckdl.append(del);
    }
}

function createhtml(block, elem, vl, min, max) {
    let field = document.createElement('div');
    field.className = 'field';
    let text = document.createElement('a');
    text.id = 'text';
    text.innerHTML = elem + ":";
    let input = document.createElement('input');
    input.type = 'number';
    input.min = min;
    input.max = max;
    input.value = vl;
    field.append(text);
    field.append(input);
    block.append(field);
    return input;
}

function clickbtn(btn) {
    let prm = document.getElementById('parameters');
    let pst = document.getElementById('position');
    let blck = document.getElementById('block');
    let colorpanel = document.getElementById('color-picker');
    colorpanel.style.opacity = 1;

    deletehtml(prm);
    deletehtml(pst);
    deletehtml(blck);

    let mass = [];
    switch (btn.innerHTML) {
        case 'Куб':
            mass = ['ширина', 'высота', 'длина'];
            break;
        case 'Пирамида':
            mass = ['радиус', 'высота'];
            break;
        case 'Сфера':
            mass = ['радиус'];
            break;
        default:
            break;
    }
    let hdprm = document.createElement('h2');
    hdprm.innerHTML = btn.innerHTML;
    prm.append(hdprm);
    let prmvalues = [];
    mass.forEach(function(elem) {
        let input = createhtml(prm, elem, 1, 1, 10);
        prmvalues.push(input);
    });
    let hdpst = document.createElement('h2');
    hdpst.innerHTML = "Координаты";
    pst.append(hdpst);
    let pstvalues = [
        createhtml(pst, 'x', 0, -15, 15),
        createhtml(pst, 'y', 0, -15, 15),
        createhtml(pst, 'z', 0, -15, 15)
    ];
    let create = document.createElement('button');
    create.innerHTML = 'Добавить';
    create.id = 'green';
    create.onclick = function() { createobj(btn, prmvalues, pstvalues) };
    blck.append(create);
}