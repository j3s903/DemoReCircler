import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Leaf,
  Package,
  Users,
  TreePine,
  Sparkles,
  Plus,
} from 'lucide-react';
import { mockItems } from '../data/mockItems';
import { categories } from '../utils/categories';
import { formatNumber } from '../utils/formatters';

function ItemCard({ item }) {
  return (
    <Link
      to={`/items/${item.id}`}
      className="bg-surface rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              item.listingType === 'donate'
                ? 'bg-primary text-white'
                : 'bg-secondary text-white'
            }`}
          >
            {item.listingType === 'donate' ? 'Free' : 'Lend'}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          <Leaf className="w-3 h-3" />
          {item.co2Savings} kg CO2
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-text-secondary text-xs mb-2 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            {item.location.area}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-full text-text-secondary">
            {item.condition}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const featuredItems = mockItems.slice(0, 6);
  const totalCO2 = mockItems.reduce((sum, item) => sum + item.co2Savings, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-emerald-400 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-60 h-60 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">
              Your neighbourhood sharing platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Share more. Waste less.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Discover free items nearby, lend what you do not use, and reduce
            waste in your community.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for items near you..."
                className="w-full pl-12 pr-32 py-4 bg-white rounded-full text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl text-sm sm:text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-dark rounded-full font-semibold hover:bg-emerald-50 transition-all shadow-lg text-sm"
            >
              Browse Items
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/items/new"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              List an Item
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Get Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Package,
                step: '1',
                title: 'List',
                description:
                  'Snap a photo and list items you no longer need. Mark them as free or available to lend.',
              },
              {
                icon: Users,
                step: '2',
                title: 'Connect',
                description:
                  'Browse what neighbours are sharing nearby or get matched with items on your wishlist.',
              },
              {
                icon: Leaf,
                step: '3',
                title: 'Share',
                description:
                  'Hand off your items, reduce waste, and grow your positive environmental impact.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-surface rounded-2xl p-8 text-center shadow-sm border border-gray-100 group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ITEMS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Recently Listed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Featured Items
              </h2>
            </div>
            <Link
              to="/browse"
              className="hidden sm:inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/browse"
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm"
            >
              View All Items
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== IMPACT BANNER ===== */}
      <section className="py-16 bg-gradient-to-r from-primary-dark via-primary to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TreePine className="w-8 h-8 text-emerald-200" />
            <Leaf className="w-6 h-6 text-emerald-200" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Together we have saved{' '}
            <span className="text-emerald-100">
              {formatNumber(45230)}
            </span>{' '}
            kg of CO2
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Every item shared keeps waste out of landfill and reduces the carbon
            footprint of manufacturing new products.
          </p>
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-dark rounded-full font-semibold hover:bg-emerald-50 transition-all shadow-lg text-sm"
          >
            View Full Impact Report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== CATEGORY BROWSING ===== */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Explore
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Browse by Category
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              Find exactly what you need across nine popular categories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse?category=${cat.id}`}
                className="bg-surface rounded-2xl p-5 text-center border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform inline-block">
                  {cat.emoji}
                </div>
                <div className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-12 sm:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to make a difference?
              </h2>
              <p className="text-white/70 max-w-md mx-auto mb-8">
                List your first item and join thousands of neighbours building a
                more sustainable community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/items/new"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-primary-dark rounded-full font-semibold hover:bg-emerald-50 transition-all shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  List an Item
                </Link>
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all text-sm"
                >
                  Browse Items
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
