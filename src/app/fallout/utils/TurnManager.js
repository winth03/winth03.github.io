const numericRegex = new RegExp("^(0|[1-9][0-9]*)$");

export class Turn {
    constructor(APmax = 10, fullRecycle = false, dying = false, lastTurn = null) {
        this.actions = [];
        this.fullRecycle = fullRecycle;
        this.dying = dying;
        this.firstTurnDying = false;
        this.lastTurn = lastTurn;
        this._APmax = APmax;
    }

    // getters and setters
    set APmax(value) {
        this._APmax = value;
    }
    get APmax() {
        if (this.dying) return 0;
        return this._APmax;
    }

    get APused() {
        return this.actions.reduce((acc, action) => {
            if (!numericRegex.test(action.apCost)) return acc;
            return acc + parseInt(action.apCost);
        }, 0);
    }

    get APleft() {
        if (this.lastTurn) return this.recycledAP + this.APmax - this.APused;
        else return this.APmax - this.APused;
    }

    get recycledAP() {
        if (this.fullRecycle || this.lastTurn?.dying) return this.lastTurn.APleft;
        else return Math.floor((this.lastTurn?.APleft ?? 0) / 2);
    }

    // Data functions

    addAction(action) {
        this.actions.push(action);
    }

    removeAction(index) {
        this.actions.splice(index, 1);
    }
}

export default class TurnManager {
    constructor(callback) {
        this.currentTurn = 0;
        this.turnQueue = [new Turn()];
        this.loaded = false;
        this.callback = callback;
    }

    // getters and setters
    get turn() {
        return this.turnQueue[this.currentTurn];
    }

    set APmax(value) {
        this.turn.APmax = parseInt(value);
        this.triggerCallback();
    }
    get APmax() {
        return this.turn.APmax;
    }
    
    set fullRecycle(value) {
        this.turn.fullRecycle = value;
        this.triggerCallback();
    }
    get fullRecycle() {
        return this.turn.fullRecycle;
    }
    
    set dying(value) {
        this.turn.dying = value;
        if (value) this.turn.firstTurnDying = value;
        this.triggerCallback();
    }
    get dying() {
        return this.turn.dying;
    }

    // Turn functions
    nextTurn(save = true) {
        if (this.turn.APleft < 0) return alert("You do not have enough AP to end your turn.");

        const newTurn = new Turn(this.APmax, this.fullRecycle, this.dying, this.turn);
        this.turnQueue.push(newTurn);
        this.currentTurn++;

        if (save) this.triggerCallback();
    }

    rollbackTurn() {
        if (this.currentTurn === 0) return alert("You cannot rollback any further.");

        this.turnQueue.pop();
        this.currentTurn--;

        this.triggerCallback();
    }

    addActionToQueue(action, save = true) {
        this.turn.addAction(action);

        if (save) this.triggerCallback();
    }

    removeActionFromQueue(actionIndex) {
        this.turn.removeAction(actionIndex);

        this.triggerCallback();
    }

    reset() {
        this.currentTurn = 0;
        this.turnQueue = [new Turn()];

        this.triggerCallback();
    }

    // Save to local storage
    save() {
        localStorage.setItem("TurnManager", JSON.stringify(this));
    }

    // Load from local storage
    load() {
        try {
            const data = JSON.parse(localStorage.getItem("TurnManager"));
            if (data) {
                console.log("Loaded data from local storage.", data);
                this.currentTurn = 0;
                data.turnQueue.forEach((turn, turnIndex) => {
                    if (turnIndex === 0) {
                        this.turnQueue[this.currentTurn] = new Turn(turn._APmax, turn.fullRecycle, turn.dying, turn.lastTurn);
                    } else {
                        this.nextTurn(false);
                        this.APmax = turn._APmax;
                        this.fullRecycle = turn.fullRecycle;
                        this.dying = turn.dying;
                    }
                    turn.actions.forEach(action => {
                        this.addActionToQueue(action, false);
                    });
                });
            }
            else console.log("No data found in local storage.");
            this.loaded = true;

            this.triggerCallback();
        } catch (error) {
            console.error("Error loading data from local storage.", error);
            this.handleLoadError();
        }
    }

    handleLoadError() {
        localStorage.removeItem("TurnManager");
        this.reset();
        this.loaded = true;
    }

    triggerCallback() {
        if (this.callback) this.callback();
    }
}