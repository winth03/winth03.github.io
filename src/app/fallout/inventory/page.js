"use client"
import { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardHeader, Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner, Table } from "react-bootstrap";
import { toTitleCase } from "../wiki/utils";

const PARSER = {
    ammunition: {
        group: true,
        carryLoad: (qty) => Math.floor(qty / 10)
    },
    heavy_ammunition: {
        group: false,
        carryLoad: (qty, data) => qty * parseInt(data["Individual Load"])
    }
}
class InventoryItem {
    constructor(item, qty, parserKey, data, root = true) {
        this.group = PARSER[parserKey].group && root;
        this.name = (this.group && root) ? toTitleCase(parserKey) : item;
        this.parserKey = parserKey;
        this.groupItems = [];
        
        if (this.group) {
            this.addGroupItem(item, data, qty);
        } else {
            this.qty = qty;
            this.data = data;
        }
    }

    get carryLoad() {
        return PARSER[this.parserKey].carryLoad(this.qty, this.data);
    }

    set qty(qty) {
        if (this.group) return;
        else this._qty = qty;
    }
    get qty() {
        if (this.group) return this.groupItems.reduce((acc, item) => acc + item.qty, 0);
        return this._qty;
    }

    addGroupItem(item, data, qty = 1) {
        const itemIndex = this.groupItems.findIndex(i => i.name === item);
        if (itemIndex === -1) {
            this.groupItems.push(new InventoryItem(item, qty, this.parserKey, data,false));
        } else {
            this.groupItems[itemIndex].qty++;
        }        
    }
}

class InventoryManager {
    constructor(callback) {
        this.items = [];
        this.loaded = false;
        this.callback = callback;
    }

    get carryLoad() {
        return this.items.reduce((acc, item) => acc + item.carryLoad, 0);
    }

    addItem(item, key, data, qty = 1, save = true) {
        const keyList = key.split("-").map(e => e.split(".")[0].replace(" ", "_").toLowerCase()).reverse();
        const parserKey = keyList.find(e => Object.keys(PARSER).includes(e));
        const itemIndex = Math.max(this.items.findIndex(i => i.name === item), this.items.findIndex(i => i.name === toTitleCase(parserKey)));
        if (itemIndex === -1) {
            // get first key that is in PARSER
            this.items.push(new InventoryItem(item, qty, parserKey, data));
        } else {            
            if (this.items[itemIndex].group) {
                this.items[itemIndex].addGroupItem(item, data);
            } else this.items[itemIndex].qty += qty;
        }
        if (this.callback && save) this.callback();
    }

    removeItem(itemKey) {
        var [item, groupIndex] = itemKey.split("-");
        groupIndex = parseInt(groupIndex);
        if (groupIndex !== undefined) {
            this.items.find(i => i.name === item).groupItems.splice(groupIndex, 1);
        }
        else this.items = this.items.filter(i => i.name !== item);
        if (this.callback) this.callback();
    }

    save() {
        localStorage.setItem('inventory', JSON.stringify(this.items));
        console.log("Saved inventory");
    }

    load() {
        const items = JSON.parse(localStorage.getItem('inventory'));
        if (items) {
            items.forEach(item => {
                const isGroup = PARSER[item.parserKey].group;
                if (isGroup) {
                    item.groupItems.forEach(groupItem => {
                        this.addItem(groupItem.name, groupItem.parserKey, groupItem.data, groupItem._qty, false);
                    });
                } else {
                    this.addItem(item.name, item.parserKey, item.data, item._qty, false);
                }
            });
        }
        this.loaded = true;
        console.log("Loaded inventory", items);
        if (this.callback) this.callback();
    }
}

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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inventory.inst.items.reduce((acc, item, index) => {
                                            if (item.group) {
                                                return acc.concat(item.groupItems.map((groupItem, groupIndex) => {
                                                    const itemKey = `${item.name}-${groupIndex}`;
                                                    return (
                                                        <tr key={itemKey}>
                                                            <td>{groupItem.name}</td>
                                                            <td>{groupItem.qty}</td>
                                                            <td>{item.carryLoad} ({item.name})</td>
                                                            <td><Button variant="danger" onClick={() => inventory.inst.removeItem(itemKey)}><i class="bi bi-x" /></Button></td>
                                                        </tr>
                                                    );
                                                }));
                                            } else return acc.concat(
                                                <tr key={item.name}>
                                                    <td>{item.name}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.carryLoad}</td>
                                                    <td><Button variant="danger" onClick={() => inventory.inst.removeItem(item.name)}><i class="bi bi-x" /></Button></td>
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