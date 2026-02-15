import { useState } from 'react';
import {
  Heart,
  MapPin,
  ExternalLink,
  X,
  CheckCircle,
  Handshake,
} from 'lucide-react';
import { mockCharities } from '../data/mockCharities';
import { categories } from '../utils/categories';

const charityColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-warning', 'bg-error'];

function CharitiesPage() {
  const [showToast, setShowToast] = useState(false);

  const getCategoryEmoji = (categoryName) => {
    const cat = categories.find((c) => c.name === categoryName);
    return cat ? cat.emoji : '📦';
  };

  const handleDonate = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white border border-green-200 rounded-xl shadow-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm font-medium text-text-primary">Donation feature coming soon!</p>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Partner Charities</h1>
            <p className="text-text-secondary text-sm mt-0.5">Organisations making a difference in our community</p>
          </div>
        </div>

        <div className="bg-primary-light/50 rounded-2xl p-6 mt-6 mb-8 border border-primary/10">
          <div className="flex items-start gap-4">
            <Handshake className="w-8 h-8 text-primary-dark flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-primary-dark text-lg mb-1">How Charity Partnerships Work</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                ReCircler partners with local charities to ensure items reach those who need them most.
                When you donate through a partner charity, your items are professionally sorted, repaired
                if needed, and distributed to individuals and families in need. Each charity specialises in
                different categories, so your donations always find the right home.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockCharities.map((charity, index) => (
            <div
              key={charity.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 ${charityColors[index % charityColors.length]} rounded-2xl flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-xl font-bold">
                    {charity.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-text-primary text-lg">{charity.name}</h3>
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{charity.location.area}</span>
                  </div>
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {charity.description}
              </p>

              <div className="mb-5">
                <p className="text-xs font-medium text-text-secondary mb-2">Accepted Categories</p>
                <div className="flex flex-wrap gap-2">
                  {charity.acceptedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-text-primary"
                    >
                      <span>{getCategoryEmoji(cat)}</span>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDonate}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Donate to this Charity
                </button>
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-text-secondary hover:text-primary hover:border-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharitiesPage;
