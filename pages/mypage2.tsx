import type { NextPage } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/mypage2.module.css';
import { useState, useEffect } from 'react';
import { getTodayFood } from '../utils/get';
import { detailWithDate, food, food_tanni } from '../utils/types';
import Tabeta from 'tabeta.png';

import { deleteTodayFood } from '../utils/set';

import { useAuthContext } from '../utils/AuthContext';

import Button from '../atoms/Button';
import Loading from '../atoms/Loading';

const testUserId = 'Nw2N2cNhW2WaaVSgEcCZ';
export const food_unit: food_tanni = {
  カロリー: 'kcal',
  タンパク質: 'g',
  脂質: 'g',
  炭水化物: 'g',
  糖質: 'g',
  食物繊維: 'g',

  // ミネラル
  ナトリウム: 'mg',
  食塩相当量: 'g',
  カリウム: 'mg',
  カルシウム: 'mg',
  マグネシウム: 'mg',
  リン: 'mg',
  鉄: 'mg',
  亜鉛: 'mg',
  銅: 'mg',
  マンガン: 'mg',
  ヨウ素: 'μg',
  セレン: 'μg',
  クロム: 'μg',
  モリブデン: 'μg',

  // ビタミン
  ビタミンA: 'μg',
  betaカロテン: 'μg',
  ビタミンD: 'μg',
  ビタミンE: 'mg',
  ビタミンK: 'μg',
  ビタミンB1: 'mg',
  ビタミンB2: 'mg',
  ナイアシン: 'mg',
  ビタミンB6: 'mg',
  ビタミンB12: 'μg',
  葉酸: 'μg',
  パントテン酸: 'mg',
  ビオチン: 'μg',
  ビタミンC: 'mg',
};

const MyPage2: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [food_index, setIndex] = useState<number>(0);

  async function onLoad() {
    setIsLoading(true);
    if (user?.email && firebaseUser) {
      const res = await getTodayFood(firebaseUser);
      if (res) {
        setTodayFood(res);
      } else {
        router.push('/mypage');
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

  function indexreducer() {
    if (food_index != 0) {
      setIndex(food_index - 1);
    } else {
      return;
    }
  }

  function indexincreser() {
    if (todayFood != undefined) {
      let food_length: number = Object.keys(todayFood).length;
      if (food_index != food_length - 1) {
        setIndex(food_index + 1);
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    onLoad();
  }, [user]);

  if (todayFood != undefined && !isLoading) {
    return (
      <>
        <h1 className={styles.kyougohan}>今日のご飯はこれ！</h1>
        <div className={styles.fooddisplay}>
          <div className={styles.describe}>
            <p className={styles.foodname}>
              {todayFood['ご飯'][food_index]['名前']}
            </p>
            {((): ReactNode => {
              return (
                Object.keys(
                  todayFood['ご飯'][food_index]['栄養']
                ) as unknown as (keyof food)[]
              ).map((key, index) => (
                <div className={styles.foodeiyou} key={index}>
                  <p>
                    {key}: {todayFood['ご飯'][food_index]['栄養'][key]}
                    {food_unit[key]}
                  </p>
                </div>
              ));
            })()}
          </div>
          <div>
            <Image
              className={styles.photo}
              src={todayFood['ご飯'][food_index]['URL']}
              width={450}
              height={450}
              alt="飯"
            />
          </div>
          <button className={styles.left} onClick={indexreducer}>
            ^
          </button>
          <button className={styles.right} onClick={indexincreser}>
            ^
          </button>
        </div>
        <div className={styles.tabeta}>
          <Button
            text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;食べた！"
            color="#3F8757"
            onClick={onClick}
          />
          <img className={styles.tabetayo} src="/tabeta.png" />
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default MyPage2;
