import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import TextWithLine from '../atoms/TextWithLine/index';
import SignUpForm from '../moleculs/SignUpForm/index';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../utils/AuthContext';
import { app } from '../utils/firebase';
import { createNewUser } from '../utils/set';

const Signup: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (
    e: any,
    email: string,
    password: string,
    rePassword: string
  ) => {
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
  };

  useEffect(() => {
    if (isLoggedIn) {
      alert('ログイン済みです。データ入力画面に移動します。');
      router.push('/bmi');
    }
  }, [isLoggedIn]);

  return (
    <>
      <TextWithLine text="新規登録" />
      <SignUpForm onSubmit={handleSubmit} />
    </>
  );
};

export default Signup;
