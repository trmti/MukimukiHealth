import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecords } from '../utils/get';
import { record } from '../utils/types';
import MypageTemp from '../moleculs/Mypage';
import { useAuthContext } from '../utils/AuthContext';

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
      />
    </>
  );
};

export default MyPage;
