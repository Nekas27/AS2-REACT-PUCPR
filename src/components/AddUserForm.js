import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const AddUser = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Cria o documento no Firestore com dados adicionais
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email,
        isAdmin: false,  // Opcional, mas útil para controle de admins
      });

      setSuccess("Usuário cadastrado com sucesso!");
      setNome("");
      setSobrenome("");
      setDataNascimento("");
      setEmail("");
      setSenha("");
    } catch (err) {
      console.error("Detalhes do erro:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso. Tente outro.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else {
        setError(`Erro ao cadastrar usuário: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleCadastro}>
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
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
            placeholder="Senha (mínimo 6 caracteres)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddUser;
