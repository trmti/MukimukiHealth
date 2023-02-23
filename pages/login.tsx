import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import LoginForm from '../moleculs/LoginForm/index';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../utils/AuthContext';
import { app } from '../utils/firebase';
import Loading from '../atoms/Loading';
import Logo from '../atoms/Logo';

const Login: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (e: any, email: string, password: string) => {
    setIsLoading(false);
    e.preventDefault();
    const res = await signInWithEmailAndPassword(auth, email, password).catch(
      (e) => {
        alert('ログインに失敗しました');
        console.log(e);
        return false;
      }
    );
    if (res) {
      alert('ログイン！');
      router.push('/mypage');
    }
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      alert('ログイン済みです。マイページに移動します。');
      router.push('/mypage');
    }
  }, [isLoggedIn]);

  if (!isLoading) {
    return (
      <div>
        <Logo />
        <LoginForm onSubmit={handleSubmit} />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Login;
