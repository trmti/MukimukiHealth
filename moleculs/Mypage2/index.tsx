import type { NextPage } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { detailWithDate, food, food_tanni } from '../../utils/types';
import Button from '../../atoms/Button';
import styles from './index.module.css';

const food_unit: food_tanni = {
  カロリー: 'kcal',
  タンパク質: 'g',
  脂質: 'g',
  炭水化物: 'g',
  糖質: 'g',
  食物繊維: 'g',
};

type Props = {
  todayFood: detailWithDate;
  food_index: number;
  indexreducer: () => void;
  indexincreser: () => void;
  onClick: () => Promise<void>;
};

const Mypage2: NextPage<Props> = ({
  todayFood,
  food_index,
  indexreducer,
  indexincreser,
  onClick,
}) => {
  return (
    <>
      <h1 className={styles.kyougohan}>今日のご飯はこれ！</h1>
      <div className={styles.fooddisplay}>
        <div className={styles.describe}>
          <p className={styles.foodname}>
            {todayFood['ご飯'][food_index]['名前']}
          </p>
          {((): ReactNode => {
            return (
              Object.keys(
                todayFood['ご飯'][food_index]
              ) as unknown as (keyof food)[]
            ).map((key, index) => (
              <div className={styles.foodeiyou} key={index}>
                <p>
                  {key}: {todayFood['ご飯'][food_index][key]}
                  {food_unit[key]}
                </p>
              </div>
            ));
          })()}
        </div>
        <div>
          <Image
            className={styles.photo}
            src={todayFood['ご飯'][food_index]['URL']}
            width={450}
            height={450}
            alt="飯"
          />
        </div>
        <button className={styles.left} onClick={indexreducer}>
          ^
        </button>
        <button className={styles.right} onClick={indexincreser}>
          ^
        </button>
      </div>
      <div className={styles.tabeta}>
        <Button
          text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;食べた！"
          color="#3F8757"
          onClick={onClick}
        />
        <img className={styles.tabetayo} src="/tabeta.png" />
      </div>
    </>
  );
};

export default Mypage2;
