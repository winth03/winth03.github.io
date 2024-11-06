import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';
import WikiPage from '@/components/fallout/WikiPage';
import Link from 'next/link';
import { getWikiPage } from '@/app/fallout/utils/wiki'

export default async function Page(props) {
    const params = await props.params;
    const slugPath = params.slug.join('/');
    const dirPath = path.join(process.cwd(), 'public', 'fallout', 'wiki', slugPath);

    let jsonData = null;
    let csvData = [];

    try {
        const files = await fs.readdir(dirPath);

        for (const file of files) {
            if (file.endsWith('.json')) {
                const jsonContent = await fs.readFile(path.join(dirPath, file), 'utf8');
                jsonData = JSON.parse(jsonContent);
            } else if (file.endsWith('.csv')) {
                const csvContent = await fs.readFile(path.join(dirPath, file), 'utf8');
                csvData.push({
                    name: file.replace('.csv', ''),
                    data: Papa.parse(csvContent).data
                });
            }
        }
    } catch (error) {
        console.error('Error reading directory:', error);
        notFound();
    }

    if (!jsonData && !csvData) {
        console.error('No data found for page:', slugPath);
        notFound();
    }

    return (
        <>
            <Link href="/fallout/wiki">Back to Index</Link>
            <WikiPage title={params.slug[params.slug.length - 1]} jsonData={jsonData} csvData={csvData} />
        </>
    );
}

export async function generateStaticParams() {
    const paths = await getWikiPage();
    return paths;
}