document.getElementById('export-hero').addEventListener('click', exportHero);
document.getElementById('import-hero').addEventListener('click', () => {
    var inputElem = document.createElement('input');
    inputElem.setAttribute('type', 'file');
    inputElem.onchange = (e) => {
        const file = e.target.files[0];
        if (file.name.includes('.json')) {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                if (typeof event.target.result === 'string') {
                    const res = JSON.parse(event.target.result);
                    localStorage.setItem('money', JSON.stringify(res.money));
                    localStorage.setItem('exp', res.exp);
                    location.reload();
                }
            });
            reader.readAsText(file);
        }
    };
    inputElem.click();
});
export function exportHero() {
    const hero = {
        money: JSON.parse(localStorage.getItem('money')),
        exp: JSON.parse(localStorage.getItem('exp')),
    };

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(hero));
    var aElem = document.createElement('a');
    aElem.setAttribute("href", dataStr);
    aElem.setAttribute("download", "my-dnd-note.json");
    aElem.click();
}
