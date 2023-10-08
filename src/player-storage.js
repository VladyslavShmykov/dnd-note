export class PlayerStorage {
    #data = {}

    localStorageKey = 'savedChar';

    constructor() {
        const saved = localStorage.getItem(this.localStorageKey);

        if (saved) this.#data = JSON.parse(saved);
    }

    updateOneBlock(key, data) {
        this.#data[key] = data;

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.#data));
    }

    getBlockByKey(key) {
        return this.#data?.[key];
    }

    // debugging purpose
    getAllData() {
        return this.#data;
    }
}