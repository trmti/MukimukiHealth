import type { NextPage } from 'next';
import { useState } from 'react';
import ImageWithText from '../../atoms/ImageWithText';
import { foodDetail } from '../../utils/types';
import styles from './soup.module.css';
import Modal from '../../atoms/Modal';

type Props = {
  soup: foodDetail[];
  onClick: (detail: foodDetail) => Promise<void>;
};

const Home: NextPage<Props> = ({ soup, onClick }) => {
  const [selectedFoods, setSelectedFoods] = useState<foodDetail>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <p>
        理想体型に基づく摂取目標栄養素料をもとに
        <br />
        こちらの汁物をおすすめします
      </p>
      <p className={styles.text}>
        次は<span>汁物</span>から選ぶ
      </p>
      <div className={styles.foodWrapper}>
        {soup.map((detail, index) => (
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

export default Home;
