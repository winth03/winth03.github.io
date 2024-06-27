import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';

const EXCLUDE_ITEMS = ['modifications.csv', 'property.csv'];

async function getItemsAndCosts() {
  const baseDir = path.join(process.cwd(), 'public', 'fallout', 'wiki', 'items_and_cost');
  const result = {};

  async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let category = {};

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subCategory = await processDirectory(fullPath);
        result[entry.name] = subCategory;
      } else if (entry.isFile() && entry.name.endsWith('.csv')) {
        if (EXCLUDE_ITEMS.includes(entry.name)) {
          continue;
        }
        const content = await fs.readFile(fullPath, 'utf8');
        const parsedCsv = Papa.parse(content, { header: true }).data;
        const itemName = path.parse(entry.name).name;
        category[itemName] = parsedCsv;
      }
    }

    return category;
  }

  await processDirectory(baseDir);
  return result;
}

export default getItemsAndCosts;