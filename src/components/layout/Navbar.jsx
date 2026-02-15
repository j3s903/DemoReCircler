import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Leaf, Plus, MessageSquare, Menu, X, ChevronDown,
  User, LayoutDashboard, ArrowLeftRight, Trophy, LogOut, Map, Search, Heart
} from 'lucide-react';

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { to: '/browse', label: 'Browse' },
    { to: '/map', label: 'Map' },
    { to: '/requests', label: 'Requests' },
    { to: '/charities', label: 'Charities' },
  ];

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary-dark">Re<span className="text-primary">Circler</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary-dark hover:bg-primary-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/items/new"
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              List an Item
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/messages" className="relative p-2 text-text-secondary hover:text-primary-dark transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-light"
                    />
                    <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary">{user.email}</p>
                      </div>
                      <Link to={`/profile/${user.id}`} onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary-dark transition-colors">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary-dark transition-colors">
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link to="/transactions" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary-dark transition-colors">
                        <ArrowLeftRight className="h-4 w-4" /> My Transactions
                      </Link>
                      <Link to="/leaderboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary-dark transition-colors">
                        <Trophy className="h-4 w-4" /> Leaderboard
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary-dark hover:bg-primary-light rounded-xl transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary-dark rounded-xl hover:bg-primary transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-primary-dark transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-primary-light hover:text-primary-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/items/new"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-dark bg-primary-light"
            >
              <Plus className="h-4 w-4" /> List an Item
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/messages" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-primary-light">
                  Messages
                </Link>
                <Link to={`/profile/${user.id}`} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-primary-light">
                  My Profile
                </Link>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-primary-light">
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-red-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium text-primary-dark border border-primary-dark">
                  Log In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-primary-dark">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
