import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/wannaEat.module.css";
import { getAllFoods } from "../utils/get";
import { useRouter } from "next/router";
import { detailWithId } from "../utils/types";
import Loading from "../atoms/Loading";

const WannaEat: NextPage = () => {
  const [foods, setFoods] = useState<detailWithId[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onLoad = async () => {
    setIsLoading(true);
    const res = await getAllFoods();
    setFoods(res);
    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div id="text" className={styles.wrapper}>
      <div className={styles.border1}></div>
      <h1 className={styles.tabetaimono}>食べたいものはなんですか？</h1>
      <div className={styles.border2}></div>
      {!isLoading ? (
        <div className={styles.foodsWrapper}>
          {foods.map(({ id, detail }, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(`/menuSuggest/${id}`);
              }}
            >
              <Image
                className={styles.graphy}
                src={detail["URL"]}
                alt="力士"
                width={200}
                height={200}
              />
              <h1 className={styles.foodname}>{detail["名前"]}</h1>
            </div>
          ))}
          <div className={styles.left}>^</div>
          <div className={styles.right}>^</div>
        </div>
      ) : <Loading />}
    </div>
  );
};

export default WannaEat;
