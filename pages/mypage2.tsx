import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { getTodayFood } from '../utils/get';
import { db } from '../utils/firebase';
import { newData } from '../utils/get';
import { detailWithDate, foodDetail, User } from '../utils/types';
import { deleteTodayFood } from '../utils/set';
import { useAuthContext } from '../utils/AuthContext';

import Loading from '../atoms/Loading';
import Mypage2Temp from '../moleculs/Mypage2';

const MyPage2: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function onLoad() {
    setIsLoading(true);
    if (user?.email && firebaseUser) {
      onSnapshot(doc(db, 'User', user.email), async (doc) => {
        const data = doc.data() as unknown as User;
        if (data['次のご飯']) {
          const ids = data['次のご飯']['ご飯'].map((d) => d.id);
          const date = data['次のご飯']['日付'];
          const res = (await newData(ids, 'ご飯')) as foodDetail[];
          if (res) {
            setTodayFood({ 日付: date, ご飯: res });
          }
        }
      });
    }
    setIsLoading(false);
  }

  async function onClick() {
    if (user?.email && firebaseUser) {
      await setFoodRecord(firebaseUser, user.email);
      await deleteTodayFood(user.email);
      router.push('/mypage');
    }
  }

  useEffect(() => {
    onLoad();
  }, [firebaseUser]);

  if (!isLoading) {
    if (todayFood != undefined) {
      return <Mypage2Temp todayFood={todayFood} onClick={onClick} />;
    } else {
      return <></>;
    }
  } else {
    return <Loading />;
  }
};
export default MyPage2;
