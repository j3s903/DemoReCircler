import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Package, Image, Calendar, MapPin, Check } from 'lucide-react';
import { categories } from '../utils/categories';

const conditions = ['Like New', 'Good', 'Fair', 'Used'];

export default function CreateListingPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [listingType, setListingType] = useState('donate');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [location, setLocation] = useState('Newcastle, UK');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = true;
    if (!description.trim()) newErrors.description = true;
    if (!category) newErrors.category = true;
    if (!condition) newErrors.condition = true;
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTitle('');
      setDescription('');
      setCategory('');
      setCondition('');
      setListingType('donate');
      setAvailableFrom('');
      setAvailableTo('');
      setLocation('Newcastle, UK');
      setErrors({});

      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFFFE' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package className="w-8 h-8" style={{ color: '#4CAF50' }} />
            <h1 className="text-3xl font-bold" style={{ color: '#212121' }}>
              List an Item
            </h1>
          </div>
          <p className="text-lg" style={{ color: '#757575' }}>
            Share something you no longer need
          </p>
        </div>

        {/* Success Toast */}
        {submitted && (
          <div
            className="mb-6 flex items-center gap-3 p-4 rounded-lg border"
            style={{
              backgroundColor: '#E8F5E9',
              borderColor: '#66BB6A',
              color: '#2E7D32',
            }}
          >
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">
              Your item has been listed successfully!
            </span>
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl shadow-sm border p-6 space-y-6"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E0E0E0',
          }}
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#212121' }}
            >
              Title <span style={{ color: '#EF5350' }}>*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: false }));
              }}
              placeholder="e.g. Mid-Century Wooden Bookshelf"
              className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2"
              style={{
                borderColor: errors.title ? '#EF5350' : '#E0E0E0',
                color: '#212121',
                focusRingColor: '#4CAF50',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
              onBlur={(e) => (e.target.style.borderColor = errors.title ? '#EF5350' : '#E0E0E0')}
            />
            {errors.title && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                Title is required
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#212121' }}
            >
              Description <span style={{ color: '#EF5350' }}>*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: false }));
              }}
              placeholder="Describe your item, its condition, and any details a recipient should know..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none resize-none"
              style={{
                borderColor: errors.description ? '#EF5350' : '#E0E0E0',
                color: '#212121',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
              onBlur={(e) => (e.target.style.borderColor = errors.description ? '#EF5350' : '#E0E0E0')}
            />
            {errors.description && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                Description is required
              </p>
            )}
          </div>

          {/* Category & Condition Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#212121' }}
              >
                Category <span style={{ color: '#EF5350' }}>*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) setErrors((prev) => ({ ...prev, category: false }));
                }}
                className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none"
                style={{
                  borderColor: errors.category ? '#EF5350' : '#E0E0E0',
                  color: category ? '#212121' : '#757575',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
                onBlur={(e) => (e.target.style.borderColor = errors.category ? '#EF5350' : '#E0E0E0')}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                  Category is required
                </p>
              )}
            </div>

            {/* Condition */}
            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium mb-1.5"
                style={{ color: '#212121' }}
              >
                Condition <span style={{ color: '#EF5350' }}>*</span>
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                  if (errors.condition) setErrors((prev) => ({ ...prev, condition: false }));
                }}
                className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none"
                style={{
                  borderColor: errors.condition ? '#EF5350' : '#E0E0E0',
                  color: condition ? '#212121' : '#757575',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
                onBlur={(e) => (e.target.style.borderColor = errors.condition ? '#EF5350' : '#E0E0E0')}
              >
                <option value="">Select condition</option>
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
              {errors.condition && (
                <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                  Condition is required
                </p>
              )}
            </div>
          </div>

          {/* Listing Type Toggle */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: '#212121' }}
            >
              Listing Type
            </label>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: '#E0E0E0' }}>
              <button
                type="button"
                onClick={() => setListingType('donate')}
                className="flex-1 py-2.5 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: listingType === 'donate' ? '#4CAF50' : '#FFFFFF',
                  color: listingType === 'donate' ? '#FFFFFF' : '#757575',
                }}
              >
                <Package className="w-4 h-4" />
                Donate
              </button>
              <button
                type="button"
                onClick={() => setListingType('lend')}
                className="flex-1 py-2.5 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: listingType === 'lend' ? '#42A5F5' : '#FFFFFF',
                  color: listingType === 'lend' ? '#FFFFFF' : '#757575',
                  borderLeft: '1px solid #E0E0E0',
                }}
              >
                <Calendar className="w-4 h-4" />
                Lend
              </button>
            </div>
          </div>

          {/* Date Range — shown only for Lend */}
          {listingType === 'lend' && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg"
              style={{ backgroundColor: '#E3F2FD' }}
            >
              <div>
                <label
                  htmlFor="availableFrom"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: '#212121' }}
                >
                  Available From
                </label>
                <input
                  id="availableFrom"
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none"
                  style={{ borderColor: '#E0E0E0', color: '#212121' }}
                  onFocus={(e) => (e.target.style.borderColor = '#42A5F5')}
                  onBlur={(e) => (e.target.style.borderColor = '#E0E0E0')}
                />
              </div>
              <div>
                <label
                  htmlFor="availableTo"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: '#212121' }}
                >
                  Available To
                </label>
                <input
                  id="availableTo"
                  type="date"
                  value={availableTo}
                  onChange={(e) => setAvailableTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none"
                  style={{ borderColor: '#E0E0E0', color: '#212121' }}
                  onFocus={(e) => (e.target.style.borderColor = '#42A5F5')}
                  onBlur={(e) => (e.target.style.borderColor = '#E0E0E0')}
                />
              </div>
            </div>
          )}

          {/* Image Upload Area */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#212121' }}
            >
              Photos
            </label>
            <div
              className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-green-400"
              style={{ borderColor: '#BDBDBD', backgroundColor: '#FAFFFE' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: '#E8F5E9' }}
              >
                <Image className="w-6 h-6" style={{ color: '#4CAF50' }} />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#212121' }}>
                Click or drag to upload images
              </p>
              <p className="text-xs" style={{ color: '#757575' }}>
                PNG, JPG, or WEBP up to 5MB each
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Upload className="w-4 h-4" style={{ color: '#757575' }} />
                <span className="text-xs" style={{ color: '#757575' }}>
                  Browse files
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#212121' }}
            >
              Location
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: '#757575' }}
              />
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none"
                style={{ borderColor: '#E0E0E0', color: '#212121' }}
                onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
                onBlur={(e) => (e.target.style.borderColor = '#E0E0E0')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-colors hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#4CAF50' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#2E7D32')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            <Check className="w-5 h-5" />
            Publish Listing
          </button>
        </form>
      </div>
    </div>
  );
}
