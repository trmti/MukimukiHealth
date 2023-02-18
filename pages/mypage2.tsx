import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { getTodayFood, getUser } from '../utils/get';
import { detailWithDate } from '../utils/types';

const MyPage2: NextPage = () => {
  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const router = useRouter();

  getTodayFood('Nw2N2cNhW2WaaVSgEcCZ');

  async function onLoad() {
    const user = await getUser('Nw2N2cNhW2WaaVSgEcCZ');
    const next = user['次のご飯'];
    if (next['ご飯'] && next['ご飯'].length !== 0) {
      setTodayFood(next);
    } else {
      router.push('/mypage');
    }
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <h1>今日のご飯はこれ！</h1>
      {todayFood &&
        todayFood['ご飯'].map((food, index) => {
          return (
            <div key={index}>
              <p>{food['名前']}</p>
            </div>
          );
        })}
    </>
  );
};

export default MyPage2;
