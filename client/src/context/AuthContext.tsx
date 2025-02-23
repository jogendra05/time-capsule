// contexts/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
  } from 'react';
  
  interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
  }
  
  export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    login: () => {},
    logout: () => {},
    loading: true,
  });
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    // Initialize auth state from storage
    useEffect(() => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        validateToken(storedToken).then(isValid => {
          if (isValid) {
            setToken(storedToken);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }, []);

    
  
    const login = useCallback((newToken: string) => {
        console.log("This")
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
    }, []);
  
    const logout = useCallback(() => {
      localStorage.removeItem('authToken');
      setToken(null);
    }, []);
  
    const value = {
      isAuthenticated: !!token,
      token,
      setToken,
      login,
      logout,
      loading,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  // Helper function to validate token with server
  async function validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch('validate-token/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }