import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecords, getTodayFood } from '../utils/get';
import { record } from '../utils/types';
import Image from 'next/image';
import Loading from '../atoms/Loading';
import styles from "../styles/mypage.module.css";
import { useAuthContext } from '../utils/AuthContext';
import Logout from './logout';

const MyPage: NextPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [foodRecords, setFoodRecords] = useState<record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function updateFoodRecord() {
    setIsLoading(true);
    if (user?.email) {
      const foodRecords = await getFoodRecords(user.email);
      setFoodRecords(foodRecords);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    updateFoodRecord();
  }, [user])

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.M2H}>M2H</h1>
      </div>

      {!isLoading && foodRecords.length !== 0 ?
        <div className={styles.wrapper}>
          <div className={styles.nanitaberu}>
            <h1>なにたべる？</h1>
            <div>
              <button
                onClick={() => {
                  router.push('/wannaEat');
                }}
              >
                <img src="Vector_restored.jpeg" width={250} height={70} />
              </button>
            </div>
          </div>
          <hr className={styles.border1} />
          <h1 className={styles.rireki}>食事履歴</h1>
          <div className={styles.record}>
            {foodRecords.map((foodRecord, index) => {
              const url = foodRecord['食べたもの'].find((detail) => detail["分類"] == "メイン")
              if (url) {
                const background = "url(" + url["URL"] + ")";
                return (
                  <div
                    className={styles.eachDate}
                    key={index}
                    style={{ backgroundImage: background }}
                  >
                    <div className={styles.overlay}></div>
                    <div className={styles.detail} >
                      <p className={styles.date}>
                        {
                          foodRecord['日付']
                            .toDate()
                            .toLocaleString('ja-JP')
                            .split(' ')[0]
                        }
                      </p>
                      {foodRecord['食べたもの'].map((detail, index) => {
                        return <p className={styles.eachFood}>{detail['名前']}</p>
                      })}
                    </div>
                  </div>
                )
              } else {
                return <></>
              }
            })}
          </div>
        </div> : <Loading />
      }
    </>
  );
}

export default MyPage;
