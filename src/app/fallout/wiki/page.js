"use client"
import ListGroupTab from "@/components/ListGroupTab";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function FalloutWiki() {
    const [categories, setCategories] = useState(undefined);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch("/fallout/api/categories")
            .then(res => res.json())
            .then(data => {
                if (filter) {
                    setCategories(filterCategories(data, filter));
                } else {
                    setCategories(data);
                }
            });
    }, [filter]);

    function filterCategories(categories, filter) {
        const filteredCategories = {};
        Object.keys(categories).forEach((category) => {
            const filteredItems = {};
            Object.keys(categories[category]).forEach((subCategory) => {
                const filteredSubCategory = categories[category][subCategory].filter((item) => item.toLowerCase().includes(filter.toLowerCase()));
                if (filteredSubCategory.length > 0) {
                    filteredItems[subCategory] = filteredSubCategory;
                }
            });
            if (Object.keys(filteredItems).length > 0) {
                filteredCategories[category] = filteredItems;
            }
        });
        return filteredCategories;
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

    return (
        <div>
            <Container fluid className="d-flex justify-content-between">
                <h1>Fallout Wiki</h1>
                {/* <Form onSubmit={applyFilter} className="d-flex">
                    <Form.Control onKeyDown={applyFilterKeydown} type="text" placeholder="Search" />
                    <Button className="ms-4" type="submit">Search</Button>
                </Form> */}
                <Script async src="https://cse.google.com/cse.js?cx=f42735e5b80154d35">
                </Script>
                <div className="gcse-search"></div>
            </Container>
            <ListGroupTab categories={categories} />
        </div>
    );
};