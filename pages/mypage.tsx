import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecords } from '../utils/get';
import { record } from '../utils/types';
import MypageTemp from '../moleculs/Mypage';
import { useAuthContext } from '../utils/AuthContext';
import { ideals } from '../utils/testData';

const MyPage: NextPage = () => {
  const { user, firebaseUser } = useAuthContext();
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
  const onClick = () => {
    router.push('/wannaEat');
  };
  useEffect(() => {
    updateFoodRecord();
  }, [user]);

  return (
    <>
      <MypageTemp
        isLoading={isLoading}
        foodRecords={foodRecords}
        onClick={onClick}
        src={(() => {
          if (firebaseUser) {
            const ideal = firebaseUser['理想体型'];

            if (ideal === '力士') {
              return ideals[0].url;
            } else if (ideal === 'ガチムチ') {
              return ideals[1].url;
            } else if (ideal === '普通') {
              return ideals[2].url;
            } else {
              return ideals[3].url;
            }
          } else {
            return '';
          }
        })()}
      />
    </>
  );
};

export default MyPage;
