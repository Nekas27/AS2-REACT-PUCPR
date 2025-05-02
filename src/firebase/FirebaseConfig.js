import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Para autenticação
import { getFirestore } from "firebase/firestore";  // Para Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDkGqsjJfiSNdgJIYSXdkxidgyRyRnJsqA",
  authDomain: "projetinhoreact.firebaseapp.com",
  projectId: "projetinhoreact",
  storageBucket: "projetinhoreact.appspot.com",
  messagingSenderId: "918447305773",
  appId: "1:918447305773:web:4a0e4c9d3cece55b6eb4a4",
  measurementId: "G-MEPYDR0N1X"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
