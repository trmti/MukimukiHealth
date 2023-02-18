import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { todayFood, suggestFoods } from './testData';
import { detailWithId, foodDetail, record } from './types';
import firestore from "firebase/firestore";



export async function getTodayFood(userId: number): Promise<foodDetail[]> {
  return todayFood;
}

export async function getSuggests(
  userId: number,
  foodId: string
): Promise<foodDetail[][]> {
  return suggestFoods;
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



// export async function getTodayFood(userId: string): Promise<detailWithDate> {
//   const user = await getUser(userId);
//   const date = user['次のご飯']['日付'];
//   const ids = user['次のご飯']['ご飯'].map((food) => food.id) as string[];
//   const res = (await newData(ids, 'ご飯')) as foodDetail[];
//   console.log(res);
//   return { 日付: date, ご飯: res };
// }


export async function getAllFoods() {
  const querySnapshot = await getDocs(collection(db, 'ご飯'));
  const res: detailWithId[] = [];
  querySnapshot.forEach((doc) => {
    const detail = doc.data() as foodDetail;
    res.push({ id: doc.id, detail: detail });
  });

  return res;
}

export async function getIdeal(userId: number): Promise<number> {
  return 1;
}

export async function getFoodRecords(userId: number): Promise<record[]> {
  const docRef = doc(db, "User", "Nw2N2cNhW2WaaVSgEcCZ");
  const docSnap = await getDoc(docRef);
  const r: Array<record> = [];

  if (docSnap.exists()) {
    const foodRecords = docSnap.data()["食事履歴"] as record[];
    const res = await Promise.all(foodRecords.map(async (foodRecord) => {
      // @ts-ignore
      const ids = foodRecord["食べたもの"].map((food) => food.id) as string[];
      const res = (await newData(ids, 'ご飯')) as foodDetail[];
      // const date = foodRecord["日付"].toDate().toLocaleString('ja-JP').split(" ")[0]
      const date = foodRecord["日付"] as firestore.Timestamp;
      // console.log(r)
      r.push({ 日付: date, 食べたもの: res })
    }))
    return r;

  } else {
    console.log("Userが見つかりません");
    return [];
  }
}
