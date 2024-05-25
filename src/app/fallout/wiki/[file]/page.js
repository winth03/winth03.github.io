import CSVTable from "@/components/CSVTable";
import fs from "fs";
import path from "path";
import base64url from "base64url";
import { Button } from "react-bootstrap";
import { toTitleCase } from "@/app/fallout/wiki/utils";

const WIKI_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki");
function getAllFiles(directory) {
    const files = fs.readdirSync(directory);
    const result = [];
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            result.push(...getAllFiles(fullPath));
        } else {
            result.push(fullPath);
        }
    }
    return result;
}

export async function generateStaticParams() {
    const files = getAllFiles(WIKI_DIRECTORY);    
    const params = files.map(file => ({
        file: base64url.encode(file),
    }));

    return params;
}

export default function FalloutWikiItem({ params: { file } }) {

    const filePath = base64url.decode(file);
    const fileName = filePath.split("\\").pop().split("/").pop().replace("_", " ").split(".")[0];
    const csv = fs.readFileSync(filePath, "utf8");

    return (
        <div>
            <Button href="/fallout/wiki">Back</Button>
            <h1>{toTitleCase(fileName)}</h1>
            <CSVTable csv={csv} />
        </div>
    );
}