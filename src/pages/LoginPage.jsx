import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    login(email, password);
    navigate('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: '#FAFFFE' }}
    >
      <div
        className="w-full max-w-md mx-auto rounded-2xl shadow-lg p-8"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
            style={{ backgroundColor: '#E8F5E9' }}
          >
            <Leaf size={28} style={{ color: '#4CAF50' }} />
          </div>
          <span className="text-xl font-bold" style={{ color: '#2E7D32' }}>
            ReCircler
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-1" style={{ color: '#212121' }}>
          Welcome back
        </h1>
        <p className="text-center mb-8" style={{ color: '#757575' }}>
          Log in to continue making an impact.
        </p>

        {/* Error */}
        {error && (
          <div
            className="mb-4 p-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: '#FFEBEE', color: '#EF5350' }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#212121' }}>
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: '#757575' }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-colors focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
                style={{ borderColor: '#E0E0E0', color: '#212121' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#212121' }}>
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: '#757575' }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-colors focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
                style={{ borderColor: '#E0E0E0', color: '#212121' }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: '#4CAF50' }}
          >
            Log In
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm" style={{ color: '#757575' }}>
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold hover:underline" style={{ color: '#4CAF50' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
