import {BardSpells} from "/src/spells/bard-spells.js";
import {DruidSpells} from "/src/spells/druid-spells.js";
import {RangerSpells} from "/src/spells/ranger-spells.js";
import {PriestSpells} from "/src/spells/priest-spells.js";
import {Spell} from "/src/all-spells/class-spells.js";
import {RacialSpells} from "/src/spells/racial-spells.js";

export class Main {
    name;
    playerClass;
    race;
    selectedSpells = [];

    // Injectable;
    refToHTML;
    playerStorage;
    dialog;

    addingName = false;

    id = 'MAIN1378';

    classTypes = ['BARD', 'DRUID', 'PRIEST', 'RANGER', 'MONK'];

    raceTypes = ['DRAGONBORN', 'HUMAN', 'ELF', 'TIEFLING', 'FIRBOLG'];

    static fromApi(main) {
        const _main = Object.assign(new Main(), main);

        const savedData = _main.playerStorage.getBlockByKey('MAIN');

        _main.name = savedData?.name || '';
        _main.playerClass = savedData?.playerClass || undefined;
        _main.race = savedData?.race || undefined;
        _main.selectedSpells = savedData?.selectedSpells || [];

        return _main;
    }

    toHTML() {
        return `
        <div class="flex gap padding" style="--padding: 8px">
            ${this.getNameInput()}
        </div>
        
        <div>
            <select id="${this.id + 'selectRAce'}">
            <option value="">--Please choose an option--</option>
                ${this.raceTypes.map((_class) => `
                    <option class="text-capitalize" value="${_class}" 
                        ${this.race === _class ? 'selected' : ''}>${_class}
                    </option>
                `).join(' ')}
            </select>
        </div>
        
        <div>
            <select id="${this.id + 'selectClass'}">
            <option value="">--Please choose an option--</option>
                ${this.classTypes.map((_class) => `
                    <option class="text-capitalize" value="${_class}" 
                        ${this.playerClass === _class ? 'selected' : ''}>${_class}
                    </option>
                `).join(' ')}
            </select>
        </div>
        
        <div class="margin-top" style="--margin-top: 8px">
        ${this.getSpellsBlock()}
        </div>
        `
    }

    getNameInput() {
        if (!this.name && !this.addingName) {
            return `<span id="${this.id + 'span1'}">You don't have name yet, click here to add it</span>`
        }

        if (this.addingName) {
            return `<input type="text" id="${this.id + 'inputName'}" value="${this.name}" >`
        }

        if (this.name && !this.addingName) {
            return `<span id="${this.id + 'span1'}">${this.name} (Click on name if you want to change it)</span>`
        }
        return '';
    }

    getSpellsBlock() {
        const classWithSpells = this.classTypes.filter((c) => c !== 'MONK');

        if (!classWithSpells.includes(this.playerClass) || !this.playerClass) {
            return `<div class="mt">You didnt select a character or you dont have Class SPELLS :(((</div>`
        }

        const racial = RacialSpells?.[this.race] || [];

        return this.selectedSpells.map((selected) => `
        <div>${selected.level} УРОВЕНЬ</div> 
        
        <div class="flex flex-wrap gap align-items-center" style="--flex-gap: 4px">
        
            ${selected.level === 0 ? `
                ${racial.map((s) => Spell.fromApi(s).toHTML()).join(' ')}
            ` : ''}
        
            ${selected.spells.map((s) => {
            return `<div>
                       ${s.nonRemovable ? '' : `<div><button class="button" id="remove-${s.name}">Click to remove</button></div>`}
                       ${Spell.fromApi(s).toHTML()}
                    </div>`
        }).join(' ')}
            
            <div class="flex justify-content-center align-items-center cursor-pointer">
            
                <button class="button select-spell-dialog-opener" data-level="${selected.level}">Click to add spell +</button>
          
            </div>
            
        </div>
        
        <hr>
        `).join(' ');

    }

    getDialogTemplate(level) {
        const pickableSpells = this.getSpellsByClass().filter((s) => s.level === +level && s.description);
        const currentSpells = this.selectedSpells.find((group) => group.level === +level).spells;

        return `<div class="p flex flex-wrap justify-content-center cursor-pointer position-relative" id="container-spell-add1">
            
          <button id="dialog-closing-button-main-11" class="button position-absolute" style="top: 10px; right: 10px">X</button>  

          ${pickableSpells.map((s) => {
            return `<div class="d-flex" id="${s.name}" data-id="${s.name}">
                       ${currentSpells.some((cs) => cs.name === s.name) ? '<div class="w-100 p fw-500" style="background: green; color: #fff;">Already selected</div>' : ''}
                       ${Spell.fromApi(s).toHTML()}
                    </div>`
        }).join(' ')}
                </div>`
    }

    getSpellsByClass() {
        if (this.playerClass === 'BARD') return BardSpells;
        if (this.playerClass === 'DRUID') return DruidSpells;
        if (this.playerClass === 'RANGER') return RangerSpells;
        if (this.playerClass === 'PRIEST') return PriestSpells;

        return [];
    }

    addEventListeners() {
        document.getElementById(this.id + 'span1')?.addEventListener('click', () => {
            this.addingName = true;
            this.repaint();
        });

        document.getElementById(this.id + 'inputName')?.addEventListener('blur', (e) => {
            this.saveNewName(e);
        });

        document.getElementById(this.id + 'inputName')?.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) this.saveNewName(e);
        });

        if (this.addingName) document.getElementById(this.id + 'inputName')?.focus();

        document.getElementById(this.id + 'selectClass')?.addEventListener('change', (e) => {
            this.playerClass = e.target.value;
            this.assignSelectedSpells();
            this.repaint(true);
        })

        document.getElementById(this.id + 'selectRAce')?.addEventListener('change', (e) => {
            this.race = e.target.value;
            this.repaint(true);
        })

        document.querySelectorAll('.select-spell-dialog-opener')?.forEach((item) => {
            item.addEventListener('click', (e) => {
                const level = e.target.getAttribute('data-level');

                const options = {
                    width: '90vw',
                    height: '90vh',
                    onInit: this.addListenersInsideDialog.bind(this)
                }

                this.dialog.open(this.getDialogTemplate(level), options);
            })
        });

        this.selectedSpells.forEach((group) => {
            group.spells.forEach((spell) => {
                document.getElementById(`remove-${spell.name}`)?.addEventListener('click', () => {
                    group.spells = group.spells.filter((gs) => gs.name !== spell.name);

                    this.repaint(true);
                });
            })
        });
    }

    addListenersInsideDialog() {
        this.getSpellsByClass().filter((s) => s.description).forEach((s) => {
            document.getElementById(s.name)?.addEventListener('click', () => {
                const currentSpells = this.selectedSpells.find((group) => group.level === +s.level).spells;
                if (currentSpells.some((cs) => cs.name === s.name)) return;

                currentSpells.push(s);

                this.dialog.repaint(this.getDialogTemplate(s.level));
                this.repaint(true);
            })
        });

        document.getElementById('dialog-closing-button-main-11')?.addEventListener('click', () => {
            this.dialog.close();
        });
    }

    assignSelectedSpells() {
        if (!this.playerClass || this.playerClass === 'MONK') return;

        this.selectedSpells = Array.from(Array(2).keys()).map((k) => ({
            level: k,
            spells: [],
        }))

        if (this.playerClass === 'RANGER') this.selectedSpells[0].spells = [{
            nonRemovable: true,
            name: "Метка охотника [Hunter's mark]",
            level: 0,
            levelDescription: 'Метка',
            castingTime: '1 бонусное действие',
            distance: ' 90 футов',
            components: 'B',
            duration: 'Концентрация, вплоть до 1 часа',
            description: 'Вы выбираете существо, видимое в пределах дистанции, и объявляете его своей добычей. Пока заклинание активно, вы наносите цели дополнительно 1к6 урона каждый раз, когда попадаете по ней атакой оружием, и вы совершаете с преимуществом проверки Мудрости (Восприятие) и Мудрость (Выживание), совершённые для её поиска. Если хиты цели опускаются до 0, пока заклинание активно, вы можете в один из своих следующих ходов бонусным действием выбрать целью новое существо.\n' + '\n' + 'На больших уровнях. Если вы накладываете это заклинание, используя ячейку 3-го или 4-го уровня, вы можете поддерживать концентрацию 8 часов. Если вы используете ячейку заклинания 5-го уровня или выше, вы можете поддерживать концентрацию 24 часа.'
        }
        ]
    }

    saveNewName(e) {
        this.name = e.target.value ? e.target.value : this.name;
        this.addingName = false;
        this.repaint(true);
    }

    repaint(saveToApi = false) {
        if (saveToApi) this.toApi();

        this.refToHTML.innerHTML = this.toHTML();
        this.addEventListeners();
    }

    toApi() {
        const data = {
            name: this.name,
            playerClass: this.playerClass,
            race: this.race,
            selectedSpells: this.selectedSpells
        }

        this.playerStorage.updateOneBlock('MAIN', data);
    }
}