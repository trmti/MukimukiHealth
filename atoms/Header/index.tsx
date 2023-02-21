import type { NextPage } from 'next';
import styles from './index.module.css';

type Props = {
  text: string;
};

const Home: NextPage<Props> = ({ text }) => {
  return (
    <div className={styles.header}>
      <p>{text}</p>
      <div className={styles.textWrapper}>
        <h1 className={styles.text}>今日は何の気分？</h1>
      </div>
    </div>
  );
};

export default Home;
