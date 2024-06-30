"use client"
import { useEffect, useState } from "react";
import { Accordion, Button, Card, CardBody, CardHeader, Col, Container, Form, ListGroup, ListGroupItem, Modal, Row, Spinner, Table } from "react-bootstrap";
import { toTitleCase } from "@/app/fallout/utils/utils";
import InventoryManager from "@/app/fallout/utils/InventoryManager";
import ItemsAndCostsComponent from "@/components/fallout/ItemsAndCosts";
import CalculatorInput from "@/components/CalculatorInput";

export default function FalloutInventory({ itemsData }) {
    const [inventory, setInventory] = useState({ inst: new InventoryManager(() => setInventory({ inst: inventory.inst })) });
    const [showModal, setShowModal] = useState(false);
    const [modalExtra, setModalExtra] = useState([false, false]); // [group, extra]
    const [customItems, setCustomItems] = useState(undefined);
    const [disableCustomLoad, setDisableCustomLoad] = useState(false);

    useEffect(() => {
        if (!inventory.inst.loaded) {
            inventory.inst.load();
        } else {
            inventory.inst.save();
        }
    }, [inventory]);

    function addCustomItem(event) {
        event.preventDefault();

        const name = event.target.customItemName.value;
        if (name.toLowerCase() === "custom") return alert("You cannot name an item 'Custom'.");

        const qty = parseInt(event.target.customItemQty.value);
        const load = parseInt(event.target.customItemLoad.value);
        const group = modalExtra[0];
        const groupName = group ? event.target.customItemExtraLabel.value.toLowerCase() : "CUSTOM";
        const data = {
            name,
            load,
            group,
            groupName,
            groupQPL: group ? parseInt(event.target.customItemExtraValue.value) : undefined,
            extra: modalExtra[1] ? {
                label: event.target.customItemExtraLabel.value.toLowerCase(),
                values: [parseInt(event.target.customItemExtraValue.value), load],
                value: false
            } : undefined,
        };

        inventory.inst.addItem(name, "custom", data, qty);
        setCustomItems([...customItems, data]);
    }

    function removeCustomItem(item) {
        setCustomItems(customItems.filter((i) => i.name !== item.name));
    }

    useEffect(() => {
        if (!customItems) {
            setCustomItems(JSON.parse(localStorage.getItem("customItems")) ?? []);
        } else {
            localStorage.setItem("customItems", JSON.stringify(customItems));
        }
    }, [customItems]);

    function handleQuantityChange(item, itemKey, amount) {
        const newQty = item.qty + amount;
        inventory.inst.updateItemQuantity(itemKey, newQty);
    }

    if (!inventory.inst.loaded || !itemsData || !customItems) return (
        <Container fluid className="d-flex justify-content-center">
            <Spinner />
        </Container>
    )
    else return (
        <div>
            <h1>Fallout Inventory</h1>
            <Row>
                <Col sm={4}>
                    <Card>
                        <CardHeader>
                            <h2>Items</h2>
                        </CardHeader>
                        <CardBody>
                            <ItemsAndCostsComponent
                                itemsAndCosts={itemsData}
                                customItems={customItems}
                                onItemSelect={(item, category, subCategory) => {
                                    const itemName = Object.values(item)[0];
                                    const itemKey = `${itemName}-${subCategory}-${category}`;
                                    inventory.inst.addItem(itemName, itemKey, item);
                                }}
                                onCustomItemSelect={() => setShowModal(true)}
                                onCustomItemDelete={removeCustomItem}
                            />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={8}>
                    <Container fluid className="py-2">
                        <Row className="justify-content-end">
                            <Table className="w-50 text-nowrap m-0" striped bordered>
                                <thead>
                                    <tr>
                                        <th>Caps</th>
                                        <th>Item Load</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>
                                            <nobr>
                                                <CalculatorInput className="fs-3" value={inventory.inst.caps} onChange={(value) => inventory.inst.caps = value} integer />
                                            </nobr>
                                        </td>
                                        <td>
                                            <span className="fs-3">{inventory.inst.carryLoad}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                    <Card>
                        <CardHeader>
                            <h2>Inventory</h2>
                        </CardHeader>
                        <CardBody className="overflow-auto">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Load</th>
                                        <th>Actions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inventory.inst.items.reduce((acc, item, index) => {
                                            if (item.extra || item.group) {
                                                return acc.concat(item.groupItems.map((groupItem, groupIndex) => {
                                                    const itemKey = `${item.name}/${groupIndex}`;
                                                    return (
                                                        <tr key={itemKey}>
                                                            <td><span onClick={() => {
                                                                // Open item info modal by finding element with item name
                                                                const itemElement = document.querySelector(`[id="${groupItem.name}"]`);

                                                                if (itemElement) {
                                                                    itemElement.click();
                                                                }
                                                            }}
                                                                style={{
                                                                    borderBottom: "1px dotted",
                                                                    cursor: "pointer",
                                                                }}
                                                            >{toTitleCase(groupItem.name)}</span></td>
                                                            <td>
                                                                <nobr>
                                                                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(groupItem, itemKey, -1)}>-</Button>&nbsp;
                                                                    <CalculatorInput value={groupItem.qty} onChange={(value) => inventory.inst.updateItemQuantity(itemKey, value)} integer />&nbsp;
                                                                    <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(groupItem, itemKey, 1)}>+</Button>
                                                                </nobr>
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.extra ?
                                                                        groupItem.carryLoad :
                                                                        `${item.carryLoad} (${toTitleCase(item.name)})`
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    groupItem.extra ?
                                                                        (
                                                                            <Form.Check
                                                                                type="checkbox"
                                                                                label={toTitleCase(groupItem.extra.label)}
                                                                                checked={groupItem.extra.value ?? false}
                                                                                onChange={(event) => {
                                                                                    inventory.inst.setExtra(item, groupItem, event.target.checked);
                                                                                }}
                                                                            />
                                                                        ) :
                                                                        null
                                                                }
                                                            </td>
                                                            <td><Button variant="danger" size="sm" onClick={() => inventory.inst.removeItem(itemKey)}><i className="bi bi-x" /></Button></td>
                                                        </tr>
                                                    );
                                                }));
                                            } else return acc.concat(
                                                <tr key={item.name}>
                                                    <td><span onClick={() => {
                                                        // Open item info modal by finding element with item name
                                                        const itemElement = document.querySelector(`[id="${item.name}"]`);

                                                        if (itemElement) {
                                                            itemElement.click();
                                                        }
                                                    }}
                                                        style={{
                                                            borderBottom: "1px dotted",
                                                            cursor: "pointer",
                                                        }}
                                                    >{toTitleCase(item.name)}
                                                    </span></td>
                                                    <td>
                                                        <nobr>
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item, item.name, -1)}>-</Button>&nbsp;
                                                            <CalculatorInput value={item.qty} onChange={(value) => inventory.inst.updateItemQuantity(item.name, value)} integer />&nbsp;
                                                            <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item, item.name, 1)}>+</Button>
                                                        </nobr>
                                                    </td>
                                                    <td>{item.carryLoad}</td>
                                                    <td></td>
                                                    <td><Button variant="danger" size="sm" onClick={() => inventory.inst.removeItem(item.name)}><i className="bi bi-x" /></Button></td>
                                                </tr>
                                            );
                                        }, [])
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setModalExtra([false, false]);
                setDisableCustomLoad(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Custom Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addCustomItem}>
                        <Form.Group className="mb-3" controlId="customItemName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customItemQty">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control required defaultValue={1} min={1} type="number" step={1} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customItemLoad">
                            <Form.Label>Load</Form.Label>
                            <Form.Control disabled={modalExtra[0] && disableCustomLoad} required defaultValue={0} min={0} type="number" step={1} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customItemExtra">
                            <Form.Check inline label="Group" checked={modalExtra[0]} onChange={(event) => setModalExtra([event.target.checked, false])} />
                            <Form.Check inline label="Extra" checked={modalExtra[1]} onChange={(event) => setModalExtra([false, event.target.checked])} />
                        </Form.Group>
                        {
                            inventory.inst.items.some((item) => item.group) && modalExtra[0] ?
                                <Form.Group className="mb-3" controlId="customItemExtraLabel">
                                    <Form.Label>Group</Form.Label>
                                    <Form.Control list="custom_groups" autoComplete="off" onInput={(event) => {
                                        const group = inventory.inst.items.find((item) => item.name === event.target.value);
                                        setDisableCustomLoad(group);
                                    }} />
                                    <datalist id="custom_groups">
                                        {
                                            inventory.inst.items.filter((item) => item.group).map((item, index) => {
                                                if (item.name === "CUSTOM") return null;
                                                return (<option key={index} value={item.name}>{item.name}</option>);
                                            })
                                        }
                                    </datalist>
                                </Form.Group> : modalExtra[0] || modalExtra[1] ?
                                    <Form.Group className="mb-3" controlId="customItemExtraLabel">
                                        <Form.Label>Extra Label</Form.Label>
                                        <Form.Control required type="text" />
                                    </Form.Group> :
                                    null
                        }
                        {
                            modalExtra.some((e) => e) ?
                                <Form.Group className="mb-3" controlId="customItemExtraValue">
                                    <Form.Label>{modalExtra[0] ? "Group Quantity per Load" : "Extra Load"}</Form.Label>
                                    <Form.Control disabled={modalExtra[0] && disableCustomLoad} required defaultValue={0} min={0} type="number" step={1} />
                                </Form.Group> :
                                null
                        }
                        <Button variant="primary" type="submit">Add</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};