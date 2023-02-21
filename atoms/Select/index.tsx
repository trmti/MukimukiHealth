import type { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { foodDetail, nutritionTypes } from '../../utils/types';
import { getSum } from '../../utils/utilFuncs';
import styles from './index.module.css';

type Props = {
  selected?: foodDetail[];
};

const Select: NextPage<Props> = ({ selected = [] }) => {
  const [calorie, setCalorie] = useState<number>();
  const [protein, setProtein] = useState<number>();
  const [lipid, setLipid] = useState<number>();
  const [carbohydrate, setCarbohydrate] = useState<number>();

  useEffect(() => {
    setCalorie(Math.floor(getSum(selected, 'カロリー')));
    setProtein(Math.floor(getSum(selected, 'タンパク質')));
    setLipid(Math.floor(getSum(selected, '脂質')));
    setCarbohydrate(Math.floor(getSum(selected, '炭水化物')));
  }, [selected]);

  return (
    <div className={styles.wrapper}>
      <p>選択中</p>

      {selected?.map((food, index) => {
        return (
          <div key={index} className={styles.wrapper2}>
            <img
              //@ts-ignore
              src={food['URL']}
              alt="image"
            />
          </div>
        );
      })}
      <div>
        <p>カロリー: {calorie}</p>
        <p>タンパク質: {protein}</p>
        <p>脂質: {lipid}</p>
        <p>炭水化物: {carbohydrate}</p>
      </div>
    </div>
  );
};

export default Select;
