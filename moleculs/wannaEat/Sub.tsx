import type { NextPage } from 'next';
import Image from 'next/image';
import { foodDetail } from '../../utils/types';

type Props = {
  sub: foodDetail[];
  onClick: (detail: foodDetail) => void;
};

const Sub: NextPage<Props> = ({ sub, onClick }) => {
  return (
    <div>
      <h1>副菜</h1>
      {sub.map((detail, index) => (
        <div key={index} onClick={() => onClick(detail)}>
          <Image src={detail['URL']} width={500} height={500} alt="ご飯" />
          <p>{detail['名前']}</p>
        </div>
      ))}
    </div>
  );
};

export default Sub;
