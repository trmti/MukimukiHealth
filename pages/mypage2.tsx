import type { NextPage } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { getTodayFood } from '../utils/get';
import { detailWithDate, food } from '../utils/types';

import Button from '../atoms/Button';
import Loading from '../atoms/Loading';

const testUserId = 'Nw2N2cNhW2WaaVSgEcCZ';

const MyPage2: NextPage = () => {
  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function onLoad() {
    setLoading(true);
    const res = await getTodayFood(testUserId);
    if (res) {
      setTodayFood(res);
    } else {
      router.push('/mypage');
    }
    setLoading(false);
  }

  async function onClick() {
    router.push('/mypage');
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <h1>今日のご飯はこれ！</h1>
      {!isLoading ? todayFood &&
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
        }) : <Loading />}

      <Button text="食べた！" color="#3F8757" onClick={onClick} />
    </>
  );
};

export default MyPage2;
