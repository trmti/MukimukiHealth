import type { NextPage } from 'next';
import Image from 'next/image';
import { Menus } from '../../utils/types';
import styles from './index.module.css';

type Props = {
  selected?: Menus;
};

const Select: NextPage<Props> = ({ selected }) => {
  return (
    <div className={styles.wrapper}>
      <p>選択中</p>
      {selected ? (
        (Object.keys(selected) as (keyof typeof selected)[]).map(
          (key, index) => {
            if (key !== undefined && selected[key]) {
              return (
                <div key={index}>
                  <Image
                    //@ts-ignore
                    src={selected[key]['URL']}
                    width={300}
                    height={300}
                    alt="image"
                  />
                </div>
              );
            }
          }
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Select;
