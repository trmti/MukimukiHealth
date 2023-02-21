import type { NextPage } from "next";
import { record } from "../../utils/types";
import Loading from "../../atoms/Loading";
import styles from "./index.module.css";

type Props = {
  isLoading: boolean;
  foodRecords: record[];
  onClick: () => void;
};

const Mypage: NextPage<Props> = ({ isLoading, foodRecords, onClick }) => {
  return (
    <>
      <div>
        <h1 className={styles.mypage}>マイページ</h1>
        <div></div>
      </div>

      {!isLoading ? (
        <div className={styles.wrapper}>
          {foodRecords.length !== 0 ? (
            <div className={styles.total_flex}>
              <div className={styles.record}>
                <h2 className={styles.anatanosyokuji}>食事履歴</h2>
                {foodRecords.map((foodRecord, index) => {
                  let energy: number = 0;
                  let tannpakusitu: number = 0;
                  let sisitu: number = 0;
                  let tannsuikabutu: number = 0;
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
                                    src={detail["URL"]}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              );
                            })}
                            {console.log(energy)}
                          </div>
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
            {console.log(foodRecords)}
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
