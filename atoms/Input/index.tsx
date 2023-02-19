import type { NextPage } from 'next';
import styles from './Input.module.css';

type Props = {
  label: string;
  placeholder?: string;
  password?: boolean;
  onChange?: (e: any) => void;
};

const Input: NextPage<Props> = ({
  label,
  placeholder = '',
  password = false,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <p>{label}</p>
      <input
        placeholder={placeholder}
        type={password ? 'password' : ''}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
