import type { NextPage } from 'next';
import { app } from '../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from '../styles/logout.module.css';

const Logout: NextPage = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const handleLogout = async () => {
    // await signOut(auth);
    await router.push('/bmi');
  };
  return (
    <>
      <button className={styles.logout_btn} onClick={handleLogout}>
        シルエット選択
      </button>
    </>
  );
};

export default Logout;
