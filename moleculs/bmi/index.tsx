import type { NextPage } from 'next';
// import { useRouter } from 'next/router';

import { useState } from 'react';
// import { setUserData } from '../../utils/set';
// import { useAuthContext } from '../../utils/AuthContext';

import Button from '../../atoms/Button';
import styles from './bmi.module.css';

type Props = {
  onClick : (height: number, weight: number, percentage:number) => Promise<void>;
}

const Form : NextPage<Props> = ({ onClick,}) => {
  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(55);
  const [percentage, setPercentage] = useState<number>(15);
  return (
  <div className={styles.all}>
      <h1>PHYSICALS</h1>
      <div className={styles.button}>
        <p>身長(cm)</p>
        <input
          defaultValue={height}
          onChange={(e) => (setHeight(Number(e.currentTarget.value)))}
          type="number"
        />
        <p>体重(kg)</p>
        <input
          defaultValue={weight}
          type="number"
          onChange={(e) => (setWeight(Number(e.currentTarget.value)))}
        />
        <p>体脂肪率(%)</p>
        <input
          defaultValue={percentage}
          type="number"
          onChange={(e) => (setPercentage(Number(e.currentTarget.value)))}
        />
      </div>
      <Button text="次に進む" onClick={() => {onClick(height, weight, percentage)}} />
    </div>
  );
};

export default Form;