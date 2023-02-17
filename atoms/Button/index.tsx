import type { NextPage } from 'next';
import styles from './Button.module.css';

type Props = {
  text: string;
  color?: string;
  onClick?: (e: any) => void;
};

const Button: NextPage<Props> = ({ text, color = '#3F5387', onClick }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className={styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
