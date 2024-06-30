import { IndexPage } from '@/components/fallout/IndexPage';
import { getAllPaths } from '@/app/fallout/utils/wiki';

export default async function WikiIndexPage() {
  const pages = await getAllPaths();
  return <IndexPage pages={pages} />;
}