import type { NextPage } from 'next';
import styles from './index.module.css';

type Props = {
  text: string;
  text2?: string;
};

const Home: NextPage<Props> = ({ text, text2 }) => {
  return (
    <div className={styles.header}>
      <p>{text}</p>
      <div className={styles.textWrapper}>
        <h1 className={styles.text}>{text2}</h1>
      </div>
    </div>
  );
};

export default Home;
