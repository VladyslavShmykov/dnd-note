import {getLevel} from "./experience-table.js";

const goldElement = document.getElementById('gold');
const silverElement = document.getElementById('silver');
const copperElement = document.getElementById('copper');
// gold - g; silver - s; copper - c;
const {g, s, c} = JSON.parse(localStorage.getItem('money')) || {g: 0, s: 0, c: 0};

let gold = goldElement.innerText = g;
let silver = silverElement.innerText = s;
let copper = copperElement.innerText = c;

function increment(type, value) {
    switch (type) {
        case 'g':
            if (gold > 0 || value > 0) {
                gold = goldElement.innerText = gold + value;
            }
            break
        case 's':
            if (silver > 0 || value > 0) {
                silver = silverElement.innerText = silver + value;
            }
            break
        case 'c':
            if (copper > 0 || value > 0) {
                copper = copperElement.innerText = copper + value;
            }
    }
    localStorage.setItem('money', JSON.stringify({g: gold, s: silver, c: copper}));
}

const experience = +localStorage.getItem('exp');