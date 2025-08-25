import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

import type { AuthContextType, User, RegisterData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simular persistencia en localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validación simple para simulación
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validación básica
    if (userData.password !== userData.confirmPassword) {
      setIsLoading(false);
      return false;
    }

    // Verificar si el usuario ya existe (simulación)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(
      (user: { email: string }) => user.email === userData.email,
    );

    if (userExists) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
    };

    // Guardar usuario registrado
    existingUsers.push({
      email: userData.email,
      password: userData.password, // En una app real, NUNCA guardes contraseñas en texto plano
      name: userData.name,
    });

    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
