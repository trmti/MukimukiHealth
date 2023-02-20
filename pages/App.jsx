import React, { useEffect, useState, useRef } from 'react';
import { db } from '../utils/firebase';
import { setDoc, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

function App() {
  const [excelData, setExcelData] = useState([]);
  const FileInput = useRef(null);

  const handleReadFile = (f) => {
    if (f) {
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
        console.log('');
        const ref = doc(db, 'ご飯', d['名前']);
        console.log(ref);
        await setDoc(ref, d);
      })
    );

    window.location.reload();
    return false;
  };

  return (
    <div className="App">
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
        {excelData.map((d) => (
          <div>{JSON.stringify(d)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
