import React, { useEffect, useState } from "react";
import axios from "axios";
import Saudacao from "./components/Saudacao";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const carregarUsuarios = async () => {
    try {
      const resposta = await axios.get("http://localhost:5000/usuarios");
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error("ERRO NA BUSCA:", erro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`http://localhost:5000/usuarios/${editandoId}`, {
          nome,
          email,
        });
        setEditandoId(null);
      } else {
        await axios.post("http://localhost:5000/usuarios", { nome, email });
      }
      setNome("");
      setEmail("");
      carregarUsuarios();
    } catch (erro) {
      console.error("ERRO AO SALVAR:", erro);
    }
  };

  const editarUsuario = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditandoId(usuario.id);
  };

  const excluirUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      carregarUsuarios();
    } catch (erro) {
      console.error("ERRO AO EXCLUIR:", erro);
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
        <button type="submit">{editandoId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
            <button onClick={() => editarUsuario(usuario)}>Editar</button>
            <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
