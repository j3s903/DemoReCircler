import { useState } from 'react';
import {
  Trophy,
  Medal,
  Leaf,
  Package,
  Star,
  Crown,
  Award,
} from 'lucide-react';
import { mockUsers } from '../data/mockUsers';
import { useAuth } from '../context/AuthContext';

const tabs = ['All-Time', 'Monthly', 'Weekly'];

function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All-Time');

  const currentUserId = user?.id || 'user1';

  const getSortedUsers = () => {
    const sorted = [...mockUsers].sort((a, b) => b.totalCO2Saved - a.totalCO2Saved);
    if (activeTab === 'Monthly') {
      return [...sorted].sort((a, b) => b.totalCO2Saved * 0.3 - a.totalCO2Saved * 0.3);
    }
    if (activeTab === 'Weekly') {
      return [...sorted].sort((a, b) => b.itemsListed - a.itemsListed);
    }
    return sorted;
  };

  const rankedUsers = getSortedUsers();
  const topThree = rankedUsers.slice(0, 3);
  const rest = rankedUsers.slice(3);

  const podiumColors = [
    { bg: 'bg-amber-50', border: 'border-amber-300', ring: 'ring-amber-300', text: 'text-amber-600', label: '1st' },
    { bg: 'bg-gray-50', border: 'border-gray-300', ring: 'ring-gray-300', text: 'text-gray-500', label: '2nd' },
    { bg: 'bg-orange-50', border: 'border-orange-300', ring: 'ring-orange-300', text: 'text-orange-600', label: '3rd' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Community Leaderboard</h1>
        </div>

        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-secondary hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {topThree.map((rankedUser, index) => {
            const style = podiumColors[index];
            const isCurrentUser = rankedUser.id === currentUserId;

            return (
              <div
                key={rankedUser.id}
                className={`${style.bg} border-2 ${style.border} rounded-2xl p-6 text-center relative ${
                  index === 0 ? 'md:-mt-4 md:pb-8' : ''
                } ${isCurrentUser ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              >
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Crown className="w-7 h-7 text-amber-500 fill-amber-400" />
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${style.text} text-xs font-bold mb-3`}>
                  {style.label}
                </div>
                <img
                  src={rankedUser.avatar}
                  alt={rankedUser.name}
                  className={`mx-auto rounded-full mb-3 ring-4 ${style.ring} ${
                    index === 0 ? 'w-20 h-20' : 'w-16 h-16'
                  }`}
                />
                <h3 className="font-bold text-text-primary text-base mb-1">{rankedUser.name}</h3>
                {isCurrentUser && (
                  <span className="inline-block text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full mb-2">
                    You
                  </span>
                )}
                <div className="space-y-1.5 mt-3">
                  <div className="flex items-center justify-center gap-1.5 text-sm">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-text-primary">{rankedUser.totalCO2Saved} kg</span>
                    <span className="text-text-secondary text-xs">CO2 saved</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-sm">
                    <Package className="w-4 h-4 text-secondary" />
                    <span className="font-semibold text-text-primary">{rankedUser.itemsListed}</span>
                    <span className="text-text-secondary text-xs">items shared</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-sm">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-text-primary">{rankedUser.badgeCount}</span>
                    <span className="text-text-secondary text-xs">badges</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-text-primary">Rankings</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {rest.map((rankedUser, index) => {
              const rank = index + 4;
              const isCurrentUser = rankedUser.id === currentUserId;

              return (
                <div
                  key={rankedUser.id}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    isCurrentUser
                      ? 'bg-primary-light/50 border-l-4 border-primary'
                      : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-gray-50/50'
                  }`}
                >
                  <div className="w-8 text-center">
                    <span className="text-lg font-bold text-text-secondary">#{rank}</span>
                  </div>
                  <img
                    src={rankedUser.avatar}
                    alt={rankedUser.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary text-sm">{rankedUser.name}</span>
                      {isCurrentUser && (
                        <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Leaf className="w-3.5 h-3.5 text-primary" />
                      <span className="font-medium">{rankedUser.totalCO2Saved} kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Package className="w-3.5 h-3.5 text-secondary" />
                      <span className="font-medium">{rankedUser.itemsListed}</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-secondary">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span className="font-medium">{rankedUser.rating}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
