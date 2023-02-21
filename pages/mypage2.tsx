import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getTodayFood } from '../utils/get';
import { detailWithDate } from '../utils/types';
import { deleteTodayFood } from '../utils/set';

import { useAuthContext } from '../utils/AuthContext';

import Loading from '../atoms/Loading';
import Mypage2Temp from '../moleculs/Mypage2';

const MyPage2: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onLoad() {
    setIsLoading(true);
    if (user?.email && firebaseUser) {
      const res = await getTodayFood(firebaseUser);
      if (user && res) {
        setTodayFood(res);
      }
    }
    setIsLoading(false);
  }

  async function onClick() {
    if (user?.email) {
      await deleteTodayFood(user.email);
      router.push('/mypage');
    }
  }

  useEffect(() => {
    onLoad();
  }, [firebaseUser]);

  if (todayFood != undefined && !isLoading) {
    return <Mypage2Temp todayFood={todayFood} onClick={onClick} />;
  } else {
    return <Loading />;
  }
};
export default MyPage2;
