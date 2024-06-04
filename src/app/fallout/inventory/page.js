"use client"
import { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardGroup, CardHeader, Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner, Table } from "react-bootstrap";
import { toTitleCase } from "../wiki/utils";
import { InventoryManager } from "./utils";

export default function FalloutInventory() {
    const [inventory, setInventory] = useState({ inst: new InventoryManager(() => setInventory({inst: inventory.inst})) });
    const [itemsData, setItemsData] = useState(undefined);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        function filterItems(items, filter) {
            filter = filter.toLowerCase();
            if (Array.isArray(items)) {
                return items.map(value => {
                    const filtered = filterItems(value, filter);
                    if (filtered) return filtered;
                }).filter(value => value !== undefined);
            } else if (typeof items == "object") {
                if (Object.values(items).every(item => typeof item == "string")) {
                    if (Object.values(items).some(item => item.toLowerCase().includes(filter))) return items;
                } else return Object.keys(items).reduce((obj, key) => {
                    if (key.toLowerCase().includes(filter)) {
                        return {
                            ...obj,
                            [key]:items[key]
                        };
                    } else {
                        const filtered = filterItems(items[key], filter);
                        if (!Array.isArray(filtered) && Object.keys(filtered).length) return {
                                ...obj,
                                [key]:filtered
                            };
                        else if (Array.isArray(filtered) && filtered.length) return {
                            ...obj,
                            [key]:filtered
                        };
                        else return obj;
                    }
                }, {});
            } else if (typeof items == "string") {
                if (items.toLowerCase().includes(filter)) return items;
            } else throw new Error("Unsupported type: ", typeof items);
        }

        fetch('/fallout/api/items')
            .then(res => res.json())
            .then(data => {
                if (filter) {
                    setItemsData(filterItems(data, filter));
                } else {
                    setItemsData(data);
                }
            });
    }, [filter]);

    useEffect(() => {
        if (!inventory.inst.loaded) {
            inventory.inst.load();
        } else {
            inventory.inst.save();
        }
    }, [inventory]);

    function applyFilterKeydown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            setFilter(event.target.value);
        }
    }

    function applyFilter(event) {
        event.preventDefault();
        setFilter(event.target[0].value);
    }

    function createItems(json, key) {
        const items = [];
        Object.values(json).forEach(item => {
            var itemName = Object.values(item)[0];
            var itemKey = `${key}-${itemName}`;
            items.push(
                <ListGroupItem action onClick={() => inventory.inst.addItem(itemName, itemKey, item)} title={Object.values(item).join(" ")} key={itemKey}>
                    {itemName}
                </ListGroupItem>
            );
        });
        return items;
    }

    if (!inventory.inst.loaded) return (
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
                        <CardHeader className="d-flex justify-content-between">
                            <h2>Items</h2>
                            <Form onSubmit={applyFilter} className="d-flex">
                                <Form.Control onKeyDown={applyFilterKeydown} type="text" placeholder="Search" />
                                <Button className="ms-4" type="submit">Search</Button>
                            </Form>
                        </CardHeader>
                        <CardBody>
                            <Accordion flush>
                                {
                                itemsData ?
                                    Object.keys(itemsData).map((type, index) => (
                                        <AccordionItem key={index} eventKey={type.toLowerCase()}>
                                            <AccordionHeader>{toTitleCase(type)}</AccordionHeader>
                                            <AccordionBody>
                                                <Accordion flush>
                                                    {Object.keys(itemsData[type]).map((file, index) => (
                                                        <AccordionItem eventKey={file.toLowerCase()} key={index}>
                                                            <AccordionHeader>{toTitleCase(file)}</AccordionHeader>
                                                            <AccordionBody>
                                                                <ListGroup>
                                                                    { createItems(itemsData[type][file], `${type}-${file}`) }
                                                                </ListGroup>
                                                            </AccordionBody>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </AccordionBody>
                                        </AccordionItem>
                                    )) :
                                    <Container fluid className="d-flex justify-content-center">
                                        <Spinner />
                                    </Container>
                                }
                                {
                                    itemsData ?
                                        <AccordionItem eventKey="junk">
                                            <ListGroup>
                                                <ListGroupItem action onClick={undefined}>Junk</ListGroupItem>
                                            </ListGroup>
                                        </AccordionItem> :
                                        null
                                }
                            </Accordion>
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
                                        <th>Carry Load</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>
                                            <Form>
                                                <Form.Control type="number" step={1} value={inventory.inst.caps} onChange={(event) => inventory.inst.caps = event.target.value} />
                                            </Form>
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
                        <CardHeader className="d-flex justify-content-between">
                            <h2>Inventory</h2>
                            <Row>
                                <span>Carry Load: {inventory.inst.carryLoad}</span>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Load</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inventory.inst.items.reduce((acc, item, index) => {
                                            if (item.extra || item.group) {
                                                return acc.concat(item.groupItems.map((groupItem, groupIndex) => {
                                                    const itemKey = `${item.name}_${groupIndex}`;
                                                    return (
                                                        <tr key={itemKey}>
                                                            <td>{groupItem.name}</td>
                                                            <td>{groupItem.qty}</td>
                                                            <td>
                                                                {
                                                                    item.extra ?
                                                                        groupItem.carryLoad :
                                                                        `${item.carryLoad} (${item.name})`
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
                                                            <td><Button variant="danger" onClick={() => inventory.inst.removeItem(itemKey)}><i className="bi bi-x" /></Button></td>
                                                        </tr>
                                                    );
                                                }));
                                            } else return acc.concat(
                                                <tr key={item.name}>
                                                    <td>{item.name}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.carryLoad}</td>
                                                    <td></td>
                                                    <td><Button variant="danger" onClick={() => inventory.inst.removeItem(item.name)}><i className="bi bi-x" /></Button></td>
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
        </div>
    );
};