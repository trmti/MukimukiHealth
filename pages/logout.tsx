import type { NextPage } from 'next';
import { app } from '../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const Logout: NextPage = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const handleLogout = async () => {
    await signOut(auth);
    await router.push('/login');
  };
  return (
    <>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};

export default Logout;
