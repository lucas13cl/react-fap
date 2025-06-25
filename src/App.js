import Saudacao from "./components/Saudacao";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  // Busca os Dados
  const carregarUsuarios = async () => {
    try {
      const resposta = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar usuários:", erro);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Saudacao />
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
