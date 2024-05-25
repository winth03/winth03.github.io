import fs from "fs";
import path from "path";

const WIKI_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki");

function createCategoryItem(pathToCreate: string) {
    var item: {
        [key: string]: string[],
    } = {};
    if (fs.statSync(pathToCreate).isDirectory()) {
        fs.readdirSync(pathToCreate).forEach(subitem => {
            var fullPath = path.join(pathToCreate, subitem);
            if (fs.statSync(fullPath).isDirectory()) {
                fs.readdirSync(fullPath).forEach(subsubitem => {
                    var subFullPath = path.join(fullPath, subsubitem);
                    var result: string[] = [];
                    if (fs.statSync(subFullPath).isDirectory()) {
                        fs.readdirSync(subFullPath).forEach(subsubsubitem => {
                            var subsubFullPath = path.join(subFullPath, subsubsubitem);
                            result.push(subsubFullPath);
                        });
                    }
                    item[subitem] = {
                        ...item[subitem],
                        [subsubitem]: result,
                    };
                });
            }
        });
    }
    return item;
}

export async function GET(request: Request) {
    const files = createCategoryItem(WIKI_DIRECTORY);
    return new Response(JSON.stringify(files), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}