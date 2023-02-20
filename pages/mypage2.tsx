import type { NextPage } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import styles from "../styles/mypage2.module.css";
import { useState, useEffect } from "react";
import { getTodayFood } from "../utils/get";
import { detailWithDate, food, food_tanni } from "../utils/types";
import Tabeta from "tabeta.png";

import { deleteTodayFood } from "../utils/set";

import { useAuthContext } from "../utils/AuthContext";

import Button from "../atoms/Button";
import Loading from "../atoms/Loading";

const testUserId = "Nw2N2cNhW2WaaVSgEcCZ";
export const food_unit: food_tanni = {
  カロリー: "kcal",
  タンパク質: "g",
  脂質: "g",
  炭水化物: "g",
  糖質: "g",
  食物繊維: "g",
};

const MyPage2: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [food_index, setIndex] = useState<number>(0);

  async function onLoad() {
    setIsLoading(true);
    if (user?.email && firebaseUser) {
      const res = await getTodayFood(firebaseUser);
      if (res) {
        setTodayFood(res);
      } else {
        router.push("/mypage");
      }
    }
    setIsLoading(false);
  }

  async function onClick() {
    if (user?.email) {
      await deleteTodayFood(user.email);
      router.push("/mypage");
    }
  }

  function indexreducer() {
    if (food_index != 0) {
      setIndex(food_index - 1);
    } else {
      return;
    }
  }

  function indexincreser() {
    if (todayFood != undefined) {
      let food_length: number = Object.keys(todayFood).length;
      if (food_index != food_length - 1) {
        setIndex(food_index + 1);
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    onLoad();
    setIsLoading(false);
  }, [firebaseUser]);

  if (todayFood != undefined && !isLoading) {
    return (
      <>
        {console.log(todayFood)}
        <h1 className={styles.kyougohan}>今日のご飯はこれ！</h1>
        <div className={styles.fooddisplay}>
          <div className={styles.describe}>
            <p className={styles.foodname}>
              {todayFood["ご飯"][food_index]["名前"]}
            </p>
            {((): ReactNode => {
              return (
                Object.keys(
                  todayFood["ご飯"][food_index]
                ) as unknown as (keyof food)[]
              ).map((key, index) => (
                <div className={styles.foodeiyou} key={index}>
                  <p>
                    {key}: {todayFood["ご飯"][food_index][key]}
                    {food_unit[key]}
                  </p>
                </div>
              ));
            })()}
          </div>
          <img
            className={styles.left}
            src="houkou.png"
            onClick={indexreducer}
          ></img>
          <div>
            <Image
              className={styles.photo}
              src={todayFood["ご飯"][food_index]["URL"]}
              width={450}
              height={450}
              alt="飯"
            />
          </div>
          <img
            className={styles.right}
            src="houkou.png"
            onClick={indexincreser}
          ></img>
        </div>
        <div className={styles.tabeta}>
          <Button text="食べた!" color="#3c8454" onClick={onClick} />
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};
export default MyPage2;
