import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-success" />
              <span className="text-xl font-bold">ReCircler</span>
            </Link>
            <p className="text-green-200 text-sm leading-relaxed">
              Share more. Waste less. Building a sustainable community, one item at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-green-100">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/browse" className="text-green-200 hover:text-white transition-colors">Browse Items</Link></li>
              <li><Link to="/map" className="text-green-200 hover:text-white transition-colors">Map View</Link></li>
              <li><Link to="/requests" className="text-green-200 hover:text-white transition-colors">Requests</Link></li>
              <li><Link to="/charities" className="text-green-200 hover:text-white transition-colors">Charities</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4 text-green-100">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/impact" className="text-green-200 hover:text-white transition-colors">Platform Impact</Link></li>
              <li><Link to="/leaderboard" className="text-green-200 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link to="/dashboard" className="text-green-200 hover:text-white transition-colors">My Dashboard</Link></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-green-100">Connect</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Contact & Help</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
            <div className="flex gap-3">
              <a href="#" className="text-green-200 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-green-200 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-green-200 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-green-200 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-8 text-center text-sm text-green-200">
          <p>Made with 💚 for the planet</p>
          <p className="mt-1">&copy; 2025 ReCircler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
