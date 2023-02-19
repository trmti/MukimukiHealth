import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createNewUser(email: string) {
  await setDoc(doc(db, 'User', email), {});
}

export async function deleteTodayFood(userId: string) {
  const ref = doc(db, 'User', userId);
  await updateDoc(ref, {
    次のご飯: deleteField(),
  });
}

export async function setUserData(
  userId: string,
  weight: number,
  height: number,
  percentage: number
) {
  await updateDoc(doc(db, 'User', userId), {
    体重: weight,
    身長: height,
    体脂肪率: percentage,
  });
}

export async function setGoals(
  userId: string,
  calorie: number,
  protein: number,
  lipid: number,
  suger: number,
  carbohydrates: number,
  foodTime: number
) {
  const ref = doc(db, 'User', userId);
  await updateDoc(ref, {
    一日の食事回数: foodTime,
    目標栄養素: {
      カロリー: calorie,
      タンパク質: protein,
      脂質: lipid,
      糖質: suger,
      炭水化物: carbohydrates,
    },
  });
}

// テスト用の関数
export async function setTodayFood(userId: string) {
  const ref = doc(db, 'User', userId);

  await updateDoc(ref, {
    次のご飯: {
      日付: Date.now(),
      ご飯: [
        doc(db, 'ご飯', 'すし'),
        doc(db, 'ご飯', 'とんかつ'),
        doc(db, 'ご飯', 'オムライス'),
      ],
    },
  });
}
