import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/wannaEat.module.css';
import { getAllFoods, getSubFoodWithSort, getRiceVol } from '../utils/get';
import { useRouter } from 'next/router';

import { useAuthContext } from '../utils/AuthContext';

import { foodDetail } from '../utils/types';
import Loading from '../atoms/Loading';

type variety = 'メイン' | '副菜' | '汁物' | '提案';
type Menus = {
  メイン?: foodDetail;
  副菜?: foodDetail;
  汁物?: foodDetail;
  ご飯?: foodDetail;
};

const WannaEat: NextPage = () => {
  const { firebaseUser } = useAuthContext();

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

  const onLoad = async () => {
    setIsLoading(true);
    const res = await getAllFoods();
    setMain(res);
    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  if (currentVariety === 'メイン') {
    return (
      <div id="text" className={styles.wrapper}>
        <div className={styles.border1}></div>
        <h1 className={styles.tabetaimono}>食べたいものはなんですか？</h1>
        <div className={styles.border2}></div>
        {!isLoading ? (
          <div className={styles.foodsWrapper}>
            {main.map((detail, index) => (
              <div
                key={index}
                onClick={() => {
                  setMenu(() => ({ メイン: detail }));
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
    getSub();
    return (
      <div>
        <h1>副菜</h1>
        {sub.map((detail, index) => (
          <div
            key={index}
            onClick={() => {
              setMenu((prev) => {
                if (prev) return { メイン: prev['メイン'], 副菜: detail };
              });
              setCurrentVariety('汁物');
            }}
          >
            <Image src={detail['URL']} width={500} height={500} alt="ご飯" />
            <p>{detail['名前']}</p>
          </div>
        ))}
      </div>
    );
  } else if (currentVariety === '汁物') {
    getSoup();
    return (
      <div>
        <h1>汁物</h1>
        {soup.map((detail, index) => (
          <div
            key={index}
            onClick={async () => {
              setMenu((prev) => {
                if (prev)
                  return {
                    メイン: prev['メイン'],
                    副菜: prev['副菜'],
                    汁物: detail,
                  };
              });
              if (
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
                setCurrentVariety('提案');
              }
            }}
          >
            <Image src={detail['URL']} width={500} height={500} alt="ご飯" />
            <p>{detail['名前']}</p>
          </div>
        ))}
      </div>
    );
  } else if (currentVariety === '提案') {
    return <></>;
  } else {
    return <>エラー</>;
  }
};

export default WannaEat;
