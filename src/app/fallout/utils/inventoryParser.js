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
            let load = data["Load"].split(" ");
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