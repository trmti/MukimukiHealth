import React, { useEffect, useState, useRef } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

function App() {
  const [users, setUser] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [fileName, setFileName] = useState('');
  const [excelData, setExcelData] = useState([]);
  const FileInput = useRef(null);
  useEffect(() => {
    const UserList = [];
    const UserData = collection(db, 'User');
    getDocs(UserData).then((snapShot) => {
      snapShot.forEach((docs) => {
        const doc = docs.data();
        UserList.push({
          id: docs.id,
          sibou: doc['体脂肪率'],
          weight: doc['体重'],
          his: doc['食事履歴'],
        });
      });
      // console.log(UserList[0].his)
      setUser(UserList);
    });

    const DishList = [];
    const DishData = collection(db, 'ご飯');
    getDocs(DishData).then((snapShot) => {
      snapShot.forEach((docs) => {
        const doc = docs.data();
        DishList.push({
          id: docs.id,
          url: doc['URL'],
          cal: doc['カロリー'],
          protein: doc['タンパク質'],
          main: doc['メイン'],
          kind: doc['分類'],
          name: doc['名前'],
          CH: doc['炭水化物'],
          sugar: doc['糖質'],
          green: doc['緑'],
          lipid: doc['脂質'],
          red: doc['赤'],
          yellow: doc['黄色'],
        });
      });
      setDishes(DishList);
    });
  }, []);

  const handleReadFile = (f) => {
    if (f) {
      setFileName(f.name);
      f.arrayBuffer().then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'buffer', bookVBA: true });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data);
      });
    }
  };

  const handleSubmit = async (D) => {
    await Promise.all(
      D.map(async (d) => {
        console.log(d);
        await setDoc(doc(db, 'ご飯', d['名前']), d);
      })
    );

    window.location.reload();
    return false;
  };

  return (
    <div className="App">
      <div>
        <strong>
          <strong>ユーザー</strong>
        </strong>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div align="left">ユーザーID: {user.id}</div>
            <div align="left">体脂肪率: {user.sibou}%</div>
            <div align="left">体重: {user.weight}kg</div>
          </li>
        ))}
      </ul>
      <div>
        <strong>
          <strong>ご飯</strong>
        </strong>
      </div>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <div align="left">名前: {dish.name}</div>
            <div align="left">URL: {dish.url}</div>
            <div align="left">分類: </div>
            <div align="left">メイン: {dish.main}</div>
            <div align="left">カロリー: {dish.cal}</div>
            <div align="left">タンパク質: {dish.protein}</div>
            <div align="left"></div>
            <div align="left"></div>
            <div align="left"></div>
            <div align="left"></div>
            <div align="left"></div>
          </li>
        ))}
      </ul>
      <div>
        <label>食事データのExcelファイルをアップロード...</label>
        <input
          name="File"
          type="file"
          accept=".xlsx"
          ref={FileInput}
          onChange={(e) => {
            e.preventDefault();
            handleReadFile(e.currentTarget.files[0]);
          }}
        />
        <button
          onClick={() => {
            handleSubmit(excelData);
          }}
        >
          登録
        </button>
      </div>
      <div>
        {excelData.map((d, index) => (
          <div key={index}>{JSON.stringify(d)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
