import {AllSpells} from "/all-spells/all-spells.js";
import {Main} from "/main/main.js";
import {getLevel} from "./experience-table.js";
import {PlayerStorage} from "./player-storage.js";
import {Dialog} from "/services/dialog.js";
import {Inventory} from "./inventory.js";

const storage = new PlayerStorage();

const dialog = new Dialog();

const goldElement = document.getElementById('gold');
const silverElement = document.getElementById('silver');
const copperElement = document.getElementById('copper');
// gold - g; silver - s; copper - c;
const {
    g,
    s,
    c
} = JSON.parse(localStorage.getItem('money')) || {
    g: 0,
    s: 0,
    c: 0
};

let gold = goldElement.innerText = g;
let silver = silverElement.innerText = s;
let copper = copperElement.innerText = c;

document.getElementById('goldEnlarger').addEventListener('click', (e) => {
    e.preventDefault();
    gold = goldElement.innerText = gold + 1;
    localStorage.setItem('money', JSON.stringify({
        g: gold,
        s: silver,
        c: copper
    }));
});
document.getElementById('goldReducer').addEventListener('click', (e) => {
    if (gold > 0) {
        e.preventDefault();
        gold = goldElement.innerText = gold - 1;
        localStorage.setItem('money', JSON.stringify({
            g: gold,
            s: silver,
            c: copper
        }));
    }
});

document.getElementById('silverEnlarger').addEventListener('click', (e) => {
    e.preventDefault();
    silver = silverElement.innerText = silver + 1;
    localStorage.setItem('money', JSON.stringify({
        g: gold,
        s: silver,
        c: copper
    }));
});
document.getElementById('silverReducer').addEventListener('click', (e) => {
    if (silver > 0) {
        e.preventDefault();
        silver = silverElement.innerText = silver - 1;
        localStorage.setItem('money', JSON.stringify({
            g: gold,
            s: silver,
            c: copper
        }));
    }
});

document.getElementById('copperEnlarger').addEventListener('click', (e) => {
    e.preventDefault();
    copper = copperElement.innerText = copper + 1;
    localStorage.setItem('money', JSON.stringify({
        g: gold,
        s: silver,
        c: copper
    }));
});
document.getElementById('copperReducer').addEventListener('click', (e) => {
    if (copper > 0) {
        e.preventDefault();
        copper = copperElement.innerText = copper - 1;
        localStorage.setItem('money', JSON.stringify({
            g: gold,
            s: silver,
            c: copper
        }));
    }
});

let experience = +(storage.getBlockByKey('itinerary')?.experience) || 0;

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

        const data = {
            experience: experience
        }

        storage.updateOneBlock('itinerary', data);
        expChanger.value = null;
    }
});


//////////////////

document.getElementById('spells_container').innerHTML = new AllSpells().toHTML();

const mainRef = document.getElementById('main_container');

const main = Main.fromApi({
    refToHTML: mainRef,
    playerStorage: storage,
    dialog: dialog,
});

mainRef.innerHTML = main.toHTML();
main.addEventListeners();

document.getElementById('menu_list').addEventListener('click', (e) => {
    const ids = ['main_container', 'itinerary_container', 'spells_container', 'inventory_container'];

    const target = e.target.getAttribute('data-show');

    if (!target) return;

    ids.forEach((id) => {
        const element = document.getElementById(id);

        if (id === target) {
            element.style.display = 'block';
            return;
        }

        element.style.display = 'none';
    });

    if (target === 'inventory_container') {
        document.getElementById('rows_with_inventary').innerHTML = '';
        Inventory.fromAPI().toHTML();
    }
})