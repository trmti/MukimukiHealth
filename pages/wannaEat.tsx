import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/wannaEat.module.css';
import { wannaEats } from '../utils/testData';
import { useRouter } from 'next/router';

const WannaEat: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h1>食べたいものは何ですか？</h1>
      <div className={styles.foodsWrapper}>
        {wannaEats.map((wannaEat, index) => (
          <div
            key={index}
            onClick={() => {
              router.push('/menuSuggest');
            }}
          >
            <Image src={wannaEat.url} alt="力士" width={200} height={200} />
            <h1>{wannaEat.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WannaEat;
