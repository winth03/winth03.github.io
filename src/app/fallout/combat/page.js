"use client"

import { Accordion, Button, Container, Form, FormControl, ListGroup, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import TurnManager from "@/app/fallout/utils/TurnManager";
import { ACTION_LIST } from "@/app/fallout/utils/actionsList";

export default function FalloutCombat() {
    const [TM, setTM] = useState({ inst: new TurnManager(() => setTM({ inst: TM.inst })) });
    const [showModal, setShowModal] = useState(false);
    const [actionInfo, setActionInfo] = useState({});
    const [activeKey, setActiveKey] = useState(TM.inst.currentTurn);
    const [ready, setReady] = useState(false);
    const [weapons, setWeapons] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastWeapon, setToastWeapon] = useState(null);
    const [toastPosition, setToastPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const allItems = JSON.parse(localStorage.getItem("InventoryManager"))?.items;
        if (!allItems) return;

        const weaponItems = allItems.filter(item =>
            item.parserKey === "ranged_weapons" || item.parserKey === "melee_weapons"
        );
        setWeapons(weaponItems);
    }, []);

    useEffect(() => {
        if (!TM.inst.loaded) {
            console.log("Loading data from local storage.");
            TM.inst.load();
        } else {
            console.log("Saving data to local storage.");
            TM.inst.save();
        }
        setActiveKey(TM.inst.currentTurn);
    }, [TM]);

    //#region Functions
    function showActionInfo(action) {
        setActionInfo(action);
        setShowModal(true);
    }

    function updateMaxAP(event) {
        event.preventDefault();

        if (event.target.value == "") TM.inst.APmax = 0;
        else TM.inst.APmax = event.target.value;
    }
    //#endregion

    if (!TM.inst.loaded) return (
        <Container fluid className="d-flex justify-content-center">
            <Spinner />
        </Container>
    )
    else return (
        <>
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
                                ACTION_LIST.map((action, index) => {
                                    let onClick = () => {
                                        if (ready) {
                                            action.apCost = (parseInt(action.apCost) + 2).toString();
                                            action.action = "Ready: " + action.action;
                                            setReady(false);
                                        }
                                        TM.inst.addActionToQueue(action);
                                    };
                                    if (action.action === "Attack") onClick = () => {
                                        setShowModal(true);
                                        setActionInfo(action);
                                    };
                                    else if (action.action === "Ready") onClick = () => {
                                        setReady(!ready);
                                    };
                                    return (
                                        <tr key={index}>
                                            <td><Button variant={action.action === "Ready" && ready ? "primary" : "outline-primary"} onClick={onClick}>{action.action}</Button> <i onClick={() => showActionInfo(action)} title={action.description} className="bi bi-info-circle" /></td>
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
                                    <td>{TM.inst.turn.APleft}</td>
                                    <td><FormControl value={TM.inst.turn.APmax} type="number" step="1" onChange={updateMaxAP} /></td>
                                    <td><Button variant="warning" onClick={() => TM.inst.rollbackTurn()}>Rollback</Button></td>
                                    <td><Button variant="success" onClick={() => TM.inst.nextTurn()}>Next</Button></td>
                                    <td><Button variant="danger" onClick={() => TM.inst.reset()}>Reset</Button></td>
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
                                                    turn.actions.map((action, actionIndex) => {
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
                    {actionInfo.action === "Attack" ? (
                        <div>
                            <p>Select a weapon to attack with:</p>
                            <ListGroup>
                                {weapons.map((weapon, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        onMouseEnter={(e) => {
                                            setToastWeapon(weapon);
                                            setToastPosition({ top: e.clientY, left: e.clientX });
                                            setShowToast(true);
                                        }}
                                        onMouseLeave={() => setShowToast(false)}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{weapon.name}</span>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    const attackAction = {
                                                        action: `Attack with ${weapon.name}`,
                                                        apCost: weapon.data.AP.split(' ')[0],
                                                        description: `${weapon.data.Damage} damage, ${weapon.data["Special Properties"]}`
                                                    };
                                                    TM.inst.addActionToQueue(attackAction);
                                                    setShowModal(false);
                                                }}
                                            >
                                                Use ({weapon.data.AP})
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    ) : (
                        <p>{actionInfo.description}</p>
                    )}
                </Modal.Body>
            </Modal>
            <ToastContainer position="top-start" style={{ zIndex: 9999 }}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    style={{
                        position: 'fixed',
                        top: `${toastPosition.top}px`,
                        left: `${toastPosition.left}px`,
                    }}
                >
                    <Toast.Header>
                        <strong className="me-auto">{toastWeapon?.name}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                {toastWeapon && Object.entries(toastWeapon.data).map(([key, value]) => (
                                    <tr key={key}>
                                        <td><strong>{key}</strong></td>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}