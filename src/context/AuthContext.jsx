import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock member accounts
const MOCK_MEMBERS = [
  { email: 'member@greenlinks.vn', password: 'golf2024', name: 'Nguyen Van An', discount: 10, tier: 'Gold' },
  { email: 'vip@greenlinks.vn',    password: 'vip2024',  name: 'Tran Thi Bich', discount: 15, tier: 'Platinum' },
];

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [guestInfo, setGuestInfo]     = useState(null); // { email, phone }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError]     = useState('');

  const login = useCallback((email, password) => {
    const found = MOCK_MEMBERS.find(m => m.email === email && m.password === password);
    if (found) {
      setUser(found);
      setAuthError('');
      setIsModalOpen(false);
      return true;
    }
    setAuthError('Invalid email or password.');
    return false;
  }, []);

  const guestCheckout = useCallback((email, phone) => {
    setGuestInfo({ email, phone });
    setIsModalOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setGuestInfo(null);
  }, []);

  const openAuthModal  = useCallback(() => { setAuthError(''); setIsModalOpen(true);  }, []);
  const closeAuthModal = useCallback(() => { setAuthError(''); setIsModalOpen(false); }, []);

  const isAuthenticated = !!user;
  const displayName     = user?.name ?? guestInfo?.email ?? null;

  return (
    <AuthContext.Provider value={{
      user, guestInfo, isAuthenticated, displayName,
      authError,
      isModalOpen, openAuthModal, closeAuthModal,
      login, guestCheckout, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
