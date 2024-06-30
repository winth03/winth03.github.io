import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';

export async function getAllPaths(dir = 'public/fallout/wiki', paths = []) {
    const entries = await fs.readdir(path.join(process.cwd(), dir), { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            await getAllPaths(path.join(dir, entry.name), paths);
        } else if (entry.name.endsWith('.json')) {
            if (!paths.some(p => `public${path.sep}fallout${path.sep}wiki${path.sep}` + p.path === dir)) {
                const content = await fs.readFile(path.join(process.cwd(), dir, entry.name), 'utf8');
                const re = new RegExp(`\\${path.sep}`, 'g');
                paths.push({
                    name: path.basename(dir),
                    path: dir.replace(re, '/').replace("public/fallout/wiki/", ''),
                    content: JSON.parse(content)
                });
            }
        } else if (entry.name.endsWith('.csv')) {
            const basename = path.basename(dir);
            const content = Papa.parse(await fs.readFile(path.join(process.cwd(), dir, entry.name), 'utf8')).data;
            const item = paths.find(p => p.name === basename)
            if (!item) {                
                const re = new RegExp(`\\${path.sep}`, 'g');
                paths.push({
                    name: basename,
                    path: dir.replace(re, '/').replace("public/fallout/wiki/", ''),
                    content: [content]
                });
            } else {
                item.content.push(content);
            }
        }
    }

    return paths;
}

export async function getWikiPage() {
    let paths = await getAllPaths();
    paths = paths.map(p => ({ slug: p.path.split('/') }));
    return paths;
}