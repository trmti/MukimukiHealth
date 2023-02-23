import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import Input from '../../atoms/Input';
import Button from '../../atoms/Button/';
import styles from './SignUpForm.module.css';

type Props = {
  onSubmit: (
    e: any,
    email: string,
    password: string,
    rePassword: string
  ) => Promise<void>;
};

const Form: NextPage<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  return (
    <div className={styles.wrapper}>
      <h1 >新規登録</h1>
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
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <Input
        label="パスワード(再入力)"
        password
        onChange={(e) => {
          setRePassword(e.currentTarget.value);
        }}
      />
      <Button
        text="登録"
        color='#343538'
        onClick={(e) => {
          return onSubmit(e, email, password, rePassword);
        }}
      />
      <Link
        href="/login"
        style={{ color: '#2F87D8', margin: '15px auto 5px', display: 'block' }}
      >
        ログインはこちら
      </Link>
    </div>
  );
};

export default Form;
