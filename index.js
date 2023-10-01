const moneyElement = document.getElementById('money');
// gold - g; silver - s; copper - c;
const {g, s, c} = JSON.parse(localStorage.getItem('money')) || {g: 0, s: 0, c: 0};

const gold = g;
const silver = s;
const copper = c;

const goldElem = document.createElement('p');
const silverElem = document.createElement('p');
const copperElem = document.createElement('p');

goldElem.innerText = g;
silverElem.innerText = s;
copperElem.innerText = c;

moneyElement.appendChild(goldElem);
moneyElement.appendChild(silverElem);
moneyElement.appendChild(copperElem);