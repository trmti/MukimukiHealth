import type { NextPage } from 'next';
import Image from 'next/image';
import { foodDetail } from '../../utils/types';

type Props = {
  soup: foodDetail[];
  onClick: (detail: foodDetail) => Promise<void>;
};

const Home: NextPage<Props> = ({ soup, onClick }) => {
  return (
    <div>
      <h1>汁物</h1>
      {soup.map((detail, index) => (
        <div
          key={index}
          onClick={() => {
            onClick(detail);
          }}
        >
          <Image src={detail['URL']} width={500} height={500} alt="ご飯" />
          <p>{detail['名前']}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
