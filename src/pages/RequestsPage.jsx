import { useState } from 'react';
import {
  HandHelping,
  Plus,
  MapPin,
  Clock,
  MessageSquare,
  CalendarDays,
  X,
  CheckCircle,
} from 'lucide-react';
import { mockRequests } from '../data/mockRequests';
import { mockUsers } from '../data/mockUsers';
import { categories } from '../utils/categories';
import { formatDate, formatRelativeTime } from '../utils/formatters';

function RequestsPage() {
  const [showToast, setShowToast] = useState(false);

  const getUser = (userId) => mockUsers.find((u) => u.id === userId);

  const getCategoryEmoji = (categoryName) => {
    const cat = categories.find((c) => c.name === categoryName);
    return cat ? cat.emoji : '📦';
  };

  const handlePostRequest = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white border border-green-200 rounded-xl shadow-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm font-medium text-text-primary">Request posting coming soon!</p>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
              <HandHelping className="w-5 h-5 text-primary-dark" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Community Requests</h1>
              <p className="text-text-secondary text-sm mt-0.5">Items people are looking for</p>
            </div>
          </div>
          <button
            onClick={handlePostRequest}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Post a Request
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockRequests.map((request) => {
            const user = getUser(request.userId);
            const emoji = getCategoryEmoji(request.category);

            return (
              <div
                key={request.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-text-secondary">
                    <span>{emoji}</span>
                    {request.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                    <MessageSquare className="w-3 h-3" />
                    {request.responses} {request.responses === 1 ? 'response' : 'responses'}
                  </span>
                </div>

                <h3 className="font-semibold text-text-primary text-base mb-2">{request.title}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">{request.description}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Within {request.preferredDistance} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Expires {formatDate(request.expiryDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  {user && (
                    <div className="flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-full"
                      />
                      <span className="text-xs font-medium text-text-primary">{user.name}</span>
                    </div>
                  )}
                  <span className="text-xs text-text-secondary flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {formatRelativeTime(request.datePosted)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
