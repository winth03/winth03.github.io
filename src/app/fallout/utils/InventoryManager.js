import { toTitleCase } from "./utils";

// Moved PARSER to a separate file for better organization
import { PARSER } from "./inventoryParser";

export class InventoryItem {
    constructor(item, qty, parserKey, data, root = true) {
        const extraData = PARSER[parserKey].extra(data);
        this.group = (extraData || PARSER[parserKey].group(data)) && root;
        this.name = this.group && root ? (data.groupName || parserKey) : item;
        this.parserKey = parserKey;
        this.groupItems = [];
        this.extra = extraData;
        this.data = data;
        
        if (this.group) {
            this.addGroupItem(item, data, qty);
        } else {
            this._qty = qty;
        }
    }

    get carryLoad() {
        if (this.extra && this.group) {
            return this.groupItems.reduce((acc, item) => acc + item.carryLoad, 0);
        }
        return PARSER[this.parserKey].carryLoad(this.qty, this.data, this.extra);
    }

    get qty() {
        return this.group ? this.groupItems.reduce((acc, item) => acc + item.qty, 0) : this._qty;
    }

    set qty(qty) {
        if (!this.group) {
            this._qty = qty;
        }
    }

    addGroupItem(item, data, qty = 1) {
        const existingItem = this.groupItems.find(i => i.name === item);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            this.groupItems.push(new InventoryItem(item, qty, this.parserKey, data, false));
        }
    }

    changeGroupItemQty(item, data, amount, manager) {
        const existingItem = this.groupItems.find(i => i.name === item);
        if (existingItem) {
            existingItem.qty += amount;
            if (existingItem.qty <= 0) {
                manager.removeItem(`${this.name}/${this.groupItems.indexOf(existingItem)}`);
            }
        } else if (amount > 0) {
            manager.addItem(item, this.parserKey, data, amount, true);
        }
    }
}

export default class InventoryManager {
    constructor(callback) {
        this.items = [];
        this.loaded = false;
        this.callback = callback;
        this._caps = 0;
    }

    get carryLoad() {
        return this.items.reduce((acc, item) => acc + item.carryLoad, 0) + Math.floor(this.caps / 50);
    }

    set caps(value) {
        this._caps = typeof value === "string" ? parseInt(value, 10) : value;
        this.triggerCallback();
    }

    get caps() {
        return this._caps;
    }

    addItem(item, key, data, qty = 1, save = true) {
        const keyList = key.split("-").map(e => e.split(".")[0].replace(" ", "_").toLowerCase());
        const parserKey = keyList.find(e => PARSER.hasOwnProperty(e));
        const existingItem = this.items.find(i => i.name === item || i.name === parserKey || i.name === data.groupName);

        if (existingItem) {
            if (existingItem.group) {
                existingItem.addGroupItem(item, data, qty);
            } else {
                existingItem.qty += qty;
            }
        } else {
            this.items.push(new InventoryItem(item, qty, parserKey, data));
        }

        if (save) {
            this.triggerCallback();
        }
    }

    updateItemQuantity(itemKey, amount) {
        const [item, groupIndex] = itemKey.split("/");
        const parsedGroupIndex = parseInt(groupIndex, 10);
        const targetItem = this.items.find(i => i.name === item);

        if (!isNaN(parsedGroupIndex)) {
            const groupItem = targetItem.groupItems[parsedGroupIndex];
            if (groupItem) {
                groupItem.qty = amount;
                if (groupItem.qty <= 0) {
                    this.removeItem(itemKey);
                }
            }
        } else if (targetItem) {
            targetItem.qty = amount;
            if (targetItem.qty <= 0) {
                this.removeItem(itemKey);
            }
        }

        this.triggerCallback();
    }

    removeItem(itemKey) {
        const [item, groupIndex] = itemKey.split("/");
        const parsedGroupIndex = parseInt(groupIndex, 10);

        if (!isNaN(parsedGroupIndex)) {
            const targetItem = this.items.find(i => i.name === item);
            if (targetItem) {
                targetItem.groupItems.splice(parsedGroupIndex, 1);
            }
        } else {
            this.items = this.items.filter(i => i.name !== item);
        }

        this.triggerCallback();
    }

    findItem(itemKey) {
        const [item, groupIndex] = itemKey.split("/");
        const parsedGroupIndex = parseInt(groupIndex, 10);

        if (!isNaN(parsedGroupIndex)) {
            const targetItem = this.items.find(i => i.name === item);
            if (targetItem) {
                return targetItem.groupItems[parsedGroupIndex];
            }
        }

        return this.items.find(i => i.name === item);
    }

    setExtra(item, groupItem, value) {
        const { label, name, data } = groupItem;
        const newItemName = value ? `${name} (${toTitleCase(label)})` : name.split(" ").slice(0, -1).join(" ");

        item.changeGroupItemQty(name, data, -1, this);
        item.changeGroupItemQty(newItemName, data, 1, this);

        const updatedItem = item.groupItems.find(i => i.name === newItemName);
        if (updatedItem && updatedItem.extra) {
            updatedItem.extra.value = value;
        }

        this.triggerCallback();
    }

    save() {
        localStorage.setItem('InventoryManager', JSON.stringify(this));
        console.log("Saved inventory");
    }

    load() {
        try {
            const loadedData = JSON.parse(localStorage.getItem('InventoryManager'));
            this.caps = loadedData?._caps ?? 0;

            if (loadedData?.items) {
                loadedData.items.forEach(item => {
                    if (item.group) {
                        item.groupItems.forEach(groupItem => {
                            this.addItem(groupItem.name, groupItem.parserKey, groupItem.data, groupItem._qty, false);
                            const lastAddedItem = this.items[this.items.length - 1];
                            const lastGroupItem = lastAddedItem.groupItems.find(i => i.name === groupItem.name);
                            if (lastGroupItem) {
                                lastGroupItem.extra = groupItem.extra;
                            }
                        });
                    } else {
                        this.addItem(item.name, item.parserKey, item.data, item._qty, false);
                    }
                });
            }

            this.loaded = true;
            console.log("Loaded inventory", loadedData?.items);
            this.triggerCallback();
        } catch (error) {
            console.error("Error loading inventory", error);
            this.handleLoadError();
        }
    }

    handleLoadError() {
        this.downloadInventory();
        localStorage.removeItem('InventoryManager');
        this.items = [];
        this.caps = 0;
        this.loaded = true;
    }

    downloadInventory() {
        const inventory = localStorage.getItem('InventoryManager');
        const blob = new Blob([inventory], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    triggerCallback() {
        if (this.callback) {
            this.callback();
        }
    }
}