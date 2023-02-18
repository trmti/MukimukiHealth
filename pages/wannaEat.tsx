import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/wannaEat.module.css';
import { getAllFoods } from '../utils/get';
import { useRouter } from 'next/router';
import { detailWithId } from '../utils/types';

const WannaEat: NextPage = () => {
  const [foods, setFoods] = useState<detailWithId[]>([]);
  const router = useRouter();

  const onLoad = async () => {
    const res = await getAllFoods();
    setFoods(res);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>食べたいものは何ですか？</h1>
      <div className={styles.foodsWrapper}>
        {foods.map(({ id, detail }, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(`/menuSuggest/${id}`);
            }}
          >
            <Image src={detail['URL']} alt="力士" width={200} height={200} />
            <h1>{detail['名前']}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WannaEat;
