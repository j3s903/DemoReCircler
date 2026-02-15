import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, X, Leaf, MapPin } from 'lucide-react';
import { mockItems } from '../data/mockItems';
import { categories } from '../utils/categories';
import ItemCard from '../components/items/ItemCard';
import SearchBar from '../components/common/SearchBar';
import Badge from '../components/common/Badge';

const conditionOptions = ['Like New', 'Good', 'Fair', 'Used'];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'co2', label: 'CO2 Impact' },
];

const conditionVariant = {
  'Like New': 'success',
  'Good': 'primary',
  'Fair': 'warning',
  'Used': 'accent',
};

const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedType('all');
    setSelectedConditions([]);
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedType !== 'all' ||
    selectedConditions.length > 0;

  // Filter items
  let filteredItems = mockItems.filter((item) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(query);
      const matchesDesc = item.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDesc) return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false;
    }

    // Type filter
    if (selectedType !== 'all' && item.listingType !== selectedType) {
      return false;
    }

    // Condition filter
    if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) {
      return false;
    }

    return true;
  });

  // Sort items
  filteredItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.datePosted) - new Date(a.datePosted);
      case 'oldest':
        return new Date(a.datePosted) - new Date(b.datePosted);
      case 'co2':
        return b.co2Savings - a.co2Savings;
      default:
        return 0;
    }
  });

  const activeFilterCount =
    selectedCategories.length +
    selectedConditions.length +
    (selectedType !== 'all' ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.name)}
                onChange={() => toggleCategory(cat.name)}
                className="w-4 h-4 rounded border-gray-300 text-[#4CAF50] focus:ring-[#4CAF50] cursor-pointer"
              />
              <span className="text-sm text-[#212121] font-[Poppins] group-hover:text-[#4CAF50] transition-colors">
                {cat.emoji} {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] mb-3">Listing Type</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'donate', label: 'Donate' },
            { value: 'lend', label: 'Lend' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="listingType"
                value={option.value}
                checked={selectedType === option.value}
                onChange={() => setSelectedType(option.value)}
                className="w-4 h-4 border-gray-300 text-[#4CAF50] focus:ring-[#4CAF50] cursor-pointer"
              />
              <span className="text-sm text-[#212121] font-[Poppins] group-hover:text-[#4CAF50] transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] mb-3">Condition</h3>
        <div className="space-y-2">
          {conditionOptions.map((condition) => (
            <label
              key={condition}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="w-4 h-4 rounded border-gray-300 text-[#4CAF50] focus:ring-[#4CAF50] cursor-pointer"
              />
              <span className="text-sm text-[#212121] font-[Poppins] group-hover:text-[#4CAF50] transition-colors">
                {condition}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-sm font-semibold text-[#212121] font-[Poppins] mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-[#212121] font-[Poppins] text-sm focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-[#757575] hover:text-[#EF5350] hover:border-[#EF5350] font-[Poppins] text-sm font-medium transition-all"
        >
          <X className="w-4 h-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFFFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#212121] font-[Poppins] mb-1">
            Browse Items
          </h1>
          <p className="text-[#757575] font-[Poppins] text-sm">
            Discover pre-loved items available for donation and lending in your community
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search items by name or description..."
            />
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#212121] font-[Poppins] text-sm font-medium hover:border-[#4CAF50] transition-all relative"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#4CAF50] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-6 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-4.5 h-4.5 text-[#4CAF50]" />
                <h2 className="text-sm font-bold text-[#212121] font-[Poppins]">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="ml-auto bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2 py-0.5 rounded-full font-[Poppins]">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4.5 h-4.5 text-[#4CAF50]" />
                      <h2 className="text-sm font-bold text-[#212121] font-[Poppins]">Filters</h2>
                    </div>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5 text-[#757575]" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#757575] font-[Poppins]">
                Showing{' '}
                <span className="font-semibold text-[#212121]">{filteredItems.length}</span>{' '}
                {filteredItems.length === 1 ? 'item' : 'items'}
              </p>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'text-[#757575] hover:text-[#212121]'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'text-[#757575] hover:text-[#212121]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Filters Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((cat) => {
                  const catData = categories.find((c) => c.name === cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium font-[Poppins] hover:bg-[#C8E6C9] transition-colors"
                    >
                      {catData?.emoji} {cat}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                {selectedType !== 'all' && (
                  <button
                    onClick={() => setSelectedType('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#42A5F5] text-xs font-medium font-[Poppins] hover:bg-blue-100 transition-colors"
                  >
                    {selectedType === 'donate' ? 'Donate' : 'Lend'}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {selectedConditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleCondition(condition)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-[#212121] text-xs font-medium font-[Poppins] hover:bg-gray-200 transition-colors"
                  >
                    {condition}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Results */}
            {filteredItems.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item) => {
                    const categoryData = categories.find((c) => c.name === item.category);
                    const emoji = categoryData?.emoji || '📦';
                    const isDonate = item.listingType === 'donate';
                    const imageUrl = item.images?.[0] || '/placeholder.jpg';

                    return (
                      <Link
                        key={item.id}
                        to={`/items/${item.id}`}
                        className="group flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#4CAF50]/20"
                      >
                        {/* Image */}
                        <div className="relative w-48 sm:w-56 shrink-0 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5 text-sm shadow-sm">
                            {emoji}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
                          <div>
                            <h3 className="text-[#212121] font-semibold font-[Poppins] text-base mb-1.5 truncate group-hover:text-[#4CAF50] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-[#757575] text-sm font-[Poppins] leading-relaxed line-clamp-2 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                text={item.condition}
                                variant={conditionVariant[item.condition] || 'accent'}
                                size="sm"
                              />
                              <Badge
                                text={isDonate ? 'Donate' : 'Lend'}
                                variant={isDonate ? 'success' : 'secondary'}
                                size="sm"
                              />
                              {item.co2Savings > 0 && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#4CAF50] font-[Poppins]">
                                  <Leaf className="w-3 h-3" />
                                  {item.co2Savings}kg CO2
                                </span>
                              )}
                            </div>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-1 text-[#757575] mt-3">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-xs font-[Poppins]">
                                {typeof item.location === 'string'
                                  ? item.location
                                  : item.location.area || item.location.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-5">
                  <Search className="w-9 h-9 text-[#4CAF50]" />
                </div>
                <h3 className="text-lg font-semibold text-[#212121] font-[Poppins] mb-2">
                  No items found
                </h3>
                <p className="text-[#757575] font-[Poppins] text-sm text-center max-w-sm mb-5">
                  Try adjusting your search or filters to find what you are looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4CAF50] text-white font-[Poppins] text-sm font-medium hover:bg-[#2E7D32] transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
