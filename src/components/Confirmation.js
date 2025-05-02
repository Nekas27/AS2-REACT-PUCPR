import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

const Confirmation = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleValidation = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

   
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Redireciona imediatamente para o dashboard
        navigate("/dashboard");
      } else {
        setError("Dados adicionais do usuário não encontrados.");
      }
    } catch (err) {
      console.error("Erro na validação:", err);

      // Lida com diferentes erros do Firebase
      if (err.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.");
      } else if (err.code === "auth/user-not-found") {
        setError("Email não encontrado. Verifique o email ou faça o cadastro.");
      } else {
        setError("Erro ao validar login. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Validação de Login</h2>
      <form onSubmit={handleValidation}>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Validando..." : "Validar Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Confirmation;
