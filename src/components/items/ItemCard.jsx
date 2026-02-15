import { Link } from 'react-router-dom';
import { MapPin, Leaf } from 'lucide-react';
import Badge from '../common/Badge';
import { categories } from '../../utils/categories';
import { formatRelativeTime } from '../../utils/formatters';

const conditionVariant = {
  'Like New': 'success',
  'Good': 'primary',
  'Fair': 'warning',
  'Used': 'accent',
};

const ItemCard = ({ item }) => {
  const {
    id,
    title,
    description,
    category,
    condition,
    images,
    location,
    listingType,
    co2Savings,
    datePosted,
  } = item;

  const categoryData = categories.find((c) => c.id === category);
  const emoji = categoryData?.emoji || '📦';
  const imageUrl = images?.[0] || '/placeholder.jpg';
  const isDonate = listingType === 'donate';

  return (
    <Link
      to={`/items/${id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category emoji badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm shadow-sm">
          {emoji}
        </span>
        {/* Time posted */}
        {datePosted && (
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white rounded-lg px-2.5 py-1 text-[10px] font-medium font-[Poppins]">
            {formatRelativeTime(datePosted)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-[#212121] font-semibold font-[Poppins] text-sm mb-1 truncate">
          {title}
        </h3>
        <p className="text-[#757575] text-xs font-[Poppins] leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {condition && (
            <Badge
              text={condition}
              variant={conditionVariant[condition] || 'accent'}
              size="sm"
            />
          )}
          {listingType && (
            <Badge
              text={isDonate ? 'Donate' : 'Lend'}
              variant={isDonate ? 'success' : 'secondary'}
              size="sm"
            />
          )}
          {co2Savings > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#4CAF50] font-[Poppins]">
              <Leaf className="w-3 h-3" />
              {co2Savings}kg CO₂
            </span>
          )}
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1 text-[#757575]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] font-[Poppins] truncate">
              {typeof location === 'string' ? location : location.area || location.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ItemCard;
