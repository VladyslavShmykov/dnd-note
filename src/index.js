import {getLevel} from "./experience-table.js";
function detectDoubleTapClosure() {
    let lastTap = 0;
    let timeout;
    return function detectDoubleTap(event) {
        const curTime = new Date().getTime();
        const tapLen = curTime - lastTap;
        if (tapLen < 200 && tapLen > 0) {
            event.preventDefault();
        } else {
            timeout = setTimeout(() => {
                clearTimeout(timeout);
            }, 500);
        }
        lastTap = curTime;
    };
}

if (/webOS|iPhone/i.test(navigator.userAgent)) {
    document.body.addEventListener('touchend', detectDoubleTapClosure());
}

const goldElement = document.getElementById('gold');
const silverElement = document.getElementById('silver');
const copperElement = document.getElementById('copper');
// gold - g; silver - s; copper - c;
const {g, s, c} = JSON.parse(localStorage.getItem('money')) || {g: 0, s: 0, c: 0};

let gold = goldElement.innerText = g;
let silver = silverElement.innerText = s;
let copper = copperElement.innerText = c;

document.getElementById('goldEnlarger').addEventListener('click', () => {
    gold = goldElement.innerText = gold + 1;
    localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
});
document.getElementById('goldReducer').addEventListener('click', () => {
    if (gold > 0) {
        gold = goldElement.innerText = gold - 1;
        localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
    }
});

document.getElementById('silverEnlarger').addEventListener('click', () => {
    silver = silverElement.innerText = silver + 1;
    localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
});
document.getElementById('silverReducer').addEventListener('click', () => {
    if (silver > 0) {
        silver = silverElement.innerText = silver - 1;
        localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
    }
});

document.getElementById('copperEnlarger').addEventListener('click', () => {
    copper = copperElement.innerText = copper + 1;
    localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
});
document.getElementById('copperReducer').addEventListener('click', () => {
    if (copper > 0) {
        copper = copperElement.innerText = copper - 1;
        localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
    }
});

let experience = +localStorage.getItem('exp') || 0;
const expChanger = document.getElementById('exp-input');
const expElement = document.getElementById('exp');
const levelElement = document.getElementById('level');
expElement.innerText = experience;
levelElement.innerText = getLevel(experience);

document.getElementById('exp-reset').addEventListener('click', () => {
    expChanger.value = null;
});
document.getElementById('exp-confirm').addEventListener('click', () => {
    if ((experience + +expChanger.value) >= 0 && (experience + +expChanger.value) <= 355_000) {
        experience += +expChanger.value;
        expElement.innerText = experience;
        levelElement.innerText = getLevel(experience);
        localStorage.setItem('exp', JSON.stringify(experience));
        expChanger.value = null;
    }
});