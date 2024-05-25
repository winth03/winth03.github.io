import CSVTable from "@/components/CSVTable";
import fs from "fs";
import { Button } from "react-bootstrap";

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

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
    const WIKI_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki");
    const files = getAllFiles(WIKI_DIRECTORY);

    return files.map((file) => {
            file: encodeURIComponent(btoa(file))
        }
    );
}

export default function FalloutWikiItem({ params: { file } }) {
    const filePath = atob(decodeURIComponent(file));
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