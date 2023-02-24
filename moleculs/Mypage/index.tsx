import type { NextPage } from "next";
import { record } from "../../utils/types";
import Loading from "../../atoms/Loading";
import styles from "./index.module.css";
import { getSum } from "../../utils/utilFuncs";
import Logout from "../../pages/logout";

type Props = {
  isLoading: boolean;
  foodRecords: record[];
  onClick: () => void;
};

const Mypage: NextPage<Props> = ({ isLoading, foodRecords, onClick }) => {
  return (
    <>
      <div className={styles.top}>
        <h1 className={styles.mypage}>マイページ</h1>
        <div className={styles.logoutbtn}>
          <Logout />
        </div>
      </div>

      {!isLoading ? (
        <div className={styles.wrapper}>
          {foodRecords.length !== 0 ? (
            <div className={styles.total_flex}>
              <div className={styles.record}>
                <h2 className={styles.anatanosyokuji}>食事履歴</h2>
                {foodRecords.map((foodRecord, index) => {
                  const energy: number = Math.floor(
                    getSum(foodRecord["食べたもの"], "カロリー")
                  );
                  const tannpakusitu: number = Math.floor(
                    getSum(foodRecord["食べたもの"], "タンパク質")
                  );
                  const sisitu: number = Math.floor(
                    getSum(foodRecord["食べたもの"], "脂質")
                  );
                  const tanpakusitu: number = Math.floor(
                    getSum(foodRecord["食べたもの"], "炭水化物")
                  );
                  const url = foodRecord["食べたもの"].find(
                    (detail) => detail["分類"] == "メイン"
                  );
                  if (url) {
                    return (
                      <div key={index}>
                        <div className={styles.detail}>
                          <div className={styles.date}>
                            <p>
                              {
                                foodRecord["日付"]
                                  .toDate()
                                  .toLocaleString("ja-JP")
                                  .split(" ")[0]
                              }
                            </p>
                          </div>

                          <div className={styles.ryouri_flex}>
                            {foodRecord["食べたもの"].map((detail, index) => {
                              return (
                                <div key={index} className={styles.eachFood}>
                                  <img
                                    className={styles.image}
                                    src={detail["URL"]}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <table border={5} className={styles.tables}>
                            <tr>
                              <td>カロリー</td>
                              <td>{energy}kcal</td>
                            </tr>
                            <tr>
                              <td>タンパク質</td>
                              <td>{tannpakusitu}g</td>
                            </tr>
                            <tr>
                              <td>脂質</td>
                              <td>{sisitu}g</td>
                            </tr>
                            <tr>
                              <td>炭水化物</td>
                              <td>{tannpakusitu}g</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
              <img
                className={styles.human}
                src="rikishi.png"
                width={500}
                height={500}
              />
            </div>
          ) : (
            <></>
          )}
          <button onClick={onClick} className={styles.btn}>
            食べるものを決める!
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Mypage;
