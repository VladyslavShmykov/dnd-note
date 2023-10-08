import {RangerSpells} from "/spells/ranger-spells.js";
import {BardSpells} from "/spells/bard-spells.js";
import {DruidSpells} from "/spells/druid-spells.js";
import {PriestSpells} from "/spells/priest-spells.js";
import {ClassSpells} from "/all-spells/class-spells.js";

export class AllSpells {
    bardSpells = ClassSpells.fromApi({
        type: 'BARD',
        name: 'ЗАКЛИНАНИЯ БАРДА',
        spells: BardSpells
    });

    druidSpells = ClassSpells.fromApi({
        type: 'DRUID',
        name: 'ЗАКЛИНАНИЯ ДРУИДА',
        spells: DruidSpells,
    });

    priestSpells = ClassSpells.fromApi({
        type: 'PRIEST',
        name: 'ЗАКЛИНАНИЯ ЖРЕЦА',
        spells: PriestSpells
    });

    rangerSpells = ClassSpells.fromApi({
        type: 'RANGER',
        name: 'ЗАКЛИНАНИЯ СЛЕДОПЫТА',
        spells: RangerSpells
    });

    toHTML() {
        const classes = [this.bardSpells, this.druidSpells, this.priestSpells, this.rangerSpells]
        return `<div class="flex flex-column gap padding spells-bg" style="--padding: 8px">
            ${classes.map((classs) => classs.toHTML()).join(' ')}
        </div>`
    }
}