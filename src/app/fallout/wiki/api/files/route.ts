import fs from 'fs';
import path from 'path';
import base64url from 'base64url';

const WIKI_DIRECTORY = path.join(process.cwd(), "public", "fallout", "wiki");

function getAllFiles(directory: string) {
    const files = fs.readdirSync(directory);
    const result: string[] = [];
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

export async function GET(request: Request) {
    const files = getAllFiles(WIKI_DIRECTORY).map((file) => base64url.encode(file));
    return new Response(JSON.stringify(files), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}