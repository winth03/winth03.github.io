import fs from "fs";
import path from "path";
import csvtojson from "csvtojson";

const ITEMS_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki", "items_and_cost");
const EXCLUDED_FILES = ["modifications.csv", "property.csv"];

async function createCategoryItem(pathToCreate: string) {
    var item: {
        [key: string]: any[],
    } = {};
    if (fs.statSync(pathToCreate).isDirectory()) {
        var folder = fs.readdirSync(pathToCreate);
        for await (const subitem of folder) {
            var fullPath = path.join(pathToCreate, subitem);
            if (fs.statSync(fullPath).isDirectory()) {
                var folder = fs.readdirSync(fullPath);
                for await (const file of folder) {
                    var filePath = path.join(fullPath, file);
                    if (fs.statSync(filePath).isFile() && file.endsWith(".csv") && !EXCLUDED_FILES.includes(file)) {
                        var fileData = fs.readFileSync(filePath, "utf8");
                        item[subitem] = {
                            ...item[subitem],
                            [file]: (await csvtojson().fromString(fileData)),
                        };                        
                    }
                };
            }
        };
    }
    return item;
}

export async function GET(request: Request) {
    const files = await createCategoryItem(ITEMS_DIRECTORY);
    return new Response(JSON.stringify(files), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}