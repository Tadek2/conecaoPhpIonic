import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";

interface User {
  idusuarios: number;
  nome: string;
  email: string;
  password: string;
}

const MeusDadosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const userService = new UserService();
        const fetchedUsuarios = await userService.getUsers();
        console.log(fetchedUsuarios);
        setUsuarios(fetchedUsuarios);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.idusuarios}>
            Nome: {usuario.nome} - Email: {usuario.email}
          </li>
        ))}
      </ul>
      {usuarios.length === 0 && <p>Nenhum usuário encontrado.</p>}
    </div>
  );
};

export default MeusDadosPage;
