import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/ideal.module.css';

const Ideal: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <Image src="/rikishi.png" alt="力士" width={380} height={270} />
      <h1>力士</h1>
    </div>
  );
};

export default Ideal;
