import InventoryManager from "./InventoryManager"
import TurnManager from "./TurnManager"

const LEVEL_TABLE = [
    { // Level 1
        base: 10,
        multiplier: 1,
        perks: 1,
        skillPoints: [0,0,0]
    },
    { // Level 2
        base: 10,
        multiplier: 1,
        perks: 2,
        skillPoints: [0,0,0]
    },
    { // Level 3
        base: 15,
        multiplier: 2,
        perks: 3,
        skillPoints: [0,0,0]
    },
    { // Level 4
        base: 15,
        multiplier: 2,
        perks: 4,
        skillPoints: [0,0,0]
    },
    { // Level 5
        base: 20,
        multiplier: 3,
        perks: 4,
        skillPoints: [3,4,5]
    },
    { // Level 6
        base: 20,
        multiplier: 3,
        perks: 5,
        skillPoints: [3,4,5]
    },
    { // Level 7
        base: 25,
        multiplier: 4,
        perks: 6,
        skillPoints: [3,4,5]
    },
    { // Level 8
        base: 25,
        multiplier: 4,
        perks: 7,
        skillPoints: [3,4,5]
    },
    { // Level 9
        base: 30,
        multiplier: 5,
        perks: 7,
        skillPoints: [6,8,10]
    },
    { // Level 10
        base: 30,
        multiplier: 5,
        perks: 8,
        skillPoints: [6,8,10]
    },
    { // Level 11
        base: 35,
        multiplier: 6,
        perks: 9,
        skillPoints: [6,8,10]
    },
    { // Level 12
        base: 35,
        multiplier: 6,
        perks: 10,
        skillPoints: [6,8,10]
    },
    { // Level 13
        base: 40,
        multiplier: 7,
        perks: 10,
        skillPoints: [9,12,15]
    },
    { // Level 14
        base: 40,
        multiplier: 7,
        perks: 11,
        skillPoints: [9,12,15]
    },
    { // Level 15
        base: 45,
        multiplier: 8,
        perks: 12,
        skillPoints: [9,12,15]
    },
    { // Level 16
        base: 45,
        multiplier: 8,
        perks: 13,
        skillPoints: [9,12,15]
    },
    { // Level 17
        base: 50,
        multiplier: 9,
        perks: 13,
        skillPoints: [12,16,20]
    },
    { // Level 18
        base: 50,
        multiplier: 9,
        perks: 14,
        skillPoints: [12,16,20]
    },
    { // Level 19
        base: 55,
        multiplier: 10,
        perks: 14,
        skillPoints: [12,16,20]
    },
    { // Level 20
        base: 55,
        multiplier: 10,
        perks: 15,
        skillPoints: [12,16,20]
    },
    { // Level 21
        base: 60,
        multiplier: 11,
        perks: 16,
        skillPoints: [15,20,25]
    },
    { // Level 22
        base: 60,
        multiplier: 11,
        perks: 17,
        skillPoints: [15,20,25]
    },
    { // Level 23
        base: 65,
        multiplier: 12,
        perks: 18,
        skillPoints: [15,20,25]
    },
    { // Level 24
        base: 65,
        multiplier: 12,
        perks: 19,
        skillPoints: [15,20,25]
    },
    { // Level 25
        base: 70,
        multiplier: 13,
        perks: 20,
        skillPoints: [18,24,30]
    },
    { // Level 26
        base: 70,
        multiplier: 13,
        perks: 21,
        skillPoints: [18,24,30]
    },
    { // Level 27
        base: 75,
        multiplier: 14,
        perks: 22,
        skillPoints: [18,24,30]
    },
    { // Level 28
        base: 75,
        multiplier: 14,
        perks: 23,
        skillPoints: [18,24,30]
    },
    { // Level 29
        base: 80,
        multiplier: 15,
        perks: 24,
        skillPoints: [21,28,35]
    },
    { // Level 30
        base: 80,
        multiplier: 15,
        perks: 25,
        skillPoints: [21,28,35]
    }
]

export class FalloutCharacter {
    constructor(name, race, special) {
        this.name = name;
        this.race = race;
        this.strength = special.strength;
        this.perception = special.perception;
        this.endurance = special.endurance;
        this.charisma = special.charisma;
        this.intelligence = special.intelligence;
        this.agility = special.agility;
        this.luck = special.luck;
        this.perks = [];
        this.level = 1;
        this.partyNerve = 0;
        this.groupSneak = 0;
        this.fatigue = 0;
        this.hunger = 0;
        this.dehydration = 0;
        this.exhaustion = 0;
        this.radiation = 0;
        this.InventoryManager = new InventoryManager();
        this.turnManager = new TurnManager();
    }

    // SPECIAL functions
    get modifier() {
        return {
            strength: this.getModifier(this.strength),
            perception: this.getModifier(this.perception),
            endurance: this.getModifier(this.endurance),
            charisma: this.getModifier(this.charisma),
            intelligence: this.getModifier(this.intelligence),
            agility: this.getModifier(this.agility),
            luck: this.getModifier(this.luck),
        };
    }
    getModifier(value) {
        return value - 5;
    }

    // Derivative stats functions
    get spMax() {
        return LEVEL_TABLE[this.level - 1].base + LEVEL_TABLE[this.level - 1].multiplier * this.agility;
    }
    get sp() {
        return this._sp ?? this.spMax;
    }
    set sp(value) {
        if (value < 0) this._sp = 0;
        else if (value > this.spMax) this._sp = this.spMax;
        else this._sp = value;
    }

    get hpMax() {
        return LEVEL_TABLE[this.level - 1].base + LEVEL_TABLE[this.level - 1].multiplier * this.endurance;
    }
    get hp() {
        return this._hp ?? this.hpMax;
    }
    set hp(value) {
        if (value < 0) this._hp = 0;
        else if (value > this.hpMax) this._hp = this.hpMax;
        else this._hp = value;
    }

    get healingRate() {
        return Math.floor((this.endurance + this.level) / 2);
    }

    get combatSequence() {
        return this.modifier.perception;
    }

    get actionPoints() {
        return 10 + this.modifier.agility;
    }

    get passiveSense() {
        return 12 + this.modifier.perception;
    }

    get radiationDC() {
        return 12 - this.modifier.endurance;
    }

    get carryLoad() {
        return 10 * this.strength;
    }

    // Leveling functions
    addPerk(perk) {
        if (this.perks.length == LEVEL_TABLE[this.level - 1].perks) return false;
        this.perks.push(perk);
        perk.wrap(this);
        return true;
    }

    load(data) {
        this.name = data.name;
        this.race = data.race;
        this.strength = data.strength;
        this.perception = data.perception;
        this.endurance = data.endurance;
        this.charisma = data.charisma;
        this.intelligence = data.intelligence;
        this.agility = data.agility;
        this.luck = data.luck;
        this.level = data.level;
        this.sp = data.sp;
        this.hp = data.hp;
        this.partyNerve = data.partyNerve;
        this.groupSneak = data.groupSneak;
        this.fatigue = data.fatigue;
        this.hunger = data.hunger;
        this.dehydration = data.dehydration;
        this.exhaustion = data.exhaustion;
        this.radiation = data.radiation;
        this.InventoryManager.load(data.inventory);
        this.turnManager.load(data.turns);
    }
}