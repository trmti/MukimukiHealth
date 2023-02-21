import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';

import Select from '../atoms/Select';
import Header from '../atoms/Header';
import Button from '../atoms/Button';

import Main from '../moleculs/wannaEat/Main';
import Sub from '../moleculs/wannaEat/Sub';
import Soup from '../moleculs/wannaEat/Soup';

import { getSubFoodWithSort, getRiceVol, getFoodWithType } from '../utils/get';
import { setTodayFood } from '../utils/set';
import { useAuthContext } from '../utils/AuthContext';
import { foodDetail, Menus } from '../utils/types';

import styles from '../styles/wannaEat.module.css';

type variety = 'メイン' | '副菜' | '汁物' | '提案';

const WannaEat: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [main, setMain] = useState<foodDetail[]>([]);
  const [sub, setSub] = useState<foodDetail[]>([]);
  const [soup, setSoup] = useState<foodDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentVariety, setCurrentVariety] = useState<variety>('メイン');

  const [menu, setMenu] = useState<Menus>();

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
    if (firebaseUser && menu && menu['メイン']) {
      const data = await getSubFoodWithSort(
        firebaseUser,
        [menu['メイン']],
        '副菜',
        3
      );
      setSub(data);
    }
  };

  const getSoup = async () => {
    if (firebaseUser && menu && menu['メイン'] && menu['副菜']) {
      const data = await getSubFoodWithSort(
        firebaseUser,
        [menu['メイン'], menu['副菜']],
        '汁物',
        3
      );
      setSoup(data);
    }
  };

  const onClickMain = (detail: foodDetail) => {
    setMenu(() => ({ メイン: detail }));
    setCurrentVariety('副菜');
  };

  const onClickSub = (detail: foodDetail) => {
    setMenu((prev) => {
      if (prev) return { メイン: prev['メイン'], 副菜: detail };
    });
    setCurrentVariety('汁物');
  };

  const onClickSoup = async (detail: foodDetail) => {
    setMenu((prev) => {
      if (prev)
        return {
          メイン: prev['メイン'],
          副菜: prev['副菜'],
          汁物: detail,
        };
    });
    if (user && firebaseUser && menu && menu['メイン'] && menu['副菜']) {
      const rice = await getRiceVol(firebaseUser, [
        menu['メイン'],
        menu['副菜'],
        detail,
      ]);
      setMenu((prev) => {
        if (prev)
          return {
            メイン: prev['メイン'],
            副菜: prev['副菜'],
            汁物: detail,
            主食: rice,
          };
      });
      await setTodayFood(user, [menu['メイン'], menu['副菜'], detail, rice]);
      router.push('/mypage2');
    }
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <Header
            text={`${date[0]}/${date[1]}/${
              date[2].split('T')[0]
            }　${duration}飯`}
          />
          {((): ReactNode => {
            if (currentVariety === 'メイン') {
              return (
                <Main main={main} isLoading={isLoading} onClick={onClickMain} />
              );
            } else if (currentVariety === '副菜') {
              getSub();
              return <Sub sub={sub} onClick={onClickSub} />;
            } else if (currentVariety === '汁物') {
              getSoup();
              return <Soup soup={soup} onClick={onClickSoup} />;
            } else {
              return <></>;
            }
          })()}
        </div>
      </div>
      <div className={styles.rigtht}>
        <Select selected={menu} />
        <div className={styles.btnWrapper}>
          <button>次へ進む</button>
        </div>
      </div>
    </div>
  );
};

export default WannaEat;
