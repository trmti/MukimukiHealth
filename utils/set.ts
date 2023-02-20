import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteField,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { idealNames } from './types';

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

// export async function updateDB() {
//   const querySnapshot = await getDocs(collection(db, 'ご飯'));
//   console.log(querySnapshot);
//   // @ts-ignore
//   const ls = [];
//   let n = {};
//   //@ts-ignore
//   querySnapshot.forEach((a: any) => {
//     const data = a.data();
//     const nutritions = data['栄養'];
//     // @ts-ignore
//     n[a.id] = nutritions;
//   });

//   await Promise.all(
//     // @ts-ignore
//     Object.keys(n).map(async (k) => {
//       const newDoc = doc(db, 'ご飯', k);
//       const nutritions = n[k];
//       console.log(nutritions);
//       // @ts-ignore
//       if (nutritions) {
//         await updateDoc(newDoc, {
//           栄養: deleteField(),
//           カロリー: nutritions['カロリー'],
//           タンパク質: nutritions['タンパク質'],
//           糖質: nutritions['糖質'],
//           炭水化物: nutritions['炭水化物'],
//           脂質: nutritions['脂質'],
//           赤: nutritions['赤'],
//           黄色: nutritions['黄色'],
//           緑: nutritions['緑'],
//         });
//       }
//     })
//   );
// }
