import Saudacao from "./components/Saudacao";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Busca os Dados
  const carregarUsuarios = async () => {
    try {
      const resposta = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error("Erro ao fazer a busca:", erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/usuarios", { nome, email });
      setNome("");
      setEmail("");
      carregarUsuarios();
    } catch (erro) {
      console.error("ERRO NO CADASTRO", erro);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Saudacao />
      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
