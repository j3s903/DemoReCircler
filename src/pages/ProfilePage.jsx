import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockUsers';
import { mockItems } from '../data/mockItems';
import { mockBadges } from '../data/mockBadges';
import ItemCard from '../components/items/ItemCard';
import { formatDate } from '../utils/formatters';
import {
  MapPin,
  Calendar,
  Star,
  Award,
  Leaf,
  Package,
  Shield,
  Edit,
  MessageSquare,
} from 'lucide-react';

const TIER_COLORS = {
  starter: 'bg-gray-100 text-gray-600',
  bronze: 'bg-amber-100 text-amber-700',
  silver: 'bg-slate-100 text-slate-600',
  gold: 'bg-yellow-100 text-yellow-700',
  special: 'bg-purple-100 text-purple-700',
};

const EARNED_BADGE_IDS = ['badge1', 'badge2', 'badge3', 'badge5', 'badge7', 'badge10'];

const hardcodedReviews = [
  {
    id: 'rev1',
    reviewerName: 'Emma Watson',
    reviewerAvatar: 'https://i.pravatar.cc/150?u=emma',
    rating: 5,
    text: 'Absolutely wonderful experience! The item was exactly as described and the handover was so easy. Highly recommend this community member.',
    date: '2025-01-28',
  },
  {
    id: 'rev2',
    reviewerName: 'Oliver Brown',
    reviewerAvatar: 'https://i.pravatar.cc/150?u=oliver',
    rating: 4,
    text: 'Very friendly and responsive. The item had a small mark that was not in the photos, but overall a great transaction. Would happily deal with again.',
    date: '2025-01-15',
  },
  {
    id: 'rev3',
    reviewerName: 'Hannah Price',
    reviewerAvatar: 'https://i.pravatar.cc/150?u=hannah',
    rating: 5,
    text: 'Such a generous person! They even delivered the item to my door since I do not have a car. The ReCircler community is amazing thanks to people like this.',
    date: '2024-12-20',
  },
  {
    id: 'rev4',
    reviewerName: 'Ryan Kelly',
    reviewerAvatar: 'https://i.pravatar.cc/150?u=ryank',
    rating: 4,
    text: 'Quick to respond and flexible with pickup times. The tool was in great condition and came with all the accessories. Thank you!',
    date: '2024-11-05',
  },
];

const StarRating = ({ rating, size = 'w-5 h-5' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={`${size} text-yellow-400 fill-yellow-400`}
        />
      );
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <div key={i} className="relative">
          <Star className={`${size} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${size} text-yellow-400 fill-yellow-400`} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star key={i} className={`${size} text-gray-300`} />
      );
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const profileUser = mockUsers.find((u) => u.id === id);

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-[#FAFFFE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-[#4CAF50]" />
          </div>
          <h2 className="text-2xl font-bold text-[#212121] font-[Poppins] mb-2">
            User not found
          </h2>
          <p className="text-[#757575] font-[Poppins] mb-6">
            The profile you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#4CAF50] text-white px-6 py-2.5 rounded-lg font-medium font-[Poppins] hover:bg-[#2E7D32] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const userItems = mockItems.filter((item) => item.ownerId === profileUser.id);

  return (
    <div className="min-h-screen bg-[#FAFFFE]">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <img
              src={profileUser.avatar}
              alt={profileUser.name}
              className="h-24 w-24 rounded-full ring-4 ring-white/30 object-cover shadow-lg"
            />

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl font-bold font-[Poppins]">
                  {profileUser.name}
                </h1>
                {isOwnProfile && (
                  <Link
                    to="/settings"
                    className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-medium font-[Poppins] px-3 py-1 rounded-full self-center sm:self-auto"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit Profile
                  </Link>
                )}
                {!isOwnProfile && currentUser && (
                  <Link
                    to={`/messages`}
                    className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-medium font-[Poppins] px-3 py-1 rounded-full self-center sm:self-auto"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </Link>
                )}
              </div>

              <p className="text-white/90 font-[Poppins] text-sm mb-3 max-w-xl">
                {profileUser.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-sm text-white/80 font-[Poppins]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {profileUser.location.area}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Member since {formatDate(profileUser.dateJoined)}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <StarRating rating={profileUser.rating} size="w-5 h-5" />
                <span className="text-white font-semibold font-[Poppins] text-sm">
                  {profileUser.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
              <Package className="w-6 h-6 mx-auto mb-1.5 text-white/80" />
              <p className="text-2xl font-bold font-[Poppins]">
                {profileUser.itemsListed}
              </p>
              <p className="text-xs text-white/70 font-[Poppins]">Items Listed</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
              <Leaf className="w-6 h-6 mx-auto mb-1.5 text-white/80" />
              <p className="text-2xl font-bold font-[Poppins]">
                {profileUser.totalCO2Saved}
                <span className="text-sm font-normal">kg</span>
              </p>
              <p className="text-xs text-white/70 font-[Poppins]">CO2 Saved</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
              <Award className="w-6 h-6 mx-auto mb-1.5 text-white/80" />
              <p className="text-2xl font-bold font-[Poppins]">
                {profileUser.badgeCount}
              </p>
              <p className="text-xs text-white/70 font-[Poppins]">Badges Earned</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-bold text-[#212121] font-[Poppins] mb-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4CAF50]" />
            Badges
          </h2>
          <p className="text-sm text-[#757575] font-[Poppins] mb-5">
            Achievements earned through community contributions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {mockBadges.map((badge) => {
              const isEarned = EARNED_BADGE_IDS.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 transition-all ${
                    isEarned
                      ? 'hover:shadow-md hover:-translate-y-0.5'
                      : 'opacity-50 grayscale'
                  }`}
                >
                  <span className="text-3xl block mb-2">{badge.emoji}</span>
                  <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] mb-1 truncate">
                    {badge.name}
                  </h3>
                  <p className="text-[10px] text-[#757575] font-[Poppins] leading-snug mb-2 line-clamp-2">
                    {badge.description}
                  </p>
                  <span
                    className={`inline-block text-[10px] font-medium font-[Poppins] px-2 py-0.5 rounded-full capitalize ${
                      TIER_COLORS[badge.tier] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {badge.tier}
                  </span>
                  {!isEarned && (
                    <p className="text-[9px] text-[#757575] font-[Poppins] mt-1.5 italic">
                      Locked
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Listed Items Section */}
        <section>
          <h2 className="text-xl font-bold text-[#212121] font-[Poppins] mb-1 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#4CAF50]" />
            Listed Items
          </h2>
          <p className="text-sm text-[#757575] font-[Poppins] mb-5">
            {isOwnProfile
              ? 'Items you have shared with the community'
              : `Items ${profileUser.name.split(' ')[0]} has shared`}
          </p>
          {userItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-100">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-[#757575] font-[Poppins] text-sm">
                No items listed yet.
              </p>
              {isOwnProfile && (
                <Link
                  to="/items/new"
                  className="inline-flex items-center gap-2 bg-[#4CAF50] text-white px-5 py-2 rounded-lg font-medium font-[Poppins] text-sm mt-4 hover:bg-[#2E7D32] transition-colors"
                >
                  List Your First Item
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-xl font-bold text-[#212121] font-[Poppins] mb-1 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#4CAF50]" />
            Reviews
          </h2>
          <p className="text-sm text-[#757575] font-[Poppins] mb-5">
            What others are saying
          </p>
          <div className="space-y-4">
            {hardcodedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={review.reviewerAvatar}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-semibold text-[#212121] font-[Poppins]">
                        {review.reviewerName}
                      </h4>
                      <span className="text-xs text-[#757575] font-[Poppins]">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="w-4 h-4" />
                    <p className="text-sm text-[#757575] font-[Poppins] mt-2 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
