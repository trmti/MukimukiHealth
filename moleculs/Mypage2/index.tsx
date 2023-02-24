import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { detailWithDate } from '../../utils/types';
import { getSum } from '../../utils/utilFuncs';

import Button from '../../atoms/Button';
import Header from '../../atoms/Header';
import ImageWithText from '../../atoms/ImageWithText';
import styles from './index.module.css';
import Loading from '../../atoms/Loading';

type Props = {
  todayFood: detailWithDate;
  onClick: () => Promise<void>;
};

const Mypage2: NextPage<Props> = ({ todayFood, onClick }) => {
  const [calorie, setCalorie] = useState<number>();
  const [protein, setProtein] = useState<number>();
  const [lipid, setLipid] = useState<number>();
  const [carbohydrate, setCarbohydrate] = useState<number>();

  useEffect(() => {
    setCalorie(Math.floor(getSum(todayFood['ご飯'], 'カロリー')));
    setProtein(Math.floor(getSum(todayFood['ご飯'], 'タンパク質')));
    setLipid(Math.floor(getSum(todayFood['ご飯'], '脂質')));
    setCarbohydrate(Math.floor(getSum(todayFood['ご飯'], '炭水化物')));
  }, [todayFood]);
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
  return (
    <>
      <Header
        text={`${date[0]}/${date[1]}/${date[2].split('T')[0]}　${duration}飯`}
        text2="今日の食事メニューはこちら！"
      />
      <div>
        <div className={styles.foodsWrapper}>
          {todayFood['ご飯'].map((food, index) => (
            <div className={styles.foodWrapper} key={index}>
              <ImageWithText food={food} />
            </div>
          ))}
        </div>
        <div className={styles.energies}>
          <p>エネルギー: {calorie}kcal</p>
          <p>タンパク質: {protein}g</p>
          <p>脂質: {lipid}g</p>
          <p>炭水化物: {carbohydrate}g</p>
        </div>
        <div className={styles.btnWrapper}>
          <Button text="食べた！" color="#6F6F6F" onClick={onClick} />
        </div>
      </div>
    </>
  );
};


export default Mypage2;
