import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button/';
import styles from './LoginForm.module.css';

type Props = {
  onSubmit: (e: any, email: string, password: string) => Promise<void>;
};

const Form: NextPage<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.wrapper}>
      <Input
        label="メールアドレス"
        placeholder="sample@hoge.com"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <Input
        label="パスワード"
        password
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button
        text="ログイン"
        onClick={(e) => {
          return onSubmit(e, email, password);
        }}
      />

      <Link
        href="/signup"
        style={{ color: '#2F87D8', marginBottom: '50px', display: 'block' }}
      >
        新規登録はこちら
      </Link>
    </div>
  );
};

export default Form;
