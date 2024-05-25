import fs from "fs";
import path from "path";

const WIKI_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki");

function createCategoryItem(pathToCreate: string, filter: string) {
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
                            if (filter && fs.statSync(subsubFullPath).isFile()) {
                                var data = fs.readFileSync(subsubFullPath, "utf8");
                                if (data.toLowerCase().includes(filter.toLowerCase()) || subsubsubitem.toLowerCase().includes(filter.toLowerCase())) {
                                    result.push(subsubFullPath);
                                }
                            } else {
                                result.push(subsubFullPath);
                            }
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
    // Get filter from query string
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter") ?? "";
    const files = createCategoryItem(WIKI_DIRECTORY, filter);
    return new Response(JSON.stringify(files), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}