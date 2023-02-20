import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageMains, setPageMains] = useState<foodDetail[]>([]);

  useEffect(() => {
    setPageMains(main.slice(currentPage * 10, currentPage * 10 + 10));
  }, [currentPage, main]);

  return (
    <>
      <div id="text" className={styles.wrapper}>
        <div className={styles.border1}></div>
        <h1 className={styles.tabetaimono}>今日は何の気分？</h1>
        <div className={styles.border2}></div>
        {!isLoading ? (
          <div className={styles.foodsWrapper}>
            {pageMains.map((detail, index) => (
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
            <div
              className={styles.left}
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev > 0 ? prev - 1 : prev;
                });
              }}
            >
              ^
            </div>
            <div
              className={styles.right}
              onClick={() => {
                setCurrentPage((prev) => {
                  return prev < main.length / 10 - 1 ? prev + 1 : prev;
                });
              }}
            >
              ^
            </div>
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
