import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router-dom';
import { mockItems } from '../data/mockItems';
import { categories } from '../utils/categories';
import { Filter, X, MapPin } from 'lucide-react';

// Fix default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function MapPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterOpen, setFilterOpen] = useState(true);

  const allCategoryIds = categories.map((c) => c.name);

  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) return mockItems;
    return mockItems.filter((item) => selectedCategories.includes(item.category));
  }, [selectedCategories]);

  const isAllSelected = selectedCategories.length === 0;

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((c) => c !== categoryName);
      }
      return [...prev, categoryName];
    });
  };

  const selectAll = () => {
    setSelectedCategories([]);
  };

  const getCategoryInfo = (categoryName) => {
    return categories.find((c) => c.name === categoryName);
  };

  return (
    <div className="relative" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Map */}
      <MapContainer
        center={[54.9783, -1.6178]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredItems.map((item) => (
          <Marker key={item.id} position={[item.location.lat, item.location.lng]}>
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{
                    width: '120px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '8px',
                  }}
                />
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#212121',
                    margin: '0 0 4px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#757575', margin: '0 0 6px 0' }}>
                  {getCategoryInfo(item.category)?.emoji || '📦'} {item.category}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    color: '#FFFFFF',
                    backgroundColor: item.listingType === 'donate' ? '#4CAF50' : '#42A5F5',
                    marginBottom: '8px',
                  }}
                >
                  {item.listingType === 'donate' ? 'Donate' : 'Lend'}
                </span>
                <br />
                <Link
                  to={`/items/${item.id}`}
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#4CAF50',
                    textDecoration: 'none',
                  }}
                >
                  View Details &rarr;
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Category Filter Overlay */}
      <div
        className="absolute top-4 left-4 z-[1000]"
        style={{ maxHeight: 'calc(100% - 2rem)' }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-md text-sm font-medium"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#212121',
            border: '1px solid #E0E0E0',
          }}
        >
          {filterOpen ? (
            <X className="w-4 h-4" style={{ color: '#757575' }} />
          ) : (
            <Filter className="w-4 h-4" style={{ color: '#757575' }} />
          )}
          {filterOpen ? 'Hide Filters' : 'Filter Categories'}
        </button>

        {/* Filter Panel */}
        {filterOpen && (
          <div
            className="mt-2 rounded-lg shadow-lg p-3 overflow-y-auto"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              maxHeight: 'calc(100vh - 10rem)',
              width: '220px',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" style={{ color: '#4CAF50' }} />
              <span className="text-sm font-semibold" style={{ color: '#212121' }}>
                Categories
              </span>
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}
              >
                {filteredItems.length}
              </span>
            </div>

            {/* All Categories Button */}
            <button
              onClick={selectAll}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-colors"
              style={{
                backgroundColor: isAllSelected ? '#E8F5E9' : 'transparent',
                color: isAllSelected ? '#2E7D32' : '#757575',
                border: isAllSelected ? '1px solid #4CAF50' : '1px solid transparent',
              }}
            >
              All Categories
            </button>

            {/* Individual Category Buttons */}
            <div className="space-y-1">
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.name)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                    style={{
                      backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                      color: isActive ? '#2E7D32' : '#757575',
                      border: isActive ? '1px solid #4CAF50' : '1px solid transparent',
                      fontWeight: isActive ? '600' : '400',
                    }}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
