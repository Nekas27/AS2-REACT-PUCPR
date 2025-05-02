import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Carregando dados do usuário...</p>;
  }

  return (
    <div>
      <h2>Bem-vindo ao Dashboard</h2>
      {userData ? (
        <div>
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
        </div>
      ) : (
        <p>Dados do usuário não encontrados.</p>
      )}
    </div>
  );
};

export default Dashboard;
