export class ClassSpells {
    type;
    name;
    spells;
    availableLevels;

    static fromApi(spells) {
        const _spells = Object.assign(new ClassSpells(), spells);
        _spells.spells = _spells.spells
            .filter(spell => spell.description)
            .map((spell) => Spell.fromApi(spell));

        _spells.availableLevels = _spells.spells
            .filter((value, index, self) => self.findIndex(v => v.level === value.level) === index)
            .map((s) => s.level);

        return _spells;
    }

    toHTML() {
        this.spellsByLevel();
        return `
        <div>
          <div class="text-black fw-500">${this.name}</div>

          <hr>

          <div class="flex flex-wrap justify-content-center gap p" style="--flex-gap: 8px; --padding: 8px">
            ${this.spellsByLevel()}
          </div>
        </div>`
    }

    spellsByLevel() {
        const byLevel = {};

        this.spells.forEach((spell) => {
            if (byLevel[spell.level]) byLevel[spell.level] = byLevel[spell.level].concat(spell); else byLevel[spell.level] = [spell];
        });


        return Object.keys(byLevel).map((key) => {
            return `
                <div class="w-100 font-size fw-500" style="color: rosybrown; --font-size: 18px">${key} Уровень ${key === '0' ? '( Заговор )' : ''} </div>
                ${byLevel[key].map((spell) => spell.toHTML()).join(' ')}
                `
        }).join(' ')
    }
}

export class Spell {
    name;
    level;
    levelDescription;
    castingTime;
    distance;
    components;
    duration;
    description;

    static fromApi(spell) {
        return Object.assign(new Spell(), spell);
    }

    toHTML() {
        return `
        <div class="flex flex-column gap flex-grow-1 spell-card" style="--flex-gap: 4px">
            <div class="fw-500">${this.name}</div>

            <div class="font-size" style="--font-size: 12px">${this.levelDescription}</div>

            <div class="font-size" style="--font-size: 12px">${this.castingTime}</div>

            <div class="font-size" style="--font-size: 12px">${this.distance}</div>

            <div class="font-size" style="--font-size: 12px">${this.components}</div>

            <div class="font-size" style="--font-size: 12px">${this.duration}</div>

            <div style="color: #5c5c5c">${this.description}</div>
        </div>`
    }
}