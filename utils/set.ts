import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createNewUser(email: string) {
  await setDoc(doc(db, 'User', email), {}, { merge: true });
}

export async function deleteTodayFood(userId: string) {
  const ref = doc(db, 'User', userId);
  await updateDoc(ref, {
    次のご飯: deleteField(),
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
