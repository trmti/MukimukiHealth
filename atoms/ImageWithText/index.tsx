import type { NextPage } from 'next';
import Image from 'next/image';
import { foodDetail } from '../../utils/types';
import styles from './index.module.css';

type Props = {
  food: foodDetail;
};

const ImageWithText: NextPage<Props> = ({ food }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={food['URL']} alt="" />
      </div>
      <p>{food['名前']}</p>
      <p>{food['カロリー']} kcal</p>
    </div>
  );
};

export default ImageWithText;
