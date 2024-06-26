// Add race data to file or local storage
"use client"
import { useState } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";

export default function CustomRacePage() {
    const [traits, setTraits] = useState([]);

    function addTrait(data) { // data: FormData
        const name = data.get("name");
        const desc = data.get("desc");
        setTraits([...traits, { name, desc }]);
    }

    return (
      <div className="container-fluid">
        <Card body>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
            </Form>
        </Card>
        <Card body>
            <Form id="trait" action={addTrait}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required name="name" type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="desc" as="textarea" placeholder="Enter description" />
                </Form.Group>
                <Button type="submit">Add Trait</Button>
            </Form>
        </Card>
        <Card>
            <Card.Header>
                <Card.Title>Traits</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {traits.map((trait, index) => (
                            <tr key={index}>
                                <td>{trait.name}</td>
                                <td>{trait.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
      </div>
    );
}