import type { NextPage } from 'next';
import { useState } from 'react';
import ImageWithText from '../../atoms/ImageWithText';
import styles from './sub.module.css';
import Modal from '../../atoms/Modal';
import Filter from '../../atoms/Filter';

import { foodDetail, detailWithIsExceed } from '../../utils/types';

type Props = {
  sub: foodDetail[];
  isLoading: boolean;
  onClick: (detail: foodDetail) => void;
};

const Sub: NextPage<Props> = ({ sub, onClick }) => {
  const [selectedFoods, setSelectedFoods] = useState<foodDetail>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      {modalVisible ? <Filter /> : <></>}

      <p>
        理想体型に基づく摂取目標栄養素料をもとに
        <br />
        こちらの副菜をおすすめします
      </p>
      <p className={styles.text}>
        次は<span>副菜</span>から選ぶ
      </p>
      <div className={styles.foodWrapper}>
        {sub.map((detail, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedFoods(detail);
              setModalVisible(true);
            }}
            className={styles.imageWrapper}
          >
            <ImageWithText food={detail} />
          </div>
        ))}
      </div>
      {modalVisible ? (
        <Modal
          food={selectedFoods}
          onClickOk={() => {
            if (selectedFoods) onClick(selectedFoods);
            setModalVisible(false);
          }}
          onClickCancel={() => {
            setModalVisible(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sub;
