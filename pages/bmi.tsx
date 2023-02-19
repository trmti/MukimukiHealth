import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { setUserData } from '../utils/set';
import { useAuthContext } from '../utils/AuthContext';

import Button from '../atoms/Button';
import styles from '../styles/bmi.module.css';

const BMI: NextPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(55);
  const [percentage, setPercentage] = useState<number>(15);

  const onClick = async () => {
    if (user?.email) {
      await setUserData(user.email, weight, height, percentage);
      router.push('/ideal');
    }
  };

  return (
    <div className={styles.all}>
      <h1>PHYSICALS</h1>
      <div className={styles.button}>
        <p>身長(cm)</p>
        <input
          defaultValue={height}
          onChange={(e) => {
            setHeight(Number(e.currentTarget.value));
          }}
          type="number"
        />
        <p>体重(kg)</p>
        <input
          defaultValue={weight}
          type="number"
          onChange={(e) => {
            setWeight(Number(e.currentTarget.value));
          }}
        />
        <p>体脂肪率(%)</p>
        <input
          defaultValue={percentage}
          type="number"
          onChange={(e) => {
            setPercentage(Number(e.currentTarget.value));
          }}
        />
      </div>
      <Button text="次に進む" onClick={onClick} />
    </div>
  );
};

export default BMI;
