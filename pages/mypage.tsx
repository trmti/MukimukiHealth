import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFoodRecords, newData } from '../utils/get';
import { foodDetail, record } from '../utils/types';
import Image from 'next/image';
import Loading from '../atoms/Loading';


const MyPage: NextPage = () => {
  const router = useRouter();
  const [foodRecords, setFoodRecords] = useState<record[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function updateFoodRecord() {
    setLoading(true);
    const foodRecords = await getFoodRecords(1);
    setFoodRecords(foodRecords);
    setLoading(false);
  }

  useEffect(() => {
    updateFoodRecord();
  }, [])

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
      {!isLoading && foodRecords.length !== 0 ?
        <div>
          {foodRecords.map((foodRecord) => {
            console.log(foodRecord)
            return <div>
              <h1>{foodRecord["日付"].toDate().toLocaleString('ja-JP').split(" ")[0]}</h1>
              {foodRecord["食べたもの"].map((detail) => (
                <div>
                  <Image src={detail['URL']} alt={detail["名前"]} width={200} height={200} />
                  <h1>{detail['名前']}</h1>
                </div>
              ))}
            </div>
          })}
        </div>
        : <Loading />}
    </div>
  );
}

export default MyPage;
