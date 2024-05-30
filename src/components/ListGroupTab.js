import base64url from "base64url";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardHeader, Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { toTitleCase } from "@/app/fallout/wiki/utils";

// Recursive function to create accordion items
function createSubCategoryItem(item, key) {
    const items = [];
    Object.keys(item).forEach((subitem, index) => {
        const itemKey = `${key}-dir-${index}`;
        const listItems = [];
        item[subitem].forEach((file, index) => {
            listItems.push(
                <ListGroupItem action href={`/fallout/wiki/${base64url.encode(file)}`} key={`${itemKey}-${index}`}>
                    {toTitleCase(file)}
                </ListGroupItem>
            );
        });
        items.push(
            <Col sm={6} key={itemKey}>
                <Accordion flush>
                    <AccordionItem eventKey={itemKey}>
                        <AccordionHeader className="border-top border-bottom">
                            <h5>{toTitleCase(subitem)}</h5>
                        </AccordionHeader>
                        <AccordionBody className="p-0">
                            <ListGroup variant="flush">
                                {listItems}
                            </ListGroup>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Col>
        );
    });
    return items;
}

export default function ListGroupTab({ categories }) {
    if (!categories) return (
        <Container fluid className="d-flex justify-content-center">
            <Spinner />
        </Container>
    );

    return (
        <TabContainer defaultActiveKey={`#${Object.keys(categories)[0]?.toLowerCase()}`}>            
            <h3>Categories</h3>                
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {
                            Object.keys(categories).map((key, index) => {
                                return (
                                    <ListGroupItem action href={`#${key.toLowerCase()}`} key={`cat-${index}`}>
                                        {toTitleCase(key)}
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <TabContent>
                        {
                            Object.keys(categories).map((key, index) => {
                                return (
                                    <TabPane eventKey={`#${key.toLowerCase()}`} key={`tab-${index}`}>
                                        <Card>
                                            <CardHeader className="bg-color-grey">
                                                <h4>{toTitleCase(key)}</h4>
                                            </CardHeader>
                                            <CardBody className="p-lg-4">
                                                <Row>
                                                    {
                                                        createSubCategoryItem(categories[key], `tab-${index}`)
                                                    }
                                                </Row>
                                            </CardBody>
                                        </Card>
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