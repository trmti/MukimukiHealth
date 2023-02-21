import type { NextPage } from 'next';
import { record } from '../../utils/types';
import Loading from '../../atoms/Loading';
import styles from './index.module.css';

type Props = {
  isLoading: boolean;
  foodRecords: record[];
  onClick: () => void;
};

const Mypage: NextPage<Props> = ({ isLoading, foodRecords, onClick }) => {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.M2H}>M2H</h1>
      </div>
      <div className={styles.nanitaberu}>
        <h1>なにたべる？</h1>
        <div>
          <button onClick={onClick}>
            <img src="Vector_restored.jpeg" width={250} height={70} />
          </button>
        </div>
      </div>

      {!isLoading ? (
        <div className={styles.wrapper}>
          <hr className={styles.border1} />
          {foodRecords.length !== 0 ? (
            <div>
              <h1 className={styles.rireki}>食事履歴</h1>
              <div className={styles.record}>
                {foodRecords.map((foodRecord, index) => {
                  const url = foodRecord['食べたもの'].find(
                    (detail) => detail['分類'] == 'メイン'
                  );
                  if (url) {
                    const background = 'url(' + url['URL'] + ')';
                    return (
                      <div
                        className={styles.eachDate}
                        key={index}
                        style={{ backgroundImage: background }}
                      >
                        <div className={styles.overlay}></div>
                        <div className={styles.detail}>
                          <p className={styles.date}>
                            {
                              foodRecord['日付']
                                .toDate()
                                .toLocaleString('ja-JP')
                                .split(' ')[0]
                            }
                          </p>
                          {foodRecord['食べたもの'].map((detail, index) => {
                            return (
                              <p className={styles.eachFood}>
                                {detail['名前']}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Mypage;
