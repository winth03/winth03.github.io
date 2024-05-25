import CSVTable from "@/components/CSVTable";
import fs from "fs";
import base64url from "base64url";
import { Button } from "react-bootstrap";
import { toTitleCase } from "@/app/fallout/wiki/utils";

export async function generateStaticParams() {    
    const files = await fetch(process.env.URL + "/fallout/wiki/api/files")
        .then(res => res.json());
    
    const params = files.map(file => ({
        file: file,
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