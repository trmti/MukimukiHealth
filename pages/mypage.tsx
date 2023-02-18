import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from '../utils/AuthContext';

const MyPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user?.email);
  }, [user]);

  return (
    <div>
      <h1>なにたべる？</h1>
      <button
        onClick={() => {
          router.push('/wannaEat');
        }}
      >
        食べるものを決める
      </button>
    </div>
  );
};

export default MyPage;
