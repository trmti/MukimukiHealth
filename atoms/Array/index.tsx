import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './index.module.css';
import React from 'react';

type Props = { rotate?: number; onClick?: () => void };

const Array: NextPage<Props> = ({ rotate = 0, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <Image
        src="/houkou.png"
        width={300}
        height={300}
        alt=""
        style={{ transform: `rotate(${rotate}deg)` }}
      />
      <p>もっと見る</p>
    </div>
  );
};

export default Array;
