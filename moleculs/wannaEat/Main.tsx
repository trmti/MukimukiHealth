import type { NextPage } from 'next';
import Image from 'next/image';
import { foodDetail } from '../../utils/types';
import styles from './main.module.css';
import Loading from '../../atoms/Loading';

type Props = {
  main: foodDetail[];
  isLoading: boolean;
  onClick: (detail: foodDetail) => void;
};

const Main: NextPage<Props> = ({ isLoading, main, onClick }) => {
  return (
    <>
      <div id="text" className={styles.wrapper}>
        <div className={styles.border1}></div>
        <h1 className={styles.tabetaimono}>食べたいものはなんですか？</h1>
        <div className={styles.border2}></div>
        {!isLoading ? (
          <div className={styles.foodsWrapper}>
            {main.map((detail, index) => (
              <div
                key={index}
                onClick={() => {
                  onClick(detail);
                }}
              >
                <Image
                  className={styles.graphy}
                  src={detail['URL']}
                  alt="力士"
                  width={200}
                  height={200}
                />
                <h1 className={styles.foodname}>{detail['名前']}</h1>
              </div>
            ))}
            <div className={styles.left}>^</div>
            <div className={styles.right}>^</div>
          </div>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </>
  );
};

export default Main;
