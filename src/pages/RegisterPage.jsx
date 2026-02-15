import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, User, Mail, Lock, MapPin, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('Newcastle, UK');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!password.trim()) newErrors.password = 'Password is required.';
    if (password.length > 0 && password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password.';
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    if (!location.trim()) newErrors.location = 'Location is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    register({
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      location: { area: location.trim() },
    });
    navigate('/');
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-colors focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20';

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
          Join ReCircler
        </h1>
        <p className="text-center mb-8" style={{ color: '#757575' }}>
          Start sharing. Start saving.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#212121' }}>
              Full Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: '#757575' }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className={inputClass}
                style={{
                  borderColor: errors.name ? '#EF5350' : '#E0E0E0',
                  color: '#212121',
                }}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                {errors.name}
              </p>
            )}
          </div>

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
                className={inputClass}
                style={{
                  borderColor: errors.email ? '#EF5350' : '#E0E0E0',
                  color: '#212121',
                }}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                {errors.email}
              </p>
            )}
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
                placeholder="At least 6 characters"
                className={inputClass}
                style={{
                  borderColor: errors.password ? '#EF5350' : '#E0E0E0',
                  color: '#212121',
                }}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#212121' }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: '#757575' }}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={inputClass}
                style={{
                  borderColor: errors.confirmPassword ? '#EF5350' : '#E0E0E0',
                  color: '#212121',
                }}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#212121' }}>
              Location
            </label>
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: '#757575' }}
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your city or area"
                className={inputClass}
                style={{
                  borderColor: errors.location ? '#EF5350' : '#E0E0E0',
                  color: '#212121',
                }}
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-xs" style={{ color: '#EF5350' }}>
                {errors.location}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#212121' }}>
              Bio{' '}
              <span className="font-normal" style={{ color: '#757575' }}>
                (optional)
              </span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the community a little about yourself..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border outline-none transition-colors focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 resize-none"
              style={{ borderColor: '#E0E0E0', color: '#212121' }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: '#4CAF50' }}
          >
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm" style={{ color: '#757575' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: '#4CAF50' }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
