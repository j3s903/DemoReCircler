import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userStats, platformStats } from '../data/mockStats';
import { mockBadges } from '../data/mockBadges';
import { mockItems } from '../data/mockItems';
import { formatDate } from '../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Leaf,
  Package,
  Award,
  Trophy,
  TrendingUp,
  Heart,
  PiggyBank,
  HandHeart,
} from 'lucide-react';

const EARNED_COUNT = 5;

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFFFE' }}>
        <div className="text-center p-10 rounded-2xl shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
          <Leaf className="mx-auto mb-4" size={48} style={{ color: '#4CAF50' }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#212121' }}>
            Please log in to view your dashboard
          </h2>
          <p className="mb-6" style={{ color: '#757575' }}>
            Track your environmental impact and community contributions.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: '#4CAF50' }}
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const userItems = mockItems.filter((item) => item.ownerId === 'user1');
  const recentItems = userItems.slice(-5).reverse();

  const chartData = userStats.monthlyActivity.map((entry) => ({
    month: entry.month.split(' ')[0],
    'Items Shared': entry.itemsShared,
    'CO2 Saved (kg)': entry.co2Saved,
  }));

  const earnedBadges = mockBadges.slice(0, EARNED_COUNT);
  const lockedBadges = mockBadges.slice(EARNED_COUNT);

  const tierColors = {
    starter: '#66BB6A',
    bronze: '#8D6E63',
    silver: '#9E9E9E',
    gold: '#FFA726',
    special: '#42A5F5',
  };

  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: '#FAFFFE' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#212121' }}>
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg" style={{ color: '#757575' }}>
            Here is a summary of your environmental impact and community contributions.
          </p>
        </div>

        {/* Hero CO2 Card */}
        <div
          className="rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
          }}
        >
          <div className="absolute top-4 right-4 opacity-20">
            <Leaf size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Leaf size={28} />
              <span className="text-lg font-medium opacity-90">Total CO2 Saved</span>
            </div>
            <div className="text-6xl font-extrabold mb-2">
              {userStats.co2Saved} <span className="text-2xl font-medium">kg</span>
            </div>
            <p className="text-lg opacity-90">
              Equivalent to <strong>{userStats.treesEquivalent} trees</strong> planted
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Package,
              value: userStats.itemsShared,
              label: 'Items Shared',
              color: '#4CAF50',
              bg: '#E8F5E9',
            },
            {
              icon: HandHeart,
              value: userStats.itemsBorrowed,
              label: 'Items Borrowed',
              color: '#42A5F5',
              bg: '#E3F2FD',
            },
            {
              icon: PiggyBank,
              value: `\u00A3${userStats.moneySaved}`,
              label: 'Money Saved',
              color: '#FFA726',
              bg: '#FFF3E0',
            },
            {
              icon: Trophy,
              value: `#${userStats.rank}`,
              label: 'Community Rank',
              color: '#8D6E63',
              bg: '#EFEBE9',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl p-5 shadow-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#212121' }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: '#757575' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Activity Chart */}
        <div
          className="rounded-2xl p-6 shadow-sm mb-8"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={22} style={{ color: '#4CAF50' }} />
            <h2 className="text-xl font-bold" style={{ color: '#212121' }}>
              Monthly Activity
            </h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" tick={{ fill: '#757575', fontSize: 13 }} />
                <YAxis yAxisId="left" tick={{ fill: '#757575', fontSize: 13 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#757575', fontSize: 13 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="Items Shared"
                  fill="#4CAF50"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
                <Bar
                  yAxisId="right"
                  dataKey="CO2 Saved (kg)"
                  fill="#42A5F5"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4CAF50' }} />
              <span className="text-sm" style={{ color: '#757575' }}>Items Shared</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#42A5F5' }} />
              <span className="text-sm" style={{ color: '#757575' }}>CO2 Saved (kg)</span>
            </div>
          </div>
        </div>

        {/* Badge Progress */}
        <div
          className="rounded-2xl p-6 shadow-sm mb-8"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Award size={22} style={{ color: '#FFA726' }} />
              <h2 className="text-xl font-bold" style={{ color: '#212121' }}>
                Badge Progress
              </h2>
            </div>
            <span className="text-sm font-medium" style={{ color: '#757575' }}>
              {EARNED_COUNT}/{mockBadges.length} badges earned
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full mb-6" style={{ backgroundColor: '#E8F5E9' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(EARNED_COUNT / mockBadges.length) * 100}%`,
                backgroundColor: '#4CAF50',
              }}
            />
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-3 rounded-xl transition-transform hover:scale-105"
                style={{ backgroundColor: '#FAFFFE' }}
              >
                <div className="text-3xl mb-2">{badge.emoji}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#212121' }}>
                  {badge.name}
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize"
                  style={{
                    backgroundColor: tierColors[badge.tier] + '20',
                    color: tierColors[badge.tier],
                  }}
                >
                  {badge.tier}
                </span>
              </div>
            ))}
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-3 rounded-xl opacity-40 grayscale"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <div className="text-3xl mb-2">{badge.emoji}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: '#757575' }}>
                  {badge.name}
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize"
                  style={{
                    backgroundColor: '#E0E0E0',
                    color: '#9E9E9E',
                  }}
                >
                  {badge.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="rounded-2xl p-6 shadow-sm"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Heart size={22} style={{ color: '#EF5350' }} />
            <h2 className="text-xl font-bold" style={{ color: '#212121' }}>
              Recent Activity
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: '#F5F5F5' }}>
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#212121' }}>
                      {item.title}
                    </div>
                    <div className="text-xs" style={{ color: '#757575' }}>
                      {formatDate(item.datePosted)}
                    </div>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
                  style={{
                    backgroundColor: item.listingType === 'donate' ? '#E8F5E9' : '#E3F2FD',
                    color: item.listingType === 'donate' ? '#2E7D32' : '#1565C0',
                  }}
                >
                  {item.listingType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
