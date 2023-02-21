import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { setUserData } from '../utils/set';
import { useAuthContext } from '../utils/AuthContext';

import Button from '../atoms/Button';
import styles from '../styles/BMI.module.css';

const BMI: NextPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(55);
  const [percentage, setPercentage] = useState<number>(15);
  const [BMI, setBMI] = useState<number>(21.48);

  const onClick = async () => {
    if (user?.email) {
      await setUserData(user.email, weight, height, percentage);
      router.push('/ideal');
    }
  };

  useEffect(() => {
    const bmi = weight / (height * height) * 10000;
    setBMI((Math.round(bmi * 100)) / 100);
  }, [height, weight])

  return (
    <div className={styles.wrapper}>
      <h1>あなたのカラダのデータを教えてください</h1>
      <div className={styles.info}>
        <div className={styles.height}>
          <h1>身長</h1>
          <input
            defaultValue={height}
            type="number"
            style={{ textAlign: 'right' }}
            onChange={(e) => {
              setHeight(Number(e.currentTarget.value));
            }}
          />
          <h1>cm</h1>
        </div>
        <div className={styles.weight}>
          <h1>体重</h1>
          <input
            defaultValue={weight}
            type="number"
            style={{ textAlign: 'right' }}
            onChange={(e) => {
              setWeight(Number(e.currentTarget.value));
            }}
          />
          <h1>kg</h1>
        </div>
        <div className={styles.BMI}>
          <h1>BMI : {BMI}</h1>
        </div>
        {/* <input
          defaultValue={percentage}
          type="number"
          onChange={(e) => {
            setPercentage(Number(e.currentTarget.value));
          }}
        />
        <p>体脂肪率(%)</p> */}
      </div>
      <button className={styles.button} onClick={onClick}>次に進む</button>
    </div >
  );
};

export default BMI;
