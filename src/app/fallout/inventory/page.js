"use client"
import { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardHeader, Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner, Table } from "react-bootstrap";
import { toTitleCase } from "../wiki/utils";

const PARSER = {
    ammunition: {
        load: (qty) => Math.floor(qty / 10)
    }
}
class InventoryItem {
    constructor(item, qty, parser) {
        this.name = item;
        this.qty = qty;
        this.parser = PARSER[parser];
    }

    get load() {
        return this.parser ? this.parser.load(this.qty) : 0;
    }
}

class InventoryManager {
    constructor() {
        this.items = [];
        this.loaded = false;
    }

    get carryLoad() {
        return this.items.reduce((acc, item) => acc + item.load, 0);
    }

    addItem(item, key) {
        const itemIndex = this.items.findIndex(i => i.name === item);
        if (itemIndex === -1) {
            const keyList = key.split("-").map(e => e.split(".")[0].replace(" ", "_").toLowerCase());
            // get first key that is in PARSER
            const parserKey = keyList.find(e => PARSER[e]);
            this.items.push(new InventoryItem(item, 1, parserKey));
        } else {
            this.items[itemIndex].qty++;
        }
        console.log(this.items);
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    save() {
        // localStorage.setItem('inventory', JSON.stringify(this.items));
    }

    load() {
        // this.items = JSON.parse(localStorage.getItem('inventory')) || [];
        // this.loaded = true;
    }
}

export default function FalloutInventory() {
    const [inventory, setInventory] = useState({ inst: new InventoryManager() });
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
            setInventory(inventory);
        } else {
            inventory.inst.save();
        }
    }, [inventory]);

    function addItem(item, key) {
        inventory.inst.addItem(item, key);
        setInventory({inst: inventory.inst});
    }

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
                <ListGroupItem action onClick={() => addItem(itemName, itemKey)} title={Object.values(item).join(" ")} key={itemKey}>
                    {itemName}
                </ListGroupItem>
            );
        });
        return items;
    }

    return (
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
                                {itemsData ?
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
                                    </Container>}
                            </Accordion>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={8}>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory.inst.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.load}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};