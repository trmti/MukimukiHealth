import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';
import { UserType } from './AuthContext';
import { db } from './firebase';
import { idealNames, foodDetail, User, detailWithDate } from './types';

export async function createNewUser(email: string) {
  await setDoc(doc(db, 'User', email), {
    目標栄養素: { カロリー: 0, タンパク質: 0, 脂質: 0, 糖質: 0, 炭水化物: 0 },
  });
}

export async function deleteTodayFood(userId: string) {
  const ref = doc(db, 'User', userId);
  await updateDoc(ref, {
    次のご飯: deleteField(),
  });
}

export async function setFoodRecord(food: detailWithDate, userId: string) {
  const ref = doc(db, 'User', userId);
  const set = food['ご飯'].map((f) => f['名前']);

  console.log('set', set);
  await updateDoc(ref, {
    食事履歴: arrayUnion({
      日付: new Date(Date.now()),
      食べたもの: [...set],
    }),
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
  ideal: idealNames,
  foodTime: number
) {
  const ref = doc(db, 'User', userId);
  await updateDoc(ref, {
    一日の食事回数: foodTime,
    理想体型: ideal,
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
export async function setTodayFood(user: UserType, foods: foodDetail[]) {
  if (user?.email) {
    const ref = doc(db, 'User', user.email);
    await updateDoc(ref, {
      次のご飯: {
        日付: new Date(Date.now()),
        ご飯: foods.map((food) => doc(db, 'ご飯', food['名前'])),
      },
    });
  }
}
