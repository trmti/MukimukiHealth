import type { NextPage } from 'next';
import ImageWithText from '../../atoms/ImageWithText';
import { foodDetail, detailWithIsExceed } from '../../utils/types';
import styles from './rice.module.css';

type Props = {
  rice: foodDetail[];
  onClick: (detail: foodDetail) => Promise<void>;
};

const Home: NextPage<Props> = ({ rice, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <p>今日のあなたにピッタリのご飯の量はこちら</p>
      <div className={styles.foodWrapper}>
        {rice.map((detail, index) => (
          <div
            key={index}
            onClick={() => onClick(detail)}
            className={styles.imageWrapper}
          >
            <ImageWithText food={detail} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
