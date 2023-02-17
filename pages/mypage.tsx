import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const MyPage: NextPage = () => {
  const router = useRouter();

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
