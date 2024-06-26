import { Form } from "react-bootstrap";
import { toTitleCase } from "./utils";

export const PARSER = {
    armor: {
        group: () => false,
        carryLoad: () => 0,
        extra: () => undefined
    },
    armors: {
        group: () => false,
        carryLoad: (qty, data, extra) => {
            return (extra.value ? extra.values[0] : extra.values[1]) * qty;
        },
        extra: (data) => {
            const load = parseInt(data["Load and STR Req"].split(", ")[0].split(": ")[1]);
            return {
                label: "equip",
                values: [Math.floor(load / 2), load],
                value: false
            };
        }
    },
    power_armors: {
        group: () => false,
        carryLoad: (qty, data, extra) => {
            return (extra.value ? extra.values[0] : extra.values[1]) * qty;
        },
        extra: () => ({
            label: "equip",
            values: [0, 100],
            value: false
        })
    },
    chems: {
        group: () => false,
        carryLoad: (qty, data) => {
            var load = data["Load"].split(" ");
            if (load.length === 1) return parseInt(load[0]) * qty;
            else return parseInt(load[0]) * Math.floor(qty / 10);
        },
        extra: () => undefined
    },
    robot_overclock_programs: {
        group: () => false,
        carryLoad: (qty, data) => Math.floor(qty / 10),
        extra: () => undefined
    },
    food_and_drink: {
        group: () => false,
        carryLoad: (qty, data) => (parseInt(data["Load"]) || 0) * qty,
        extra: () => undefined
    },
    melee_weapons: {
        group: () => false,
        carryLoad: (qty, data) => {
            const load = parseInt(data["Load and STR Req"].split(", ")[0].split(": ")[1]);
            return load * qty;
        },
        extra: () => undefined
    },
    ranged_weapons: {
        group: () => false,
        carryLoad: (qty, data) => {
            const load = parseInt(data["Load and STR Req"].split(", ")[0].split(": ")[1]);
            return load * qty;
        },
        extra: () => undefined
    },
    ammunition: {
        group: () => true,
        carryLoad: (qty) => Math.floor(qty / 10),
        extra: () => undefined
    },
    heavy_ammunition: {
        group: () => false,
        carryLoad: (qty, data) => qty * parseInt(data["Individual Load"]),
        extra: () => undefined
    },
    items_and_gear: {
        group: () => false,
        carryLoad: (qty, data, extra) => {
            const load = parseInt(data["Load"].replace(/[\(\)]/ig, "").split(" ", 1)[0]);
            if (extra) return (extra.value ? extra.values[0] : extra.values[1]) * qty;
            else return load * qty;
        },
        extra(data) {
            const extra = {};
            const loadData = data["Load"].replace(/[\(\)]/ig, "").split(" ");
            const load = parseInt(loadData[0]);
            const loadDesc = loadData.slice(1).join(" ");
            if (loadDesc === "while not worn") {
                extra.label = "equip";
                extra.values = [0, load];
            } else if ((/^equal to.+when full$/).test(loadDesc)) {
                extra.label = "full";
                extra.values = [parseInt(loadDesc.split(" ")[2]), load];
            } else if ((/^equal to.+while worn$/).test(loadDesc)) {
                extra.label = "equip";
                extra.values = [parseInt(loadDesc.split(" ")[2]), load];
            }
            return Object.keys(extra).length ? {...extra, value: false} : undefined;
        }
    },
    explosives: {
        group: () => false,
        carryLoad: (qty, data) => parseInt(data["Load"].split(": ")[1]) * qty,
        extra: () => undefined
    },
    skill_magazines: {
        group: () => false,
        carryLoad: () => 0,
        extra: () => undefined
    },
    other_equipments: {
        group: () => false,
        carryLoad: (qty, data) => (parseInt(data["Load"]) || 0) * qty,
        extra: () => undefined
    },
    junk: {
        group: () => true,
        carryLoad: (qty) => Math.floor(qty / 5),
        extra: () => undefined
    },
    custom: {
        group: (data) => data.group,
        carryLoad: (qty, data, extra) => {
            if (!data) return 0;
            else if (extra) return (extra.value ? extra.values[0] : extra.values[1]) * qty;
            else if (data.groupQPL) return Math.floor(qty / data.groupQPL) * data.load;
            else return (data.load || 0) * qty;
        },
        extra: (data) => {
            if (!data.extra) return undefined;
            else return {
                label: data.extra.label,
                values: data.extra.values,
                value: false
            };
        }
    }
}

export class InventoryItem {    
    constructor(item, qty, parserKey, data, root = true) {
        const extraData = PARSER[parserKey].extra(data);
        this.group = (extraData || PARSER[parserKey].group(data)) && root;
        this.name = (this.group && root) ? (data.groupName || parserKey) : item;
        this.parserKey = parserKey;
        this.groupItems = [];        
        this.extra = extraData;
        this.data = data;
        
        if (this.group) {
            this.addGroupItem(item, data, qty);
        } else {
            this.qty = qty;
        }
    }

    get carryLoad() {
        if (this.extra && this.group) return this.groupItems.reduce((acc, item) => acc + item.carryLoad, 0);
        else {            
            return PARSER[this.parserKey].carryLoad(this.qty, this.data, this.extra);
        }
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

    changeGroupItemQty(item, data, amount, manager) {
        const itemIndex = this.groupItems.findIndex(i => i.name === item);
        if (itemIndex !== -1) {
            this.groupItems[itemIndex].qty += amount;
            if (this.groupItems[itemIndex].qty <= 0) {
                manager.removeItem(`${this.name}/${itemIndex}`);
            }
        } else if (amount > 0) {
            manager.addItem(item, this.parserKey, data, amount, true);
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
        return this.items.reduce((acc, item) => acc + item.carryLoad, 0) + Math.floor(this.caps / 50);
    }

    set caps(value) {
        this._caps = (typeof value === "string") ? parseInt(value) : value;
        if (this.callback) this.callback();
    }
    get caps() {
        return this._caps ?? 0;
    }

    addItem(item, key, data, qty = 1, save = true) {
        const keyList = key.split("-").map(e => e.split(".")[0].replace(" ", "_").toLowerCase()).reverse();
        const parserKey = keyList.find(e => Object.keys(PARSER).includes(e));
        const itemIndex = Math.max(this.items.findIndex(i => i.name === item), this.items.findIndex(i => i.name === parserKey || i.name === data.groupName));
        if (itemIndex === -1) {
            const newItem = new InventoryItem(item, qty, parserKey, data);
            this.items.push(newItem);
        } else {            
            if (this.items[itemIndex].group) {
                this.items[itemIndex].addGroupItem(item, data, qty);
            } else this.items[itemIndex].qty += qty;
        }
        if (this.callback && save) this.callback();
    }

    removeItem(itemKey) {
        var [item, groupIndex] = itemKey.split("/");
        console.log(item, groupIndex);
        groupIndex = parseInt(groupIndex) === 0 ? 0 : (parseInt(groupIndex) || -1);
        if (groupIndex !== -1) {
            this.items.find(i => i.name === item).groupItems.splice(groupIndex, 1);
        }
        else this.items = this.items.filter(i => i.name !== item);
        if (this.callback) this.callback();
    }

    setExtra(item, groupItem, value) {
        const label = groupItem.extra.label;
        const name = groupItem.name;
        var data = groupItem.data;
        // If value is true add a new item with the extra value and remove 1 of the old one
        if (value) {
            var newItemName = `${name} (${toTitleCase(label)})`;
            item.changeGroupItemQty(newItemName, data, 1, this);
            item.groupItems.find(i => i.name === newItemName).extra.value = true;
            item.changeGroupItemQty(name, data, -1, this);
        } else {
            item.changeGroupItemQty(name, data, -1, this);
            var newItemName = name.split(" ");
            newItemName.pop();
            newItemName = newItemName.join(" ");
            item.changeGroupItemQty(newItemName, data, 1, this);
        }

        if (this.callback) this.callback();
    }

    save() {
        localStorage.setItem('InventoryManager', JSON.stringify(this));
        console.log("Saved inventory");
    }

    load() {
        const loadedData = JSON.parse(localStorage.getItem('InventoryManager'));
        const items = loadedData?.items;
        this.caps = loadedData?._caps;
        if (items) {
            items.forEach(item => {
                if (item.group) {
                    item.groupItems.forEach(groupItem => {
                        this.addItem(groupItem.name, groupItem.parserKey, groupItem.data, groupItem._qty, false);
                        this.items[this.items.length - 1].groupItems.find(i => i.name === groupItem.name).extra = groupItem.extra;
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