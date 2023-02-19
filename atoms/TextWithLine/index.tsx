import type { NextPage } from 'next';
import styles from './TextWithLine.module.css';

type Props = {
  text: string;
};

const TextWithLine: NextPage<Props> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.underLine}>{text}</h1>
    </div>
  );
};

export default TextWithLine;
