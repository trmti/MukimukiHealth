import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/wannaEat.module.css';
import { getAllFoods } from '../utils/get';
import { useRouter } from 'next/router';

import { useAuthContext } from '../utils/AuthContext';

import { detailWithId, foodDetail } from '../utils/types';
import Loading from '../atoms/Loading';

type variety = '主菜' | '副菜' | '汁物' | 'ご飯';
type Menus = {
  主菜?: foodDetail;
  副菜?: foodDetail;
  汁物?: foodDetail;
  ご飯?: foodDetail;
};

const WannaEat: NextPage = () => {
  const { firebaseUser } = useAuthContext();

  const [foods, setFoods] = useState<detailWithId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentVariety, setCurrentVariety] = useState<variety>('主菜');

  const [menu, setMenu] = useState<Menus>();

  const router = useRouter();

  const onLoad = async () => {
    setIsLoading(true);
    const res = await getAllFoods();
    setFoods(res);
    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  if (currentVariety === '主菜') {
    return (
      <div id="text" className={styles.wrapper}>
        <div className={styles.border1}></div>
        <h1 className={styles.tabetaimono}>食べたいものはなんですか？</h1>
        <div className={styles.border2}></div>
        {!isLoading ? (
          <div className={styles.foodsWrapper}>
            {foods.map(({ detail }, index) => (
              <div
                key={index}
                onClick={() => {
                  setMenu(() => ({ 主菜: detail }));
                  setCurrentVariety('副菜');
                }}
              >
                <Image
                  className={styles.graphy}
                  src={detail['URL']}
                  alt="力士"
                  width={200}
                  height={200}
                />
                <h1 className={styles.foodname}>{detail['名前']}</h1>
              </div>
            ))}
            <div className={styles.left}>^</div>
            <div className={styles.right}>^</div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  } else if (currentVariety === '副菜') {
    return <>{menu && menu['主菜'] ? <p>{menu['主菜']['名前']}</p> : <></>}</>;
  } else if (currentVariety === '汁物') {
    return <></>;
  } else if (currentVariety === 'ご飯') {
    return <></>;
  } else {
    return <></>;
  }
};

export default WannaEat;
