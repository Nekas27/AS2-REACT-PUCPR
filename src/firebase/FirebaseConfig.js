// Importa as funções que você precisa do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Para autenticação
import { getFirestore } from "firebase/firestore";  // Para Firestore

// Configuração do seu app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkGqsjJfiSNdgJIYSXdkxidgyRyRnJsqA",
  authDomain: "projetinhoreact.firebaseapp.com",
  projectId: "projetinhoreact",
  storageBucket: "projetinhoreact.appspot.com",
  messagingSenderId: "918447305773",
  appId: "1:918447305773:web:4a0e4c9d3cece55b6eb4a4",
  measurementId: "G-MEPYDR0N1X"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Configuração do Firebase Auth (para login e cadastro de usuários)
const auth = getAuth(app);

// Configuração do Firestore (para armazenar os dados do usuário)
const db = getFirestore(app);

export { auth, db };
