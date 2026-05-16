import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'professional';
  isNewPro?: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (phone: string, name?: string, role?: 'customer' | 'professional', isNewPro?: boolean) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('inari_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Fix for legacy users missing a role
        if (!parsedUser.role) {
          parsedUser.role = 'customer';
          localStorage.setItem('inari_user', JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem('inari_user');
      }
    }
  }, []);

  const login = (phone: string, name?: string, role: 'customer' | 'professional' = 'customer', isNewPro?: boolean) => {
    // Mock user login with role assignment
    const newUser: User = { 
      id: role === 'professional' ? 'pro_123' : 'cus_123', 
      name: name || (role === 'professional' ? 'Alex Pro' : 'John Doe'), 
      email: role === 'professional' ? 'alex@inari.pro' : 'john@example.com', 
      phone, 
      role,
      ...(isNewPro ? { isNewPro: true } : {})
    };
    setUser(newUser);
    localStorage.setItem('inari_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inari_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('inari_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout, updateUser,
      isAuthModalOpen, openAuthModal: () => setIsAuthModalOpen(true), closeAuthModal: () => setIsAuthModalOpen(false)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
