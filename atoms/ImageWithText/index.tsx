import type { NextPage } from 'next';
import { foodDetail } from '../../utils/types';
import styles from './index.module.css';

type Props = {
  food: foodDetail;
  exceed?: number[];
};

const ImageWithText: NextPage<Props> = ({ food, exceed = [] }) => {
  const frame = exceed.filter((e) => e < 0);
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.imgWrapper} ${
          frame.length > 0 ? styles.frame : ''
        }`}
      >
        <img src={food['URL']} alt="" />
      </div>
      <p>{food['名前']}</p>
      <p>{food['カロリー']} kcal</p>
    </div>
  );
};

export default ImageWithText;
