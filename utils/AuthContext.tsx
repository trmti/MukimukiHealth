import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import type { NextPage } from 'next';
import { getTodayFood, getUser } from '../utils/get';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { app } from './firebase';

import type { User as FirebaseUser } from './types';
import type { User } from 'firebase/auth';

export type UserType = User | null;
export type FirebaseUserType = FirebaseUser | null;

export type AuthContextProps = {
  user: UserType;
  firebaseUser: FirebaseUserType;
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUserType>(null);
  const isAvailableForViewing =
    router.pathname === '/' ||
    router.pathname === '/login' ||
    router.pathname === '/signup' ||
    router.pathname === '/logout';

  const value = {
    user,
    firebaseUser,
  };

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (!user && !isAvailableForViewing) {
        alert('ログインしてください');
        await router.push('/login');
      } else if (user?.email) {
        const newUser = await getUser(user.email);
        setFirebaseUser(newUser);
      }
    });
    return () => {
      authStateChanged();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (firebaseUser && !isAvailableForViewing) {
        const res = await getTodayFood(firebaseUser);
        if (user && res) {
          alert('今日のご飯のページに移動します');
          router.push('/mypage2');
        }
      }
    })();
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
