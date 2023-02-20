import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecords, getTodayFood } from '../utils/get';
import { record } from '../utils/types';
import Image from 'next/image';
import Loading from '../atoms/Loading';

import { useAuthContext } from '../utils/AuthContext';
import Logout from './logout';

const MyPage: NextPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [foodRecords, setFoodRecords] = useState<record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function updateFoodRecord() {
    setIsLoading(true);
    if (user?.email) {
      const foodRecords = await getFoodRecords(user.email);
      setFoodRecords(foodRecords);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    updateFoodRecord();
  }, [user])

  return (
    <div>
      <h1>なにたべる？</h1>
      <button
        disabled={isLoading}
        onClick={() => {
          router.push('/wannaEat');
        }}
      >
        食べるものを決める
      </button>
      <h1>食事履歴</h1>
      <div>
        {!isLoading && foodRecords.length !== 0 ? (
          foodRecords.map((foodRecord, index) => {
            return (
              <div key={index}>
                <h1>
                  {
                    foodRecord['日付']
                      .toDate()
                      .toLocaleString('ja-JP')
                      .split(' ')[0]
                  }
                </h1>
                {foodRecord['食べたもの'].map((detail, index) => (
                  <div key={index}>
                    <Image
                      src={detail['URL']}
                      alt={detail['名前']}
                      width={200}
                      height={200}
                    />
                    <h1>{detail['名前']}</h1>
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default MyPage;
