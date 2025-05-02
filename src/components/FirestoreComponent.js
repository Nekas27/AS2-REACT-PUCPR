import React, { useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig"; // Importando o Firestore
import { collection, getDocs } from "firebase/firestore";

const FirestoreComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios")); 
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Usuários Cadastrados</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Sobrenome:</strong> {user.sobrenome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreComponent;
