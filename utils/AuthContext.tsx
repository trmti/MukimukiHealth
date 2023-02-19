import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import type { NextPage } from 'next';
import { getTodayFood } from '../utils/get';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { app } from './firebase';

export type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
};

export type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: NextPage<AuthProps> = ({ children }) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<UserType>(null);
  const isAvailableForViewing =
    router.pathname === '/' ||
    router.pathname === '/login' ||
    router.pathname === '/signup' ||
    router.pathname === '/logout';

  const value = {
    user,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (!user && !isAvailableForViewing) {
        alert('ログインしてください');
        await router.push('/login');
      }
    });
    return () => {
      authStateChanged();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (user?.email && !isAvailableForViewing) {
        const res = await getTodayFood(user.email);
        if (res) {
          alert('今日のご飯のページに移動します');
          router.push('/mypage2');
        }
      }
    })();
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
