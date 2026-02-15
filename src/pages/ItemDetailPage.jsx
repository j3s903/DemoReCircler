import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Leaf,
  User,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  Search,
} from 'lucide-react';
import { mockItems } from '../data/mockItems';
import { mockUsers } from '../data/mockUsers';
import { categories } from '../utils/categories';
import { formatDate } from '../utils/formatters';
import ItemCard from '../components/items/ItemCard';
import Badge from '../components/common/Badge';
import StarRating from '../components/common/StarRating';

const conditionVariant = {
  'Like New': 'success',
  'Good': 'primary',
  'Fair': 'warning',
  'Used': 'accent',
};

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const item = mockItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#FAFFFE] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-5">
          <Search className="w-9 h-9 text-[#4CAF50]" />
        </div>
        <h2 className="text-xl font-bold text-[#212121] font-[Poppins] mb-2">
          Item not found
        </h2>
        <p className="text-[#757575] font-[Poppins] text-sm text-center max-w-sm mb-5">
          The item you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4CAF50] text-white font-[Poppins] text-sm font-medium hover:bg-[#2E7D32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>
      </div>
    );
  }

  const owner = mockUsers.find((u) => u.id === item.ownerId);
  const categoryData = categories.find((c) => c.name === item.category);
  const emoji = categoryData?.emoji || '📦';
  const isDonate = item.listingType === 'donate';

  const similarItems = mockItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  const handleInterested = () => {
    navigate('/messages');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFFFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-[Poppins] mb-6">
          <Link
            to="/"
            className="text-[#757575] hover:text-[#4CAF50] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#757575]">/</span>
          <Link
            to="/browse"
            className="text-[#757575] hover:text-[#4CAF50] transition-colors"
          >
            Browse
          </Link>
          <span className="text-[#757575]">/</span>
          <span className="text-[#212121] font-medium truncate max-w-[200px]">
            {item.title}
          </span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#757575] hover:text-[#4CAF50] font-[Poppins] text-sm font-medium transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={item.images?.[selectedImage] || '/placeholder.jpg'}
                alt={`${item.title} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Action buttons overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-[#757575] hover:text-[#4CAF50] transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center transition-colors ${
                    isFavorited
                      ? 'text-[#EF5350]'
                      : 'text-[#757575] hover:text-[#EF5350]'
                  }`}
                  aria-label="Favourite"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-2">
                {item.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#4CAF50] ring-2 ring-[#4CAF50]/20'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Info Panel */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-[#212121] font-[Poppins]">
              {item.title}
            </h1>

            {/* Badges Row */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category badge */}
              <Badge
                text={`${emoji} ${item.category}`}
                variant="primary"
                size="md"
              />
              {/* Condition badge */}
              <Badge
                text={item.condition}
                variant={conditionVariant[item.condition] || 'accent'}
                size="md"
              />
              {/* Listing type badge */}
              {isDonate ? (
                <Badge text="Free - Donate" variant="success" size="md" />
              ) : (
                <Badge text="Available to Lend" variant="secondary" size="md" />
              )}
            </div>

            {/* CO2 Savings Badge */}
            {item.co2Savings > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8F5E9] border border-[#4CAF50]/20">
                <Leaf className="w-5 h-5 text-[#4CAF50]" />
                <span className="text-sm font-semibold text-[#2E7D32] font-[Poppins]">
                  Saves {item.co2Savings} kg CO2
                </span>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] mb-2">
                Description
              </h3>
              <p className="text-[#757575] font-[Poppins] text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Location */}
            {item.location && (
              <div className="flex items-center gap-2 text-[#757575]">
                <MapPin className="w-4.5 h-4.5 shrink-0 text-[#4CAF50]" />
                <span className="text-sm font-[Poppins]">
                  {typeof item.location === 'string'
                    ? item.location
                    : item.location.area || item.location.name}
                </span>
              </div>
            )}

            {/* Date Posted */}
            {item.datePosted && (
              <div className="flex items-center gap-2 text-[#757575]">
                <Calendar className="w-4.5 h-4.5 shrink-0 text-[#42A5F5]" />
                <span className="text-sm font-[Poppins]">
                  Posted {formatDate(item.datePosted)}
                </span>
              </div>
            )}

            {/* Available Dates (for lend items) */}
            {item.listingType === 'lend' &&
              item.availableFrom &&
              item.availableTo && (
                <div className="flex items-center gap-2 text-[#757575]">
                  <Calendar className="w-4.5 h-4.5 shrink-0 text-[#FFA726]" />
                  <span className="text-sm font-[Poppins]">
                    Available {formatDate(item.availableFrom)} -{' '}
                    {formatDate(item.availableTo)}
                  </span>
                </div>
              )}

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Owner Card */}
            {owner && (
              <Link
                to={`/profile/${owner.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#4CAF50]/20 transition-all group"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E8F5E9]">
                  <img
                    src={owner.avatar}
                    alt={owner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#212121] font-[Poppins] group-hover:text-[#4CAF50] transition-colors">
                    {owner.name}
                  </h4>
                  <div className="mt-1">
                    <StarRating rating={owner.rating} size="sm" />
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[#757575]">
                    <span className="text-[11px] font-[Poppins]">
                      Member since {formatDate(owner.dateJoined)}
                    </span>
                    <span className="text-[11px] font-[Poppins]">
                      {owner.itemsListed} items listed
                    </span>
                  </div>
                </div>
                <User className="w-5 h-5 text-[#757575] group-hover:text-[#4CAF50] transition-colors shrink-0" />
              </Link>
            )}

            {/* Interested Button */}
            <button
              onClick={handleInterested}
              className="w-full py-3.5 rounded-xl bg-[#4CAF50] text-white font-[Poppins] text-base font-semibold hover:bg-[#2E7D32] active:scale-[0.98] transition-all shadow-md shadow-[#4CAF50]/20"
            >
              I'm Interested
            </button>
          </div>
        </div>

        {/* Similar Items Section */}
        {similarItems.length > 0 && (
          <section>
            <hr className="border-gray-100 mb-8" />
            <h2 className="text-xl font-bold text-[#212121] font-[Poppins] mb-5">
              Similar Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarItems.map((similarItem) => (
                <ItemCard key={similarItem.id} item={similarItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;
