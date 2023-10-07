let touchXStart;
const inventoryElem = document.getElementById('inventory');
export const itemsElem = inventoryElem.children.item(0);
document.body.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        touchXStart = e.touches[0].pageX;
    }
});
document.body.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
        const touchXEnd = e.changedTouches[0].pageX;
        const touchDifference = touchXEnd - touchXStart;
        const isSwipeRight = touchDifference > 100;
        const isSwipeLeft = touchDifference < -100;
        if (isSwipeRight) {
            inventoryElem.classList.add('opened-inv');
        }
        if (isSwipeLeft) {
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

            inventoryElem.classList.remove('opened-inv');
        }
    }
});
