import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecord } from '../utils/get';
import { record } from '../utils/types';


const MyPage: NextPage = () => {
  const router = useRouter();
  const [foodRecords, setFoodRecords] = useState<record[]>();

  async function updateFoodRecord() {
    const foodRecords = await getFoodRecord(1);
    setFoodRecords(foodRecords);
  }
  useEffect(() => {
    updateFoodRecord();
  }, [])

  if (foodRecords !== undefined) {
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
          {foodRecords.map((foodRecord, index) => (
            <div>
              {index}
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
