import { PackageOpen } from 'lucide-react';
import ItemCard from './ItemCard';

const ItemGrid = ({ items = [], emptyMessage = 'No items found' }) => {
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <PackageOpen className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-[#757575] font-[Poppins] text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
