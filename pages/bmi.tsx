import type { NextPage } from "next";
import styles from "../styles/bmi.module.css";

const BMI: NextPage = () => {
  return (
    <div className={styles.all}>
      <h1>PHYSICALS</h1>
      <div className={styles.button}>
        <p>身長</p>
        <input placeholder="身長を入力してください。" />
        <p>体重</p>
        <input placeholder="体重を入力してください。" />
        <p>BMI</p>
        <input placeholder="BMI値を入力してください。。" />
      </div>
      <button>次へ進む</button>
    </div>
  );
};

export default BMI;
