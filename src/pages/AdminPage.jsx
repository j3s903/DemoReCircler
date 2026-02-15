import {
  Shield,
  Users,
  Package,
  ArrowLeftRight,
  Activity,
  Star,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { mockUsers } from '../data/mockUsers';
import { mockItems } from '../data/mockItems';
import { mockTransactions } from '../data/mockTransactions';
import { formatNumber, formatDate } from '../utils/formatters';
import { categories } from '../utils/categories';

const activeListings = mockItems.filter((item) => item.listingType === 'donate' || item.listingType === 'lend').length;

function AdminPage() {
  const getCategoryEmoji = (categoryName) => {
    const cat = categories.find((c) => c.name === categoryName);
    return cat ? cat.emoji : '📦';
  };

  const recentItems = [...mockItems]
    .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .slice(0, 5);

  const getOwnerName = (ownerId) => {
    const owner = mockUsers.find((u) => u.id === ownerId);
    return owner ? owner.name : 'Unknown';
  };

  const statCards = [
    {
      label: 'Total Users',
      value: mockUsers.length,
      icon: Users,
      color: 'bg-primary-light',
      iconColor: 'text-primary-dark',
    },
    {
      label: 'Total Items',
      value: mockItems.length,
      icon: Package,
      color: 'bg-blue-50',
      iconColor: 'text-secondary',
    },
    {
      label: 'Total Transactions',
      value: mockTransactions.length,
      icon: ArrowLeftRight,
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Active Listings',
      value: activeListings,
      icon: Activity,
      color: 'bg-green-50',
      iconColor: 'text-success',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-800">
            Admin only — This dashboard is restricted to authorised administrators.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-dark" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <p className="text-2xl font-bold text-text-primary">{formatNumber(stat.value)}</p>
              <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-text-secondary" />
            Users
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Name</th>
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Email</th>
                    <th className="text-center text-xs font-semibold text-text-secondary px-6 py-3">Items Listed</th>
                    <th className="text-center text-xs font-semibold text-text-secondary px-6 py-3">Rating</th>
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockUsers.map((u, index) => (
                    <tr
                      key={u.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                          <span className="text-sm font-medium text-text-primary">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-text-secondary">{u.email}</td>
                      <td className="px-6 py-3 text-sm text-text-primary text-center font-medium">
                        {u.itemsListed}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          <span className="text-sm font-medium text-text-primary">{u.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-text-secondary flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(u.dateJoined)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-text-secondary" />
            Recent Items
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Title</th>
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Category</th>
                    <th className="text-center text-xs font-semibold text-text-secondary px-6 py-3">Type</th>
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Owner</th>
                    <th className="text-left text-xs font-semibold text-text-secondary px-6 py-3">Date Posted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <span className="text-sm font-medium text-text-primary">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary">
                          <span>{getCategoryEmoji(item.category)}</span>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                            item.listingType === 'donate'
                              ? 'bg-primary-light text-primary-dark'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {item.listingType === 'donate' ? 'Donate' : 'Lend'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-text-secondary">{getOwnerName(item.ownerId)}</td>
                      <td className="px-6 py-3 text-sm text-text-secondary">{formatDate(item.datePosted)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
