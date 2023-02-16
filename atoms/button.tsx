import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Button: NextPage<{ color: string; text: string }> = ({ color, text }) => {
  return (
    <button style={{ backgroundColor: color }} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
