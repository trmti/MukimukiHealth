import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { todayFood, suggestFoods } from './testData';
import { detailWithId, foodDetail, record } from './types';


export async function getTodayFood(userId: number): Promise<foodDetail[]> {
  return todayFood;
}

export async function getSuggests(
  userId: number,
  foodId: string
): Promise<foodDetail[][]> {
  return suggestFoods;
}

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

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().食事履歴);
    return docSnap.data()["食事履歴"];
  } else {
    console.log("Userのidが見つかりません");
    return [];
  }
}
