'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { decodeToken, getSession } from '@/lib/session';
import { ResponseBase } from '@/types/common.type';
import { KEYS } from '@/utils/constants/env';
import { User, UserRole } from '@/types/user.type';
import httpClient from '@/lib/axios.config';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  session: { user: User; token: string } | null;
  setUserLogin: (response: { user: User; token: string }) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  hasRole: () => false,
  session: null,
  setUserLogin: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<{ user: User; token: string } | null>(null);
  const hasRole = (roles: UserRole[]) => (session?.user ? roles.includes(session.user.role) : false);

  const setUserLogin = async (response: { user: User; token: string }) => {
    setSession(response);
    setIsAuthenticated(true);
  };

  const initializeAuth = async () => {
    const token = (await getSession(KEYS.SESSION))?.value;

    if (token) {
      const payload = await decodeToken(token);
      const userId = payload.id;
      const { data } = await httpClient.get<ResponseBase<User>>(`/users/${userId}`);
      setSession({
        user: data.content,
        token,
      });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, hasRole, session, setUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
