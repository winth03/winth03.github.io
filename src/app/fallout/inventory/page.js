import getItemsAndCosts from '@/app/fallout/utils/inventory';
import FaloutInventory from '@/components/fallout/InventoryPage';

export default async function InventoryPage() {
    const itemsAndCosts = await getItemsAndCosts();

    return (
        <FaloutInventory itemsData={itemsAndCosts} />
    );
}