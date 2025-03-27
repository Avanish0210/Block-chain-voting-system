
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, userDb } from '../models/User';
import { toast } from '@/components/ui/use-toast';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (voterId: string, password: string) => Promise<boolean>;
  register: (user: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (voterId: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const authenticatedUser = userDb.validateCredentials(voterId, password);
      
      if (authenticatedUser) {
        const { password, ...userWithoutPassword } = authenticatedUser;
        const securedUser = userWithoutPassword as User;
        
        setUser(securedUser);
        localStorage.setItem('user', JSON.stringify(securedUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${securedUser.name}!`,
          variant: "default",
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid voter ID or password",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error('Login error', error);
      
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (newUser: Omit<User, 'id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const registeredUser = userDb.register(newUser);
      
      if (registeredUser) {
        const { password, ...userWithoutPassword } = registeredUser;
        const securedUser = userWithoutPassword as User;
        
        setUser(securedUser);
        localStorage.setItem('user', JSON.stringify(securedUser));
        
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
          variant: "default",
        });
        
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: "Voter ID or email already exists, or age requirement not met.",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error('Registration error', error);
      
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      variant: "default",
    });
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
