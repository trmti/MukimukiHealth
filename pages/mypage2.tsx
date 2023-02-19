import type { NextPage } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { getTodayFood } from '../utils/get';
import { deleteTodayFood } from '../utils/set';
import { detailWithDate, food } from '../utils/types';

import { useAuthContext } from '../utils/AuthContext';

import Button from '../atoms/Button';
import Loading from '../atoms/Loading';

const MyPage2: NextPage = () => {
  const { user } = useAuthContext();

  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function onLoad() {
    if (user?.email) {
      const res = await getTodayFood(user.email);
      if (res) {
        setTodayFood(res);
      } else {
        router.push('/mypage');
      }
    }
  }

  async function onClick() {
    if (user?.email) {
      await deleteTodayFood(user.email);

      router.push('/mypage');
    }
  }

  useEffect(() => {
    onLoad();
  }, [user]);

  if (!isLoading) {
    return (
      <>
        <h1>今日のご飯はこれ！</h1>
        {todayFood &&
          todayFood['ご飯'].map((food, index) => {
            return (
              <div key={index}>
                <p>{food['名前']}</p>
                <Image src={food['URL']} width={500} height={500} alt="飯" />
                {((): ReactNode => {
                  return (
                    Object.keys(food['栄養']) as unknown as (keyof food)[]
                  ).map((key, index) => (
                    <div key={index}>
                      <p>
                        {key}: {food['栄養'][key]}
                      </p>
                    </div>
                  ));
                })()}
              </div>
            );
          })}

        <Button text="食べた！" color="#3F8757" onClick={onClick} />
      </>
    )
  } else {
    return <Loading />
  };
}

export default MyPage2;
