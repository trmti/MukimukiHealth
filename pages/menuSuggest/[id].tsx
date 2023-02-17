import type { NextPage } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from '../../styles/menuSuggest.module.css';

import { food } from '../../utils/types';
import { foods } from '../../utils/testData';

const MenuSuggest: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>このような組み合わせはいかがですか？</h1>
      <div className={styles.suggestWrapper}>
        {foods.map((food, index) => (
          <div key={index}>
            <Image src={food.url} alt={food.name} width={200} height={200} />
            <h1>{food.name}</h1>
            <div>
              {((): ReactNode => {
                return (
                  Object.keys(food.nutrition) as unknown as (keyof food)[]
                ).map((key) => (
                  <div>
                    <p>
                      {key}: {food.nutrition[key]}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSuggest;
