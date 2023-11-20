import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost/testeJson/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const responseData = await response.text();

      if (responseData.includes("Login bem-sucedido")) {
        console.log("Login bem-sucedido!");
        window.location.href = "/meusdados"; // Redirecionar após o login
      } else {
        console.error("Credenciais inválidas");
      }
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Erro ao fazer login:", error.message);
      } else {
        console.error("Erro ao fazer login: erro desconhecido");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
