import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getTodayFood } from "../utils/get";
import { detailWithDate } from "../utils/types";
import { deleteTodayFood } from "../utils/set";

import { useAuthContext } from "../utils/AuthContext";

import Mypage2Temp from "../moleculs/Mypage2";
import Loading from "../atoms/Loading";

const MyPage2: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();

  const [todayFood, setTodayFood] = useState<detailWithDate>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [food_index, setIndex] = useState<number>(0);

  console.log(todayFood);

  async function onLoad() {
    setIsLoading(true);
    if (user?.email && firebaseUser) {
      const res = await getTodayFood(firebaseUser);
      if (user && res) {
        setTodayFood(res);
      } else {
        alert("mypageに移動します");
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
      <Mypage2Temp
        todayFood={todayFood}
        food_index={food_index}
        indexincreser={indexincreser}
        indexreducer={indexreducer}
        onClick={onClick}
      />
    );
  } else {
    return <Loading />;
  }
};
export default MyPage2;
