import type { NextPage } from "next";
import { foodDetail } from "../../utils/types";
import styles from "./index.module.css";

type Props = {
  food?: foodDetail;
  onClickOk?: () => void;
  onClickCancel?: () => void;
};

const Modal: NextPage<Props> = ({ food, onClickOk, onClickCancel }) => {
  if (food) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>これを選択していいですか？</p>
        <div className={styles.image}>
          <div className={styles.nutritions}>
            <p>エネルギー: {food["カロリー"]}kcal</p>
            <p>タンパク質: {food["タンパク質"]}g</p>
            <p>脂質: {food["脂質"]}g</p>
            <p>炭水化物: {food["炭水化物"]}g</p>
          </div>
          <img src={food["URL"]} />
        </div>
        <button onClick={onClickOk}>はい</button>
        <button onClick={onClickCancel}>いいえ</button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal;
