import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/ideal.module.css';
import { useRouter } from 'next/router';
import { ideals } from '../utils/testData';
import Loading from '../atoms/Loading';
import { useState } from 'react';

const Ideal: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className={styles.wrapper}>
      <h1>あなたの理想の体型は？</h1>
      <div className={styles.idealWrapper}>
        {ideals.map((ideal) => (
          <div
            key={ideal.id}
            onClick={() => {
              router.push('/mypage');
            }}
          >
            <Image src={ideal.url} alt={ideal.name} width={380} height={270} />
            <h1>{ideal.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideal;
