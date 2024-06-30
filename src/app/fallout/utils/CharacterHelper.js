// let __decorate = function (decorators, target, key, desc) {
//     let c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//     else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//     return c > 3 && r && Object.defineProperty(target, key, r), r;
// };

export class Trait {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    toJSON() {
        return {
            name: this.name,
            value: this.value
        };
    }
}

export class Perk {
    constructor(name, fn, target) {
        this.name = name;
        this.fn = fn;
        this.target = target;
    }

    wrap(obj) {
        let fn = this.fn.bind(this);
        this.target.forEach(target => {
            let originalMethod = obj[target];
            if (typeof originalMethod !== "function") {
                originalMethod = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), target)?.get?.bind(obj);
                if (typeof originalMethod !== "function") {
                    return;
                }
                Object.defineProperty(obj, target, {
                    get: function () {
                        let result = originalMethod();
                        return fn(result);
                    }
                });
            } else {
                originalMethod = originalMethod.bind(obj)
                obj[target] = function (...args) {
                    let result = originalMethod(...args);
                    return fn(result);
                };
            }
        })
    }

    toJSON() {
        return {
            name: this.name
        };
    }
}