export const itemsElem = document.getElementById('inventory').children.item(0);

export class Inventory {
    items;

    static fromAPI() {
        // Load items from localStorage or initialize an empty array
        const items = JSON.parse(localStorage.getItem('items')) || [];
        return Object.assign(new Inventory(), {items});
    }

    toHTML() {
        // Populate inventory items
        for (const item of this.items) {
            const row = this.createItemRow(item);
            itemsElem.appendChild(row);
        }

        this.addEventListeners();
    }

    // Function to create an item row
    createItemRow(item) {
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

    addEventListeners() {
        // Add a new inventory item
        document.getElementById('add-inventory-btn').addEventListener('click', () => {
            const newItem = { name: '', count: '' }; // Initialize with empty values
            const row = this.createItemRow(newItem);
            itemsElem.appendChild(row);
        });


        document.getElementById('save_inventory').addEventListener('click', () => {
            const itemsToSave = [];
            const itemsToDelete = [];

            for (let i = 0; i < itemsElem.children.length; i++) {
                const column = itemsElem.children.item(i).children
                const item = {
                    name: column.item(1).innerText,
                    count: column.item(2).innerText,
                };
                if (item.name) {
                    itemsToSave.push(item);
                } else {
                    itemsToDelete.push(itemsElem.children.item(i));
                }
            }

            itemsToDelete.forEach(i => i.remove());
            localStorage.setItem('items', JSON.stringify(itemsToSave));
        })
    }
}
