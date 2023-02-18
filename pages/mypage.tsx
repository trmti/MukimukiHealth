import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecords } from '../utils/get';
import { record } from '../utils/types';
import Image from 'next/image';


const MyPage: NextPage = () => {
  const router = useRouter();
  const [foodRecords, setFoodRecords] = useState<record[]>([]);

  async function updateFoodRecord() {
    const foodRecords = await getFoodRecords(1);
    setFoodRecords(foodRecords);
  }
  useEffect(() => {
    updateFoodRecord();
  }, [])

  if (foodRecords.length !== 0) {
    return (
      <div>
        <h1>なにたべる？</h1>
        <button
          onClick={() => {
            router.push('/wannaEat');
          }}
        >
          食べるものを決める
        </button>
        <h1>食事履歴</h1>
        <div>
          {foodRecords.map((foodRecord) => (
            <div>
              <h1>{foodRecord["日付"].toDate().toLocaleString('ja-JP').split(" ")[0]}</h1>

              {foodRecord.食べたもの.map((food) => {
                console.log(food)
                return <div>
                  <Image
                    src={food['URL']}
                    alt={food['名前']}
                    width={200}
                    height={200}
                  />
                  <h1>{food['名前']}</h1>
                </div>
              })}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}

export default MyPage;
