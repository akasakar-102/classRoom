import React, { useState, useEffect } from 'react';
import { RegistrantList } from './RegistrantList';
import { RegistrationForm } from './RegistrationForm';
import { db } from './firebase'; // Firebaseのインポート
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [registrants, setRegistrants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  

  // Firestoreからデータを読み込む
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "registrants"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrants(data);
    };

    fetchData();
  }, []);

  // Firestoreにデータを保存
  const handleAddRegistrant = async (newRegistrant) => {
    await addDoc(collection(db, "registrants"), newRegistrant);
    setRegistrants([...registrants, newRegistrant]);
    setShowForm(false);
  };

  // Firestoreからデータを削除
  const handleDeleteRegistrant = async (id) => {
    await deleteDoc(doc(db, "registrants", id));
    setRegistrants(registrants.filter((registrant) => registrant.id !== id));
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {showForm ? (
        <div className="flex w-full max-w-[1500px]">
          <button
              onClick={() => setShowForm(false)}
              className="px-4 py-1 rounded-md hover:bg-gray-300 transition duration-300"
          >
          {"<"} 戻る
          </button>
        </div>
      ):(<div className="h-[32px]"></div>)}
        <div className="bg-white shadow-md rounded-lg p-6 w-full w-full max-w-[1500px] min-h-[800px]">
          {showForm ? (
            <RegistrationForm addRegistrant={handleAddRegistrant} />
          ) : (
            <RegistrantList registrants={registrants} onAddNew={() => setShowForm(true)} onDeleteRegistrant={handleDeleteRegistrant}/>
          )}
        </div>
      </div>
  )
}

export default App;