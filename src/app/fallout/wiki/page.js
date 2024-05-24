import { Col, Container, ListGroup, ListGroupItem, Row, TabContainer, TabContent, TabPane } from "react-bootstrap";
import fs from "fs";
import path from "path";
import ListGroupTab from "@/components/ListGroupTab";

const WIKI_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki");
const CATEGORIES = createCategoryItem(WIKI_DIRECTORY);

function createCategoryItem(pathToCreate) {
    var item = undefined;
    if (fs.statSync(pathToCreate).isDirectory()) {
        const name = path.basename(pathToCreate);
        item = {
            name: name,
            dir: [],
            file: []
        };
        fs.readdirSync(pathToCreate).forEach(subitem => {
            var fullPath = path.join(pathToCreate, subitem);
            if (fs.statSync(fullPath).isDirectory()) {
                item.dir.push(createCategoryItem(fullPath));
            } else {
                item.file.push(fullPath);
            }
        });
    }
    return item;
}

export default function FalloutWiki() {
    return (
        <div>
            <h1>Fallout Wiki</h1>            
            <ListGroupTab categories={CATEGORIES} />
        </div>
    );
};