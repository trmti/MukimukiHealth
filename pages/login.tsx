import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import TextWithLine from '../atoms/TextWithLine/index';
import LoginForm from '../moleculs/LoginForm/index';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../utils/AuthContext';
import { app } from '../utils/firebase';

const Login: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (e: any, email: string, password: string) => {
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
  };

  useEffect(() => {
    if (isLoggedIn) {
      alert('ログイン済みです。マイページに移動します。');
      router.push('/mypage');
    }
  }, [isLoggedIn]);

  return (
    <div style={{ textAlign: 'center' }}>
      <TextWithLine text="ログイン" />
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
