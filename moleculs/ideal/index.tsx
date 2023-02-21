import type { NextPage } from 'next';
import Image from 'next/image';

import { ideals } from '../../utils/testData';
import { idealNames } from '../../utils/types';

import styles from './ideal.module.css';

type Props = {
  onClick : (name : idealNames) => Promise<void>;
}

const Option : NextPage<Props> = ({onClick}) => {
  return (
    <div className={styles.wrapper}>
      <h1>体型は自分の甘さの表れ。君は何者になるのか。</h1>
      <div className={styles.idealWrapper}>
      {ideals.map((ideal) => (
          <div
          key={ideal.id}
          onClick={async () => {
              await onClick(ideal.name);
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
}

export default Option;