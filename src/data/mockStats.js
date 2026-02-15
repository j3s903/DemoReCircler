export const platformStats = {
  totalUsers: 2847,
  totalItems: 12453,
  totalCO2Saved: 45230,
  totalTransactions: 8921,
  totalTreesEquivalent: 2056,
  totalFlightsSaved: 158,
  monthlyGrowth: [
    { month: 'Mar 2024', users: 120, items: 340, co2Saved: 1520 },
    { month: 'Apr 2024', users: 185, items: 580, co2Saved: 2340 },
    { month: 'May 2024', users: 310, items: 890, co2Saved: 3180 },
    { month: 'Jun 2024', users: 480, items: 1250, co2Saved: 4650 },
    { month: 'Jul 2024', users: 640, items: 1720, co2Saved: 6200 },
    { month: 'Aug 2024', users: 830, items: 2350, co2Saved: 8100 },
    { month: 'Sep 2024', users: 1050, items: 3100, co2Saved: 11200 },
    { month: 'Oct 2024', users: 1340, items: 4200, co2Saved: 15800 },
    { month: 'Nov 2024', users: 1680, items: 5600, co2Saved: 21400 },
    { month: 'Dec 2024', users: 2010, items: 7400, co2Saved: 28500 },
    { month: 'Jan 2025', users: 2450, items: 9800, co2Saved: 36700 },
    { month: 'Feb 2025', users: 2847, items: 12453, co2Saved: 45230 },
  ],
  categoryBreakdown: [
    { category: 'Furniture', count: 2890, percentage: 23.2 },
    { category: 'Electronics', count: 2240, percentage: 18.0 },
    { category: 'Clothing', count: 1870, percentage: 15.0 },
    { category: 'Books', count: 1620, percentage: 13.0 },
    { category: 'Home & Garden', count: 1370, percentage: 11.0 },
    { category: 'Tools', count: 1000, percentage: 8.0 },
    { category: 'Sports & Recreation', count: 750, percentage: 6.0 },
    { category: 'Food', count: 465, percentage: 3.7 },
    { category: 'Other', count: 248, percentage: 2.1 },
  ],
};

export const userStats = {
  co2Saved: 145,
  itemsShared: 23,
  itemsBorrowed: 8,
  treesEquivalent: 7,
  moneySaved: 340,
  rank: 42,
  monthlyActivity: [
    { month: 'Sep 2024', itemsShared: 2, itemsBorrowed: 1, co2Saved: 15 },
    { month: 'Oct 2024', itemsShared: 4, itemsBorrowed: 0, co2Saved: 28 },
    { month: 'Nov 2024', itemsShared: 5, itemsBorrowed: 2, co2Saved: 35 },
    { month: 'Dec 2024', itemsShared: 3, itemsBorrowed: 1, co2Saved: 22 },
    { month: 'Jan 2025', itemsShared: 6, itemsBorrowed: 3, co2Saved: 30 },
    { month: 'Feb 2025', itemsShared: 3, itemsBorrowed: 1, co2Saved: 15 },
  ],
};

export default { platformStats, userStats };
