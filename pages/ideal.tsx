import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { setGoals } from '../utils/set';
import { ideals } from '../utils/testData';
import { idealNames, ideal } from '../utils/types';
import { useAuthContext } from '../utils/AuthContext';

import styles from '../styles/ideal.module.css';

const Ideal: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();
  const router = useRouter();

  const onClick = async (name: idealNames) => {
    console.log(name);
    if (user?.email && firebaseUser) {
      if (name === '力士') {
        await setGoals(user.email, 4000, 0, 0, 0, 0, 2);
      } else if (name == 'ガチムチ') {
        await setGoals(
          user.email,
          0,
          0.8 * firebaseUser['体重'],
          0,
          2.8 * firebaseUser['体重'],
          0,
          3
        );
      } else if (name === '普通') {
        await setGoals(user.email, 1060, 0, 0, 0, 0, 3);
      } else if (name === 'モデル') {
        const x = firebaseUser['体重'];
        const y = firebaseUser['体脂肪率'];
        const z = x - x * (y / 100);

        const p = 4.8 * z;
        const f = 2.4 * z;
        const c = 8.8 * z;

        const height = firebaseUser['身長'];

        const idealWeight = (height / 100) ** 2 * 17;
        const calorie = idealWeight * 34;

        await setGoals(user.email, calorie, p, f, 0, c, 3);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>体型は自分の甘さの表れ。君は何者になるのか。</h1>
      <div className={styles.idealWrapper}>
        {ideals.map((ideal) => (
          <div
            key={ideal.id}
            onClick={async () => {
              await onClick(ideal.name);
              router.push('/mypage');
            }}
            className={styles.image}
          >
            <Image src={ideal.url} alt={ideal.name} width={360} height={360} />
            <h1>{ideal.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideal;
