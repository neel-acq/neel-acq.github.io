import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'premium';
  joinDate: string;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; rememberMe?: boolean }) => Promise<void>;
  register: (userData: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string; 
    agreeToTerms: boolean;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      // Check localStorage for session
      const savedUser = localStorage.getItem('finflip_user');
      const sessionToken = localStorage.getItem('finflip_session');
      
      if (savedUser && sessionToken) {
        // In a real app, validate the session token with the server
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
      // Clear invalid session data
      localStorage.removeItem('finflip_user');
      localStorage.removeItem('finflip_session');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { 
    email: string; 
    password: string; 
    rememberMe?: boolean;
  }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user data - in a real app, this would come from the server
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        plan: 'free',
        joinDate: 'January 2024',
        isEmailVerified: true,
      };

      setUser(mockUser);

      // Save session if remember me is checked
      if (credentials.rememberMe) {
        localStorage.setItem('finflip_user', JSON.stringify(mockUser));
        localStorage.setItem('finflip_session', 'mock_session_token');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    agreeToTerms: boolean;
  }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock user creation - in a real app, this would come from the server
      const newUser: User = {
        id: Date.now().toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        plan: 'free',
        joinDate: new Date().toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        }),
        isEmailVerified: false,
      };

      setUser(newUser);

      // Save session
      localStorage.setItem('finflip_user', JSON.stringify(newUser));
      localStorage.setItem('finflip_session', 'mock_session_token');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear user state and session
      setUser(null);
      localStorage.removeItem('finflip_user');
      localStorage.removeItem('finflip_session');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('finflip_user', JSON.stringify(updatedUser));
    }
  };

  const refreshUser = async () => {
    if (!user) return;

    try {
      // In a real app, fetch fresh user data from the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just update the last activity
      updateUser({ 
        ...user,
        // Add any fresh data here
      });
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}