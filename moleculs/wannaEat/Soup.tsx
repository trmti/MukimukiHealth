import type { NextPage } from 'next';
import ImageWithText from '../../atoms/ImageWithText';
import { foodDetail } from '../../utils/types';
import styles from './soup.module.css';

type Props = {
  soup: foodDetail[];
  onClick: (detail: foodDetail) => Promise<void>;
};

const Home: NextPage<Props> = ({ soup, onClick }) => {
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
