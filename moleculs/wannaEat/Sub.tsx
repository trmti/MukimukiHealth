import type { NextPage } from 'next';
import Image from 'next/image';
import ImageWithText from '../../atoms/ImageWithText';
import styles from './sub.module.css';

import { foodDetail } from '../../utils/types';

type Props = {
  sub: foodDetail[];
  onClick: (detail: foodDetail) => void;
};

const Sub: NextPage<Props> = ({ sub, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <p>
        理想体型に基づく摂取目標栄養素料をもとに
        <br />
        こちらの副菜をおすすめします
      </p>
      <p className={styles.text}>
        次は<span>副菜</span>から選ぶ
      </p>
      <div className={styles.foodWrapper}>
        {sub.map((detail, index) => (
          <div
            key={index}
            onClick={() => onClick(detail)}
            className={styles.imageWrapper}
          >
            <ImageWithText food={detail} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sub;
