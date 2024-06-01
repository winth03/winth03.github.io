import { Form } from "react-bootstrap";
import { toTitleCase } from "../wiki/utils";

export const EXTRA_ELEMENTS = {
    checkbox: (item, key, value, IM) => (
        <Form.Check
            key={key}
            label={toTitleCase(key)}
            checked={value ?? false}
            onChange={(event) => IM.setExtra(item, key, event.target.checked)}
        />
    ),
    hidden: (item, key, value, IM) => (
        <Form.Control
            key={key}
            id={`${item.name}_${key}`}
            type="hidden"
            value={value}
            readOnly
        />
    )
}

export const PARSER = {
    armor: {
        group: false,
        carryLoad: () => 0,
        extra: () => undefined
    },
    armors: {
        group: false,
        carryLoad: (qty, data) => {
            const load = parseInt(data["Load and STR Req"].split(", ")[0].split(": ")[1]);
            if (data["equip"]) return Math.floor(load * qty / 2);
            else return load * qty;
        },
        extra: () => ({
            equip: ["checkbox"]
        })
    },
    power_armors: {
        group: false,
        carryLoad: (qty, data) => {
            if (data["equip"]) return 0;
            else return 100 * qty;
        },
        extra: () => ({
            equip: ["checkbox"]
        })
    },
    melee_weapons: {
        group: false,
        carryLoad: (qty, data) => {
            const load = parseInt(data["Load and STR Req"].split(", ")[0].split(": ")[1]);
            return load * qty;
        },
        extra: () => undefined
    },
    ranged_weapons: {
        group: false,
        carryLoad: (qty, data) => {
            const load = parseInt(data["Load and STR Req"].split(", ")[0].split(": ")[1]);
            return load * qty;
        },
        extra: () => undefined
    },
    ammunition: {
        group: true,
        carryLoad: (qty) => Math.floor(qty / 10),
        extra: () => undefined
    },
    heavy_ammunition: {
        group: false,
        carryLoad: (qty, data) => qty * parseInt(data["Individual Load"]),
        extra: () => undefined
    },
    items_and_gear: {
        group: false,
        carryLoad: (qty, data) => {
            const load = parseInt(data["Load"].replace(/[(),]/ig, "").split(" ", 1)[0]);
            const keys = Object.keys(data);
            const equal = document.getElementById(`${data["Name"]}_equal`)?.value;
            if (equal && keys.includes("worn")) return (data["worn"] ? equal : load) * qty;
            else if (equal && keys.includes("full")) return (data["full"] ? equal : load) * qty;
            else if (keys.includes("worn")) return data["worn"] ? 0 : load * qty;
            else return load * qty;
        },
        extra(data) {
            const extra = {};
            const loadDesc = data["Load"].replace(/[\(\)]/ig, "").split(" ").slice(1).join(" ");
            if (loadDesc === "while not worn") {
                extra.worn = ["checkbox"];
            } else if ((/^equal to.+when full$/).test(loadDesc)) {
                extra.full = ["checkbox"];
                extra.equal = ["hidden", parseInt(loadDesc.split(" ")[2])];
            } else if ((/^equal to.+while worn$/).test(loadDesc)) {
                extra.worn = ["checkbox"];
                extra.equal = ["hidden", parseInt(loadDesc.split(" ")[2])];
            }
            return Object.keys(extra).length ? extra : undefined;
        }
    },
    explosives: {
        group: false,
        carryLoad: (qty, data) => parseInt(data["Load"].split(": ")[1]) * qty,
        extra: () => undefined
    },
}

export class InventoryItem {
    constructor(item, qty, parserKey, data, root = true) {
        this.group = PARSER[parserKey].group && root;
        this.name = (this.group && root) ? toTitleCase(parserKey) : item;
        this.parserKey = parserKey;
        this.groupItems = [];
        
        if (this.group) {
            this.addGroupItem(item, data, qty);
        } else {
            this.qty = qty;
            this.data = data;
        }
    }

    get carryLoad() {
        return PARSER[this.parserKey].carryLoad(this.qty, this.data);
    }

    set qty(qty) {
        if (this.group) return;
        else this._qty = qty;
    }
    get qty() {
        if (this.group) return this.groupItems.reduce((acc, item) => acc + item.qty, 0);
        return this._qty;
    }    

    addGroupItem(item, data, qty = 1) {
        const itemIndex = this.groupItems.findIndex(i => i.name === item);
        if (itemIndex === -1) {
            this.groupItems.push(new InventoryItem(item, qty, this.parserKey, data,false));
        } else {
            this.groupItems[itemIndex].qty++;
        }        
    }
}

export class InventoryManager {
    constructor(callback) {
        this.items = [];
        this.loaded = false;
        this.callback = callback;
    }

    get carryLoad() {
        return this.items.reduce((acc, item) => acc + item.carryLoad, 0);
    }

    addItem(item, key, data, qty = 1, save = true) {
        const keyList = key.split("-").map(e => e.split(".")[0].replace(" ", "_").toLowerCase()).reverse();
        const parserKey = keyList.find(e => Object.keys(PARSER).includes(e));
        const itemIndex = Math.max(this.items.findIndex(i => i.name === item), this.items.findIndex(i => i.name === toTitleCase(parserKey)));
        if (itemIndex === -1) {
            // get first key that is in PARSER
            this.items.push(new InventoryItem(item, qty, parserKey, data));
        } else {            
            if (this.items[itemIndex].group) {
                this.items[itemIndex].addGroupItem(item, data);
            } else this.items[itemIndex].qty += qty;
        }
        if (this.callback && save) this.callback();
    }

    removeItem(itemKey) {
        var [item, groupIndex] = itemKey.split("_");
        groupIndex = parseInt(groupIndex) || -1;
        if (groupIndex !== -1) {
            this.items.find(i => i.name === item).groupItems.splice(groupIndex, 1);
        }
        else this.items = this.items.filter(i => i.name !== item);
        if (this.callback) this.callback();
    }

    setExtra(item, key, value) {
        if (!Object.keys(PARSER[item.parserKey].extra(item.data) ?? {}).includes(key)) throw new Error("Invalid extra key");
        item.data[key] = value;

        if (this.callback) this.callback();
    }

    save() {
        localStorage.setItem('InventoryManager', JSON.stringify(this.items));
        console.log("Saved inventory");
    }

    load() {
        const items = JSON.parse(localStorage.getItem('InventoryManager'));
        if (items) {
            items.forEach(item => {
                const isGroup = PARSER[item.parserKey].group;
                if (isGroup) {
                    item.groupItems.forEach(groupItem => {
                        this.addItem(groupItem.name, groupItem.parserKey, groupItem.data, groupItem._qty, false);
                    });
                } else {
                    this.addItem(item.name, item.parserKey, item.data, item._qty, false);
                }
            });
        }
        this.loaded = true;
        console.log("Loaded inventory", items);
        if (this.callback) this.callback();
    }
}