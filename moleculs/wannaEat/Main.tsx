import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { foodDetail } from '../../utils/types';
import ImageWithText from '../../atoms/ImageWithText';
import Array from '../../atoms/Array';

import styles from './main.module.css';
import Loading from '../../atoms/Loading';

type Props = {
  main: foodDetail[];
  isLoading: boolean;
  onClick: (detail: foodDetail) => void;
};

const Main: NextPage<Props> = ({ isLoading, main, onClick }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayFoods, setDisplayFoods] = useState<foodDetail[]>();

  const onClickLeft = () => {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onClickRight = () => {
    if (currentPage != Math.floor(main.length / 6)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setDisplayFoods(main.slice(currentPage * 6, currentPage * 6 + 6));
  }, [currentPage, main]);

  if (!isLoading) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.text}>
              まずは<span>メイン</span>から選ぶ
            </h1>
            <div className={styles.contents}>
              <Array rotate={180} onClick={onClickLeft} />
              <div className={styles.foodsWrapper}>
                {displayFoods?.map((food, index) => (
                  <div
                    className={styles.foods}
                    key={index}
                    onClick={() => {
                      onClick(food);
                    }}
                  >
                    <ImageWithText food={food} />
                  </div>
                ))}
              </div>
              <Array onClick={onClickRight} />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default Main;
