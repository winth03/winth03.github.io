"use client"
import ListGroupTab from "@/components/ListGroupTab";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function FalloutWiki() {
    const [categories, setCategories] = useState(undefined);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("/fallout/wiki/api/categories?" + (filter ? new URLSearchParams({
                filter: filter
            }) : ""));
            const data = await response.json();
            setCategories(data);
        };
        fetchCategories();
    }, [filter]);

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

    return (
        <div>
            <Container fluid className="d-flex justify-content-between">
                <h1>Fallout Wiki</h1>
                <Form onSubmit={applyFilter} className="d-flex">
                    <Form.Control onKeyDown={applyFilterKeydown} type="text" placeholder="Search" />
                    <Button className="ms-4" type="submit">Search</Button>
                </Form>
            </Container>
            <ListGroupTab categories={categories} />
        </div>
    );
};