import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const mockLoggedInUser = {
  id: 'user1',
  name: 'Sarah Mitchell',
  email: 'sarah@example.com',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  bio: 'Eco enthusiast and upcycling lover. Passionate about reducing waste in Newcastle.',
  location: { lat: 54.9783, lng: -1.6178, area: 'Jesmond' },
  rating: 4.8,
  badgeCount: 12,
  itemsListed: 8,
  dateJoined: '2024-03-15',
  totalCO2Saved: 145,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  const login = (email, password) => {
    setUser(mockLoggedInUser);
  };

  const register = (userData) => {
    setUser({ ...mockLoggedInUser, ...userData });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
