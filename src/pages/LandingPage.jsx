import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Package,
  Users,
  MapPin,
  Award,
  Heart,
  BarChart3,
  Recycle,
  ArrowRight,
  Star,
  TreePine,
  Plane,
  Car,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Target,
  ClipboardList,
} from 'lucide-react';

const categories = [
  { id: 'furniture', name: 'Furniture', emoji: '🪑' },
  { id: 'electronics', name: 'Electronics', emoji: '💻' },
  { id: 'clothing', name: 'Clothing', emoji: '👕' },
  { id: 'books', name: 'Books', emoji: '📚' },
  { id: 'tools', name: 'Tools', emoji: '🔧' },
  { id: 'food', name: 'Food', emoji: '🍎' },
  { id: 'sports', name: 'Sports & Recreation', emoji: '⚽' },
  { id: 'home-garden', name: 'Home & Garden', emoji: '🌿' },
  { id: 'other', name: 'Other', emoji: '📦' },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    area: 'Jesmond',
    avatar: 'https://i.pravatar.cc/100?img=1',
    quote:
      'ReCircler helped me furnish my entire flat when I moved to Newcastle. I found a beautiful bookshelf and desk, all for free! The community here is incredibly generous.',
    rating: 5,
  },
  {
    name: 'James Okafor',
    area: 'Heaton',
    avatar: 'https://i.pravatar.cc/100?img=3',
    quote:
      'I love being able to lend my tools to neighbours instead of them gathering dust in the garage. Last month I lent out my drill 4 times. Sharing just makes sense.',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    area: 'Gosforth',
    avatar: 'https://i.pravatar.cc/100?img=5',
    quote:
      "The impact tracking feature is brilliant. Seeing how much CO2 we've saved together motivates me to keep sharing. My kids love checking our family's green score!",
    rating: 5,
  },
];

const features = [
  {
    icon: MapPin,
    title: 'Interactive Map',
    description:
      'Discover items near you with our live neighbourhood map. See what your neighbours are sharing in real time.',
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description:
      'Our algorithm matches your wishlist with new listings. Get notified the moment something you need becomes available.',
  },
  {
    icon: BarChart3,
    title: 'Impact Tracking',
    description:
      'See your environmental impact grow with every share. Track CO2 savings, trees saved, and your community ranking.',
  },
  {
    icon: Award,
    title: 'Community Badges',
    description:
      'Earn badges for milestones like your first share, 10 items donated, or becoming a neighbourhood champion.',
  },
  {
    icon: Heart,
    title: 'Charity Partnerships',
    description:
      'Partner with local charities to donate items to those in need. Make a direct impact in your community.',
  },
  {
    icon: ClipboardList,
    title: 'Wishlist Requests',
    description:
      'Post requests for items you need. Your neighbours can check if they have what you are looking for.',
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ===== NAVBAR ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/landing" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-bold ${
                  scrolled ? 'text-text-primary' : 'text-white'
                }`}
              >
                ReCircler
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#how-it-works"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-text-secondary' : 'text-white/80'
                }`}
              >
                How It Works
              </a>
              <a
                href="#features"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-text-secondary' : 'text-white/80'
                }`}
              >
                Features
              </a>
              <a
                href="#impact"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-text-secondary' : 'text-white/80'
                }`}
              >
                Impact
              </a>
              <a
                href="#categories"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-text-secondary' : 'text-white/80'
                }`}
              >
                Categories
              </a>
            </div>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  scrolled
                    ? 'text-text-primary hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-white text-primary-dark rounded-full text-sm font-semibold hover:bg-primary-light transition-all shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                scrolled ? 'text-text-primary' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
              >
                Features
              </a>
              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
              >
                Impact
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-text-secondary hover:text-primary py-2"
              >
                Categories
              </a>
              <div className="flex gap-3 pt-3 border-t">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-2.5 rounded-full text-sm font-medium border border-gray-200 text-text-primary hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center px-4 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-emerald-400">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl" />
        </div>

        {/* Floating decorative icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Leaf className="absolute top-[15%] left-[10%] w-8 h-8 text-white/20 animate-pulse" />
          <Recycle className="absolute top-[25%] right-[15%] w-10 h-10 text-white/15 animate-pulse" style={{ animationDelay: '1s' }} />
          <Heart className="absolute bottom-[30%] left-[20%] w-6 h-6 text-white/20 animate-pulse" style={{ animationDelay: '2s' }} />
          <Package className="absolute bottom-[20%] right-[25%] w-8 h-8 text-white/15 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-[40%] left-[5%] w-5 h-5 text-white/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <TreePine className="absolute top-[60%] right-[8%] w-7 h-7 text-white/15 animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">
              Building a greener community, one share at a time
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Share More.
            <br />
            <span className="text-emerald-100">Waste Less.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join your neighbours in the circular economy. Give, lend, and share
            items you no longer need. Reduce waste, save money, and build a
            stronger community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-dark rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
            >
              Browse Items
            </Link>
          </div>

          {/* Stats overlay */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white">2,847</div>
              <div className="text-white/70 text-sm mt-1">Active Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white">12,453</div>
              <div className="text-white/70 text-sm mt-1">Items Shared</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white">45,230</div>
              <div className="text-white/70 text-sm mt-1">kg CO2 Saved</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#how-it-works"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </a>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Start sharing with your community in three easy steps.
              It only takes a minute to get going.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Package,
                step: '01',
                title: 'List Your Items',
                description:
                  'Snap a photo and list items you no longer need. Set them as donations or available to lend. It takes less than 60 seconds.',
              },
              {
                icon: Users,
                step: '02',
                title: 'Connect with Neighbours',
                description:
                  'Browse what is available nearby or get matched automatically. Message your neighbours directly through the app.',
              },
              {
                icon: Leaf,
                step: '03',
                title: 'Share & Save the Planet',
                description:
                  'Hand off your items and watch your environmental impact grow. Every share reduces waste and builds community.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-surface rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="absolute -top-3 left-8 bg-primary text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Packed with Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Features You Will Love
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Everything you need to share, connect, and track your positive
              impact on the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-background rounded-2xl p-7 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENVIRONMENTAL IMPACT ===== */}
      <section id="impact" className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-emerald-500">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-emerald-200 font-semibold text-sm uppercase tracking-wider mb-3">
              Real Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Collective Impact
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Every item shared is a step toward a more sustainable future.
              Look at what we have achieved together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                45,230
              </div>
              <div className="text-emerald-200 font-medium">kg CO2 Saved</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                2,056
              </div>
              <div className="text-emerald-200 font-medium">Trees Equivalent</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                158
              </div>
              <div className="text-emerald-200 font-medium">Flights Offset</div>
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Car className="w-6 h-6 text-yellow-300" />
              <span className="text-white font-semibold text-lg">
                Fun Fact
              </span>
            </div>
            <p className="text-white/80 text-base">
              That is equivalent to taking{' '}
              <span className="text-white font-bold">34 cars</span> off the road
              for a year! Or planting a forest the size of{' '}
              <span className="text-white font-bold">3 football pitches</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section id="categories" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Browse by Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Find What You Need
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              From furniture to fresh food, our community shares it all.
              Explore categories and discover hidden gems nearby.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse?category=${cat.id}`}
                className="bg-surface rounded-2xl p-6 text-center border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                  {cat.emoji}
                </div>
                <div className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Loved by Neighbours
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              What Our Community Says
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Real stories from real people making a difference in their
              neighbourhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-background rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-primary/10 text-6xl font-serif leading-none">
                  &ldquo;
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {testimonial.area}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-12 sm:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-white rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
              <Recycle className="w-12 h-12 text-white/30 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Join the ReCircler Community Today
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-8 text-lg">
                Start sharing, reduce waste, and become part of something bigger.
                Your neighbourhood is waiting.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-dark rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ReCircler</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A community-driven platform for sharing, lending, and donating items.
                Reducing waste one share at a time.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
                Platform
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/browse" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Map View
                  </Link>
                </li>
                <li>
                  <Link to="/charities" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Charities
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Impact Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
                Community
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/leaderboard" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Requests
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Features
                  </a>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
                Account
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ReCircler. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with 💚 for the planet
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
