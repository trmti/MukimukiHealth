import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import firestore from 'firebase/firestore';
import { db } from './firebase';
import {
  foodDetail,
  detailWithDate,
  User,
  record,
  foodTypes,
  nutritionTypes,
} from './types';

export async function getUser(userId: string): Promise<User> {
  const querySnapshot = await getDoc(doc(db, 'User', userId));
  const res = querySnapshot.data() as User;
  return res;
}

export async function newData(ids: string[], collectionName: string) {
  const res = await Promise.all(
    ids.map(async (id) => {
      const newDoc = await getDoc(doc(db, collectionName, id));
      return newDoc.data();
    })
  );

  return res;
}

export async function getTodayFood(user: User): Promise<detailWithDate | null> {
  if (user && user['次のご飯']) {
    const date = user['次のご飯']['日付'];
    const ids = user['次のご飯']['ご飯'].map((food) => food.id);
    const res = (await newData(ids, 'ご飯')) as foodDetail[];
    return { 日付: date, ご飯: res };
  } else {
    return null;
  }
}


export async function getOnlyTodayFood(user: User): Promise<detailWithDate | null> {
  if (user && user['次のご飯']) {
    const date = user['次のご飯']['日付'];
    const ids = user['次のご飯']['ご飯'].map((food) => food.id);
    const res = (await newData(ids, 'ご飯')) as foodDetail[];
    return { 日付: date, ご飯: res };
  } else {
    return null;
  }
}


function getDiff(a: number, b: number): number {
  if (b !== 0 && a < b) {
    return a / b;
  } else {
    return 0;
  }
}

export async function getFoodWithType(type: foodTypes): Promise<foodDetail[]> {
  const allFood = await getAllFoods();
  const res = allFood.filter((food) => food['分類'] === type);
  return res;
}

// compareFoodsのご飯を考慮しておかずを提案。
export async function getSubFoodWithSort(
  user: User,
  compareFoods: foodDetail[],
  type: foodTypes,
  count: number
): Promise<foodDetail[]> {
  const ideals = user['目標栄養素'];
  const nutritionCandidate: nutritionTypes[] = [
    'カロリー',
    'タンパク質',
    '脂質',
    '炭水化物',
  ];
  let nutritions = {
    カロリー: 0,
    タンパク質: 0,
    脂質: 0,
    糖質: 0,
    炭水化物: 0,
  };
  compareFoods.map((food) => {
    nutritionCandidate.forEach((n) => {
      // @ts-ignore
      nutritions[n] += food[n];
    });
  });
  let arr: number[] = [];

  nutritionCandidate.map((n) => {
    arr.push(getDiff(nutritions[n], ideals[n]));
  });

  const maxIndex = arr.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  const sortBy = nutritionCandidate[maxIndex];
  const filteredFood = await getFoodWithType(type);
  const res = filteredFood
    //@ts-ignore
    .sort((a, b) => a[sortBy] - b[sortBy])
    .slice(0, count);

  return res;
}

export async function getRiceVol(user: User, foods: foodDetail[]) {
  let ideal_cal = user['目標栄養素']['カロリー'];
  const AllFoods = await getAllFoods();

  const L_RICE = AllFoods.filter((food) => food['名前'] == 'ご飯（大）')[0];
  const M_RICE = AllFoods.filter((food) => food['名前'] == 'ご飯（中）')[0];
  const S_RICE = AllFoods.filter((food) => food['名前'] == 'ご飯（小）')[0];

  // @ts-ignore
  foods.forEach((food) => (ideal_cal -= food['カロリー']));

  // @ts-ignore
  if (ideal_cal > L_RICE['カロリー']) {
    return L_RICE;
    //@ts-ignore
  } else if (ideal_cal > M_RICE['カロリー']) {
    return M_RICE;
  } else {
    return S_RICE;
  }
}

export async function getAllFoods() {
  const querySnapshot = await getDocs(collection(db, 'ご飯'));
  const res: foodDetail[] = [];
  querySnapshot.forEach((doc) => {
    const detail = doc.data() as foodDetail;
    res.push(detail);
  });

  return res;
}

export async function getFoodRecords(userId: string): Promise<record[]> {
  const docRef = doc(db, 'User', userId);
  const docSnap = await getDoc(docRef);
  const r: Array<record> = [];

  if (docSnap.exists()) {
    const foodRecords = docSnap.data()['食事履歴'] as record[];
    if (foodRecords) {
      await Promise.all(
        foodRecords.map(async (foodRecord) => {
          const ids = foodRecord['食べたもの'].map(
            // @ts-ignore
            (food) => food.id) as string[];
          const res = (await newData(ids, 'ご飯')) as foodDetail[];
          const date = foodRecord['日付'] as firestore.Timestamp;
          r.push({ 日付: date, 食べたもの: res });
        })
      );
    }
    return r;
  } else {
    console.log('Userが見つかりません');
    return [];
  }
}
