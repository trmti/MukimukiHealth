import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';
import styles from '../../styles/menuSuggest.module.css';

import { food, foodDetail } from '../../utils/types';
import { getSuggests } from '../../utils/get';

const MenuSuggest: NextPage = () => {
  const router = useRouter();
  const [suggestFoods, setSuggestFoods] = useState<foodDetail[][]>();

  const { food_id } = router.query as { food_id: string };

  async function updateSuggest() {
    const suggests = await getSuggests(1, food_id);
    setSuggestFoods(suggests);
  }
  useEffect(() => {
    updateSuggest();
  });

  if (suggestFoods !== undefined) {
    return (
      <div className={styles.wrapper}>
        <h1>このような組み合わせはいかがですか？</h1>
        <div>
          {suggestFoods.map((suggestFood, index) => (
            <div className={styles.suggestWrapper} key={index}>
              <h1>{index + 1}</h1>
              <div className={styles.suggests}>
                {suggestFood.map((food, index) => (
                  <div key={index}>
                    <Image
                      src={food['URL']}
                      alt={food['名前']}
                      width={200}
                      height={200}
                    />
                    <h1>{food['名前']}</h1>
                    <div>
                      {((): ReactNode => {
                        return (
                          Object.keys(food['栄養']) as unknown as (keyof food)[]
                        ).map((key, index) => (
                          <div key={index}>
                            <p>
                              {key}: {food['栄養'][key]}
                            </p>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default MenuSuggest;
