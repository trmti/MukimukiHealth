import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import TextWithLine from '../atoms/TextWithLine/index';
import Loading from '../atoms/Loading';
import SignUpForm from '../moleculs/SignUpForm/index';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../utils/AuthContext';
import { app } from '../utils/firebase';
import { createNewUser } from '../utils/set';
import Logo from '../atoms/Logo';

const Signup: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (
    e: any,
    email: string,
    password: string,
    rePassword: string
  ) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== rePassword) {
      alert('入力したパスワードが異なります');
    } else {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((e) => {
        alert('登録に失敗しました');
        console.log(e);
        return false;
      });
      if (res) {
        alert('登録!');
        await createNewUser(email);
        router.push('/mypage');
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      alert('ログイン済みです。データ入力画面に移動します。');
      router.push('/bmi');
    }
  }, [isLoggedIn]);

  if (!isLoading) {
    return (
      <>
        <Logo />
        <SignUpForm onSubmit={handleSubmit} />
      </>
    );
  } else {
    return <Loading />;
  }

};

export default Signup;
