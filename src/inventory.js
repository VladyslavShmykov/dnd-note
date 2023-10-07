import { itemsElem } from "./touch-events.js";

// Function to create an item row
function createItemRow(item) {
    const row = document.createElement('div');
    row.classList.add('item-row');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&#10060';
    deleteBtn.addEventListener('click', () => row.remove());

    const nameElem = document.createElement('p');
    nameElem.classList.add('editable-text');
    nameElem.setAttribute('contenteditable', true);
    nameElem.innerText = item.name;

    const countElem = document.createElement('span');
    countElem.classList.add('editable-text');
    countElem.setAttribute('contenteditable', true);
    countElem.innerText = item.count;

    row.appendChild(deleteBtn);
    row.appendChild(nameElem);
    row.appendChild(countElem);

    return row;
}

// Load items from localStorage or initialize an empty array
const items = JSON.parse(localStorage.getItem('items')) || [];

// Populate inventory items
for (const item of items) {
    const row = createItemRow(item);
    itemsElem.appendChild(row);
}

// Add a new inventory item
document.getElementById('add-inventory-btn').addEventListener('click', () => {
    const newItem = { name: '', count: '' }; // Initialize with empty values
    const row = createItemRow(newItem);
    itemsElem.appendChild(row);
});
