import type { NextPage } from "next";
import styles from "./Button.module.css";
import React from "react";

type Props = {
  text: React.ReactNode;
  color?: string;
  onClick?: (e: any) => void;
};

const Button: NextPage<Props> = ({ text, color = "#3F5387", onClick }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className={styles.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
