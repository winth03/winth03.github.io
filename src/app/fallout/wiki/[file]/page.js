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