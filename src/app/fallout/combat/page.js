"use client"

import { Accordion, Button, Container, Form, FormControl, ListGroup, Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const numericRegex = new RegExp("^(0|[1-9][0-9]*)$");

class TurnManager {
    constructor(callback) {
        this.currentTurn = 0;
        this.APmax = 10;
        this.turnQueue = [[]];
        this.fullRecycle = false;
        this.loaded = false;
        this.callback = callback;
    }

    nextTurn() {
        const APleft = this._calculateAP();
        if (APleft < 0) return alert("You do not have enough AP to end your turn.");

        this.turnQueue.push([]);
        this.currentTurn++;

        if (this.callback) this.callback();
    }

    rollbackTurn() {
        if (this.currentTurn === 0) return alert("You cannot rollback any further.");

        this.turnQueue.pop();
        this.currentTurn--;

        if (this.callback) this.callback();
    }

    _calculateRecycledAP(turn = this.currentTurn) {
        if (turn < 1) return 0;
        const APleft = this._calculateAP(turn - 1);
        if (this.fullRecycle) return APleft;
        return Math.floor(APleft / 2);
    }

    _calculateAP(turn = this.currentTurn) {
        if (turn < 0 || turn >= this.turnQueue.length) return 0;
        var currentTurn = this.turnQueue[turn];
        var currentAP = Math.min(this.APmax + this._calculateRecycledAP(turn), 15);
        currentTurn.forEach(action => {
            if (!numericRegex.test(action.apCost)) return;
            currentAP -= parseInt(action.apCost);
        });
        return currentAP;
    }

    set APmax(value) {
        if (!numericRegex.test(value)) return;
        this._APmax = parseInt(value) || 0;
        if (this.callback) this.callback();
    }
    get APmax() {
        return this._APmax;
    }

    get currentAP() {
        return this._calculateAP();
    }

    addActionToQueue(action) {
        this.turnQueue[this.currentTurn].push(action);

        if (this.callback) this.callback();
    }

    removeActionFromQueue(actionIndex) {
        this.turnQueue[this.currentTurn]?.splice(actionIndex, 1);

        if (this.callback) this.callback();
    }

    // Save to local storage
    save() {
        localStorage.setItem("TurnManager", JSON.stringify(this));
    }

    // Load from local storage
    load() {
        const data = localStorage.getItem("TurnManager");
        if (data) {
            console.log("Loaded data from local storage.");
            const loadedData = JSON.parse(data);
            this.currentTurn = loadedData.currentTurn;
            this.APmax = loadedData._APmax;
            this.turnQueue = loadedData.turnQueue;
            this.fullRecycle = loadedData.fullRecycle;
        }
        else console.log("No data found in local storage.");
        this.loaded = true;

        if (this.callback) this.callback();
    }
}

export default function FalloutCombat() {
    const actionsList = [
        {
            action: "Attack",
            apCost: "Dependent on the weapon",
            description: "You can make an attack with a weapon you are holding or using, the AP cost is dependent on the weapon."
        },
        {
            action: "Dodge",
            apCost: "6",
            description: "You prepare to move quickly out of the way of an attack or explosion. Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker. Additionally, you can move up to 15 feet in reaction to any other creature's action one time before the start of your next turn. You lose this benefit if you are dying or you cannot spend AP to move."
        },
        {
            action: "Equip a weapon",
            apCost: "3",
            description: "You take a weapon from your inventory and prepare to attack with it with any hands you have free. If you have a weapon in your hands already and have not stowed it, you drop it on the ground."
        },
        {
            action: "Escape a Grapple",
            apCost: "5",
            description: "If you are grappled, you make a contested Strength or Agility check against your grapplers Strength check to escape."
        },
        {
            action: "Grapple",
            apCost: "3",
            description: "You use your appendages to hold someone in place, you must contest a Strength check against their Strength or Agility."
        },
        {
            action: "Help",
            apCost: "6",
            description: "You can lend your aid to another creature in the completion of a task. When you use your AP to Help, the creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn. Alternatively, you can aid a friendly creature in attacking a creature within 5 feet of you. You feint, distract the target, or in some other way team up to make your ally’s attack more effective. If your ally attacks the target before your next turn, the first attack roll is made with advantage."
        },
        {
            action: "Hide",
            apCost: "6",
            description: "When you take the Hide action, you make a Sneak check with the DC equal to any nearby enemies passive sense scores. In order to hide you must be heavily obscured or within full cover. You are hidden from any enemies that have a lower passive sense compared to your sneak roll. If you succeed, you gain certain benefits, as described in the “Unseen Attackers and Targets” section. While hiding, you are acting unpredictably to confuse your enemy. Enemies still know your general location and can move to try and make line of sight again to notice you. If you are no longer within full cover of an enemy you are hidden from, you are no longer hidden."
        },
        {
            action: "Interact with an object",
            apCost: "3",
            description: "Interacting with an object falls under many categories of things you can do.\n● openorclose a door\n● pickupadropped shiv\n● takeabottle cap from a table\n● pushing a button\n● extinguish a small flame\n● donamask\n● pull the hood of your jacket up and over your head\n● putyour ear to a door\n● kickasmall stone\n● turnakey in a lock\n● hand an item to another character\nRead the above section about action points if you need references on how many action points an improvised action may cost."
        },
        {
            action: "Move 5 feet",
            apCost: "1",
            description: "You move 5 feet in any direction so long as your movement isn’t impeded or the area isn’t difficult terrain."
        },
        {
            action: "Ready",
            apCost: "+2",
            description: "You prepare an action with a trigger. You must specify what the trigger is and spend the necessary AP with an additional 2 AP. When the trigger occurs, you may perform the action. You cannot perform the action on a different trigger, nor do you regain the AP if the trigger never occurs."
        },
        {
            action: "Reload",
            apCost: "6",
            description: "You use the necessary ammunition to reload your weapon."
        },
        {
            action: "Search",
            apCost: "3",
            description: "You make an active perception check to look for someone or something hidden."
        },
        {
            action: "Shove",
            apCost: "4",
            description: "You knock a target prone or push it away from you. The target must be no more than one size larger than you and must be within your reach. Instead of making an attack roll, you make an Unarmed check contested by the target’s Unarmed check or Agility check (the target chooses the ability to use). If you win the contest, you either knock the target prone or push it 5 feet away from you."
        },
        {
            action: "Sprint",
            apCost: "5",
            description: "You can spend 5 action points on your turn to sprint. When you sprint, you move 50 feet in a line. If you stop or are obstructed before you move 50 feet, your movement ends and you do not regain any action points."
        },
        {
            action: "Stand up from Prone",
            apCost: "5",
            description: "You stand back up from being prone."
        },
        {
            action: "Stow a weapon",
            apCost: "3",
            description: "You take a weapon you are holding and put it into your inventory."
        },
        {
            action: "Take Cover",
            apCost: "3",
            description: "If you only have three quarters or half cover, you can spend 3 AP to squat, kneel, or duck into cover to gain full cover. If you attack while taking cover, you no longer have full cover."
        },
        {
            action: "Unarmed Strike",
            apCost: "3",
            description: "You punch, kick, jab, slap, or perform any kind of attack to another creature within 5 feet of you."
        },
        {
            action: "Use a Chem",
            apCost: "4",
            description: "When you take this action, you take the chem out of your inventory and use it. You don’t need to interact with the object or equip the chem in order to use it."
        },
    ];
    const [TM, setTM] = useState({ inst: new TurnManager(() => setTM({inst: TM.inst})) });
    const [showModal, setShowModal] = useState(false);
    const [actionInfo, setActionInfo] = useState({});
    const [activeKey, setActiveKey] = useState(TM.inst.currentTurn);

    useEffect(() => {
        if (!TM.inst.loaded) {
            console.log("Loading data from local storage.");
            TM.inst.load();
            setActiveKey(TM.inst.currentTurn);
        } else {
            console.log("Saving data to local storage.");
            TM.inst.save();
        }
    }, [TM]);

    //#region Functions
    function showActionInfo(action) {
        setActionInfo(action);
        setShowModal(true);
    }

    function nextTurn() {
        TM.inst.nextTurn();
        setActiveKey(TM.inst.currentTurn);
    }

    function rollbackTurn() {
        TM.inst.rollbackTurn();
        setActiveKey(TM.inst.currentTurn);
    }

    function updateMaxAP(event) {
        if (event.key !== "Enter") return;
        event.preventDefault();

        TM.inst.APmax = event.target.value;
    }
    //#endregion

    if (!TM.inst.loaded) return (
        <Container fluid className="d-flex justify-content-center">
            <Spinner />
        </Container>
    )
    else return (
        <div>
            <Container fluid className="d-lg-flex">
                <Container>
                    <h6>Actions In Combat</h6>
                    <p>Click on action to add to the queue.</p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>AP Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                actionsList.map((action, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Button variant="outline-primary" onClick={() => TM.inst.addActionToQueue(action)}>{action.action}</Button> <i onClick={() => showActionInfo(action)} title={action.description} className="bi bi-info-circle" /></td>
                                            <td>{action.apCost}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
                <Container>
                    <Container fluid>
                        <h6>Turn History</h6>
                        <p>Click on Action to remove.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Current AP</th>
                                    <th>Max AP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{TM.inst.currentAP}</td>
                                    <td><Form><FormControl disabled={TM.inst.currentTurn !== 0} defaultValue={TM.inst.APmax} type="number" step="1" onKeyDown={updateMaxAP} /></Form></td>
                                    <td><Button variant="warning" onClick={rollbackTurn}>Rollback Turn</Button></td>
                                    <td><Button variant="success" onClick={nextTurn}>Next Turn</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                    <Accordion activeKey={activeKey}>
                        {
                            TM.inst.turnQueue.map((turn, turnIndex) => {
                                return (
                                    <Accordion.Item key={turnIndex} eventKey={turnIndex}>
                                        <Accordion.Header onClick={() => {
                                            if (activeKey === turnIndex) setActiveKey(TM.inst.currentTurn);
                                            else setActiveKey(turnIndex);
                                        }}>
                                            Turn {turnIndex + 1}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                {
                                                    turn.map((action, actionIndex) => {
                                                        return (
                                                            <ListGroup.Item disabled={turnIndex !== TM.inst.currentTurn} key={actionIndex} action onClick={() => TM.inst.removeActionFromQueue(actionIndex)}>{action.action}</ListGroup.Item>
                                                        );
                                                    })
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                );
                            }).toReversed()
                        }
                    </Accordion>
                </Container>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionInfo.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{actionInfo.description}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}