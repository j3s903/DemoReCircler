import {
  Leaf,
  TreePine,
  Plane,
  Car,
  Users,
  Package,
  TrendingUp,
  Star,
  BarChart3,
  Globe,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { platformStats } from '../data/mockStats';
import { formatNumber } from '../utils/formatters';

const CHART_COLORS = ['#4CAF50', '#42A5F5', '#FFA726', '#EF5350', '#8D6E63', '#66BB6A', '#AB47BC', '#26C6DA', '#78909C'];

const carsOffRoad = Math.round(platformStats.totalCO2Saved / 4600);

function PlatformImpactPage() {
  const pieData = platformStats.categoryBreakdown.map((item) => ({
    name: item.category,
    value: item.count,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Community Impact</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Collective Impact</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Together, the ReCircler community is making a real difference for the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-3 text-green-200" />
              <p className="text-4xl font-bold mb-1">{platformStats.totalCO2Saved.toLocaleString()} kg</p>
              <p className="text-white/70 text-sm">CO2 Emissions Saved</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Package className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <p className="text-4xl font-bold mb-1">{platformStats.totalItems.toLocaleString()}</p>
              <p className="text-white/70 text-sm">Items Shared</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-amber-200" />
              <p className="text-4xl font-bold mb-1">{platformStats.totalUsers.toLocaleString()}</p>
              <p className="text-white/70 text-sm">Community Members</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <TreePine className="w-6 h-6 text-green-200 flex-shrink-0" />
              <p className="text-sm">
                That's equivalent to <span className="font-bold text-lg">{platformStats.totalTreesEquivalent.toLocaleString()}</span> trees planted!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Plane className="w-6 h-6 text-blue-200 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-bold text-lg">{platformStats.totalFlightsSaved}</span> domestic flights offset!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-dark" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Monthly Growth</h2>
              <p className="text-text-secondary text-sm">How our community has grown over time</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={platformStats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#757575' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#757575' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4CAF50"
                  strokeWidth={2.5}
                  dot={{ fill: '#4CAF50', r: 4 }}
                  name="Users"
                />
                <Line
                  type="monotone"
                  dataKey="items"
                  stroke="#42A5F5"
                  strokeWidth={2.5}
                  dot={{ fill: '#42A5F5', r: 4 }}
                  name="Items"
                />
                <Line
                  type="monotone"
                  dataKey="co2Saved"
                  stroke="#FFA726"
                  strokeWidth={2.5}
                  dot={{ fill: '#FFA726', r: 4 }}
                  name="CO2 Saved (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Category Breakdown</h2>
              <p className="text-text-secondary text-sm">Which categories are shared most</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                      }}
                      formatter={(value) => [value.toLocaleString() + ' items', '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full lg:w-1/2 space-y-2">
                {platformStats.categoryBreakdown.map((cat, index) => (
                  <div key={cat.category} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      <span className="text-sm text-text-primary">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-text-primary">
                        {cat.count.toLocaleString()}
                      </span>
                      <span className="text-xs text-text-secondary w-12 text-right">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-text-primary mb-6">Impact Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-7 h-7 text-error" />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">{carsOffRoad}</p>
              <p className="text-text-secondary text-sm">Cars off the road for a year</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-7 h-7 text-primary-dark" />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">
                {platformStats.totalTreesEquivalent.toLocaleString()}
              </p>
              <p className="text-text-secondary text-sm">Trees planted equivalent</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plane className="w-7 h-7 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">{platformStats.totalFlightsSaved}</p>
              <p className="text-text-secondary text-sm">Domestic flights offset</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-text-primary mb-6">Community Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-text-secondary">Total Transactions</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {platformStats.totalTransactions.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-text-secondary">Average Rating</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">4.7 / 5.0</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Most Active Category</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">Furniture</p>
              <p className="text-xs text-text-secondary mt-1">2,890 items shared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformImpactPage;
