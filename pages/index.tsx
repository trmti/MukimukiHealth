import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Link href="/login">ログイン</Link>
    </>
  );
};

export default Home;
