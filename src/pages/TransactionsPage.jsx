import { useState } from 'react';
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Star,
  Gift,
  RefreshCw,
  Calendar,
  Package,
  User,
} from 'lucide-react';
import { mockTransactions } from '../data/mockTransactions';
import { mockItems } from '../data/mockItems';
import { mockUsers } from '../data/mockUsers';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';

const statusTabs = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];

const statusColors = {
  Pending: 'bg-amber-100 text-amber-800',
  Accepted: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-green-100 text-green-800',
  Completed: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-red-100 text-red-800',
};

function TransactionsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const currentUserId = user?.id || 'user1';

  const filteredTransactions = mockTransactions.filter((txn) => {
    if (activeTab === 'All') return true;
    return txn.status === activeTab;
  });

  const getItem = (itemId) => mockItems.find((i) => i.id === itemId);
  const getUser = (userId) => mockUsers.find((u) => u.id === userId);

  const getOtherUser = (txn) => {
    if (txn.ownerId === currentUserId) {
      return getUser(txn.requesterId);
    }
    return getUser(txn.ownerId);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-primary-dark" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">My Transactions</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-secondary hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No transactions found</h3>
            <p className="text-text-secondary text-sm">
              {activeTab === 'All'
                ? 'You have no transactions yet. Start by browsing items!'
                : `No ${activeTab.toLowerCase()} transactions at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((txn) => {
              const item = getItem(txn.itemId);
              const otherUser = getOtherUser(txn);
              const isExpanded = expandedId === txn.id;
              const isOwner = txn.ownerId === currentUserId;

              return (
                <div
                  key={txn.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleExpand(txn.id)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      {item && (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-text-primary text-sm truncate">
                              {item ? item.title : 'Unknown Item'}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              {otherUser && (
                                <div className="flex items-center gap-1.5">
                                  <img
                                    src={otherUser.avatar}
                                    alt={otherUser.name}
                                    className="w-5 h-5 rounded-full"
                                  />
                                  <span className="text-xs text-text-secondary">
                                    {isOwner ? 'Requested by' : 'Owned by'} {otherUser.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                txn.type === 'donate'
                                  ? 'bg-primary-light text-primary-dark'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              {txn.type === 'donate' ? (
                                <Gift className="w-3 h-3" />
                              ) : (
                                <RefreshCw className="w-3 h-3" />
                              )}
                              {txn.type === 'donate' ? 'Donation' : 'Lend'}
                            </span>
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[txn.status]}`}
                            >
                              {txn.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-text-secondary flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(txn.dateRequested)}
                          </span>
                          {txn.rating && (
                            <span className="text-xs text-amber-600 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {txn.rating}/5
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                      <div className="pt-4 space-y-3">
                        {item && (
                          <div>
                            <p className="text-xs font-medium text-text-secondary mb-1">Item Description</p>
                            <p className="text-sm text-text-primary">{item.description}</p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-text-secondary mb-1">Date Requested</p>
                            <p className="text-sm text-text-primary">{formatDate(txn.dateRequested)}</p>
                          </div>
                          {txn.dateCompleted && (
                            <div>
                              <p className="text-xs font-medium text-text-secondary mb-1">Date Completed</p>
                              <p className="text-sm text-text-primary">{formatDate(txn.dateCompleted)}</p>
                            </div>
                          )}
                        </div>
                        {txn.rating && (
                          <div>
                            <p className="text-xs font-medium text-text-secondary mb-1">Rating</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= txn.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-gray-200'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-text-primary ml-1">{txn.rating}/5</span>
                            </div>
                          </div>
                        )}
                        {txn.review && (
                          <div>
                            <p className="text-xs font-medium text-text-secondary mb-1">Review</p>
                            <p className="text-sm text-text-primary italic bg-gray-50 rounded-xl p-3">
                              "{txn.review}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionsPage;
