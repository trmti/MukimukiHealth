import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

import Main from '../moleculs/wannaEat/Main';
import Sub from '../moleculs/wannaEat/Sub';
import Soup from '../moleculs/wannaEat/Soup';

import { getSubFoodWithSort, getRiceVol, getFoodWithType } from '../utils/get';
import { setTodayFood } from '../utils/set';

import { useRouter } from 'next/router';

import { useAuthContext } from '../utils/AuthContext';

import { foodDetail } from '../utils/types';

type variety = 'メイン' | '副菜' | '汁物' | '提案';
type Menus = {
  メイン?: foodDetail;
  副菜?: foodDetail;
  汁物?: foodDetail;
  ご飯?: foodDetail;
};

const WannaEat: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [main, setMain] = useState<foodDetail[]>([]);
  const [sub, setSub] = useState<foodDetail[]>([]);
  const [soup, setSoup] = useState<foodDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentVariety, setCurrentVariety] = useState<variety>('メイン');

  const [menu, setMenu] = useState<Menus>();

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
    if (
      user &&
      firebaseUser &&
      menu &&
      menu['メイン'] &&
      menu['副菜'] &&
      menu['汁物']
    ) {
      const rice = await getRiceVol(firebaseUser, [
        menu['メイン'],
        menu['副菜'],
        menu['汁物'],
      ]);
      setMenu((prev) => {
        if (prev)
          return {
            メイン: prev['メイン'],
            副菜: prev['副菜'],
            汁物: prev['汁物'],
            主食: rice,
          };
      });
      await setTodayFood(user, [
        menu['メイン'],
        menu['副菜'],
        menu['汁物'],
        rice,
      ]);
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

  if (currentVariety === 'メイン') {
    return <Main main={main} isLoading={isLoading} onClick={onClickMain} />;
  } else if (currentVariety === '副菜') {
    getSub();
    return <Sub sub={sub} onClick={onClickSub} />;
  } else if (currentVariety === '汁物') {
    getSoup();
    return <Soup soup={soup} onClick={onClickSoup} />;
  } else {
    return <></>;
  }
};

export default WannaEat;
