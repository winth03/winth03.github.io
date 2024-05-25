"use client"
import base64url from "base64url";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, ListGroup, ListGroupItem, Row, TabContainer, TabContent, TabPane } from "react-bootstrap";

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

// Recursive function to create accordion items
function createAccordionItem(item, key) {
    var items = [];
    item.dir.forEach((subitem, index) => {
        const itemKey = `${key}-dir-${index}`;
        items.push(
            <AccordionItem eventKey={itemKey} key={itemKey}>
                <AccordionHeader>
                    {toTitleCase(subitem.name)}
                </AccordionHeader>
                <AccordionBody>
                    <Accordion>
                        {
                            createAccordionItem(subitem, itemKey)
                        }
                    </Accordion>
                </AccordionBody>
            </AccordionItem>
        );
    });
    var fileListGroup = []
    item.file.forEach((file, index) => {
        const itemKey = `${key}-file-${index}`;
        const name = file.split("\\").pop().split("/").pop().replace("_", " ").split(".")[0];

        fileListGroup.push(
            <ListGroupItem action href={`/fallout/wiki/${base64url.encode(file)}`} key={itemKey} className="p-3">
                {toTitleCase(name)}
            </ListGroupItem>
        );
    });
    if (fileListGroup.length > 0) items.push(
        <ListGroup key={`${key}-lg`}>
            {fileListGroup}
        </ListGroup>
    );
    return items;
}

export default function ListGroupTab({ categories }) {
    return (
        <TabContainer>
            <h3>Categories</h3>
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {
                            categories["dir"].map((item, index) => {
                                return (
                                    <ListGroupItem action href={`#${item.name.toLowerCase()}`} key={`cat-${index}`}>
                                        {toTitleCase(item.name)}
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <TabContent>
                        {
                            categories["dir"].map((item, index) => {
                                return (
                                    <TabPane eventKey={`#${item.name.toLowerCase()}`} key={`tab-${index}`}>
                                        <Container>
                                            <h4>{toTitleCase(item.name)}</h4>
                                            <Accordion>
                                                {
                                                    createAccordionItem(item, `tab-${index}`)
                                                }
                                            </Accordion>
                                        </Container>
                                    </TabPane>
                                );
                            })
                        }
                    </TabContent>
                </Col>
            </Row>
        </TabContainer>
    );
};