"use client"

import { Accordion, Button, Container, Form, FormControl, ListGroup, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import TurnManager from "@/app/fallout/utils/TurnManager";
import { ACTION_LIST } from "@/app/fallout/utils/actionsList";
import CalculatorInput from "@/components/CalculatorInput";

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

    function updateMaxAP(value) {
        TM.inst.APmax = Math.max(value, 0);
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
                                        setActionInfo({...action, action: "Attack with Weapon"});
                                    };
                                    else if (action.action === "Ready") onClick = () => {
                                        setReady(!ready);
                                    };
                                    else if (action.action === "Custom Action") onClick = () => {
                                        setShowModal(true);
                                        setActionInfo({ action: "Custom" });
                                    }
                                    return (
                                        <tr key={index}>
                                            <td><nobr><Button variant={action.action === "Ready" && ready ? "primary" : "outline-primary"} onClick={onClick}>{action.action}</Button>&nbsp;<i onClick={() => showActionInfo(action)} title={action.description} className="bi bi-info-circle" /></nobr></td>
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
                        <Table className="text-center">
                            <thead>
                                <tr>
                                    <th>Current AP</th>
                                    <th>Max AP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{TM.inst.turn.APleft}</td>
                                    {/* <td><FormControl value={TM.inst.turn.APmax} type="number" step="1" onChange={updateMaxAP} /></td> */}
                                    <td><CalculatorInput value={TM.inst.turn.APmax} onChange={updateMaxAP} integer /></td>
                                    <td><Button variant="warning" onClick={() => TM.inst.rollbackTurn()}>Rollback</Button></td>
                                    <td><Button variant="success" onClick={() => TM.inst.nextTurn()}>Next</Button></td>
                                    <td><Button variant="danger" onClick={() => TM.inst.reset()}>Reset</Button></td>
                                </tr>
                            </tbody>
                        </Table>
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
                                                            <ListGroup.Item disabled={turnIndex !== TM.inst.currentTurn} key={actionIndex} action onClick={() => TM.inst.removeActionFromQueue(actionIndex)}>{action.action} <span style={{color: '#666'}}>({action.apCost} AP)</span></ListGroup.Item>
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
            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setShowToast(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionInfo.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actionInfo.action === "Attack with Weapon" ? (
                        <div>
                            <p>Select a weapon to attack with:</p>
                            <ListGroup>
                                {weapons.map((weapon, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setToastWeapon(weapon);
                                            setToastPosition({ top: rect.bottom, left: rect.left });
                                            setShowToast(true);
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{weapon.name}</span>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    let attackAction = {
                                                        action: `Attack with ${weapon.name}`,
                                                        apCost: weapon.data.AP.split(' ')[0],
                                                        description: `${weapon.data.Damage} damage, ${weapon.data["Special Properties"]}`
                                                    };
                                                    if (ready) {
                                                        attackAction.apCost = (parseInt(attackAction.apCost) + 2).toString();
                                                        attackAction.action = "Ready: " + attackAction.action;
                                                        setReady(false);
                                                    }
                                                    TM.inst.addActionToQueue(attackAction);
                                                    setShowModal(false);
                                                    setShowToast(false);
                                                }}
                                            >
                                                Use ({weapon.data.AP})
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}                                
                            </ListGroup>
                        </div>
                    ) : actionInfo.action === "Custom" ? (
                        <Form onSubmit={(event) => {
                            event.preventDefault();
                            const form = event.target;
                            const action = form.action.value;
                            const apCost = form.apCost.value;
                            TM.inst.addActionToQueue({ action, apCost });
                            setShowModal(false);
                        }}>
                            <Form.Group className="mb-3" controlId="action">
                                <Form.Label>Action</Form.Label>
                                <Form.Control type="text" placeholder="Enter action" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="apCost">
                                <Form.Label>AP Cost</Form.Label>
                                <Form.Control type="number" min={0} placeholder="AP Cost" required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    ) :
                    (
                        <p>{actionInfo.description}</p>
                    )}
                </Modal.Body>
            </Modal>
            <ToastContainer position="top-start" style={{ zIndex: 9999 }}>
                <Toast
                    autohide
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