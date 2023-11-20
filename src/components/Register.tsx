import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !email) {
      console.error("Por favor, preencha todos os campos");
      return;
    }
    try {
      const response = await fetch("http://localhost/testeJson/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: username, password, email }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      window.location.href = "/login"; // Redirecionamento após o registro bem-sucedido
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Erro ao registrar usuário:", error.message);
      } else {
        console.error("Erro ao registrar usuário: erro desconhecido");
      }
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
