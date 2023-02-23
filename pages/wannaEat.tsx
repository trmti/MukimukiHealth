import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';

import Select from '../atoms/Select';
import Header from '../atoms/Header';

import Main from '../moleculs/wannaEat/Main';
import Sub from '../moleculs/wannaEat/Sub';
import Soup from '../moleculs/wannaEat/Soup';
import Rice from '../moleculs/wannaEat/Rice';

import { getSubFoodWithSort, getRiceVol, getFoodWithType } from '../utils/get';
import { setTodayFood } from '../utils/set';
import { useAuthContext } from '../utils/AuthContext';
import { foodDetail, User } from '../utils/types';

import styles from '../styles/wannaEat.module.css';
import Loading from '../atoms/Loading';

type variety = 'メイン' | '副菜' | '汁物' | 'ご飯';

const WannaEat: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [main, setMain] = useState<foodDetail[]>([]);
  const [sub, setSub] = useState<foodDetail[]>([]);
  const [soup, setSoup] = useState<foodDetail[]>([]);
  const [rice, setRice] = useState<foodDetail[]>([]);
  const [finish, setFinish] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentVariety, setCurrentVariety] = useState<variety>('メイン');

  const [menu, setMenu] = useState<foodDetail[]>([]);

  const timeConvertCriteria = [5, 10, 16];

  const now = new Date();
  const date = now.toISOString().split('-');
  const time = now.toISOString().split('T')[1];
  const hour = Number(time.split(':')[0]);
  let duration;

  if (hour > timeConvertCriteria[2]) {
    duration = '夜';
  } else if (hour > timeConvertCriteria[1]) {
    duration = '昼';
  } else if (hour > timeConvertCriteria[0]) {
    duration = '朝';
  } else {
    duration = '夜';
  }

  const router = useRouter();

  const getSub = async () => {
    if (firebaseUser && menu) {
      const data = await getSubFoodWithSort(firebaseUser, menu, '副菜', 3);
      setSub(data);
    }
  };

  const getSoup = async () => {
    if (firebaseUser && menu) {
      const data = await getSubFoodWithSort(firebaseUser, menu, '汁物', 3);
      setSoup(data);
    }
  };

  const onClickMain = (detail: foodDetail) => {
    setMenu((prev) => [...prev, detail]);
    setCurrentVariety('副菜');
  };

  const onClickSub = (detail: foodDetail) => {
    setMenu((prev) => [...prev, detail]);
    setCurrentVariety('汁物');
  };

  const onClickSoup = async (detail: foodDetail) => {
    setIsLoading(true);
    setMenu((prev) => [...prev, detail]);
    if (user && firebaseUser && menu) {
      const rice = await getRiceVol(firebaseUser, menu);
      setRice([rice]);
    }
    setCurrentVariety('ご飯');
    setIsLoading(false);
  };

  const onClickRice = async (detail: foodDetail) => {
    setIsLoading(true);
    if (user?.email) {
      onSnapshot(doc(db, 'User', user.email), (doc) => {
        const data = doc.data() as unknown as User;
        if (data['次のご飯']) {
          setFinish(true);
        }
      });
      console.log(menu);
      await setTodayFood(user, [...menu, detail]);
    }
    setIsLoading(false);
  };

  const onClickBack = () => {
    if (currentVariety == "メイン") {
      router.push('/mypage');
    } else if (currentVariety == "副菜") {
      menu.pop();
      setCurrentVariety("メイン")
    } else if (currentVariety == "汁物") {
      menu.pop();
      setCurrentVariety("副菜")
    } else if (currentVariety == "ご飯") {
      menu.pop();
      setCurrentVariety("汁物")
    }
    console.log(menu);
  };

  const onLoad = async () => {
    setIsLoading(true);
    const res = await getFoodWithType('メイン');
    setMain(res);
    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (finish) router.push('/mypage2');
  }, [finish]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {!isLoading ? (
          <div className={styles.leftContent}>
            <Header
              text={`${date[0]}/${date[1]}/${date[2].split('T')[0]
                }${duration}飯`}
              text2="今日は何の気分?"
            />
            {((): ReactNode => {
              if (currentVariety === 'メイン') {
                return (
                  <Main main={main} isLoading={isLoading} onClick={onClickMain} />
                );
              } else if (currentVariety === '副菜') {
                getSub();
                return <Sub sub={sub} isLoading={isLoading} onClick={onClickSub} />;
              } else if (currentVariety === '汁物') {
                getSoup();
                return <Soup soup={soup} onClick={onClickSoup} />;
              } else {
                return <Rice rice={rice} onClick={onClickRice} />;
              }
            })()}
            <button onClick={onClickBack}>戻る</button>
          </div>) : <Loading />}
      </div>
      <div className={styles.rigtht}>
        <Select selected={menu} />
      </div>
    </div>
  );
};

export default WannaEat;
