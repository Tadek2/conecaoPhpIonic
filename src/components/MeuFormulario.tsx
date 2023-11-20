import React, { useState } from "react";

const MeuFormulario = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const enviarDadosParaAPI = async () => {
    const dados = { nome, email };

    // console.log("Dados a serem enviados:", dados);

    try {
      const response = await fetch("http://localhost/testeJson/meusDados.php", {
        method: "POST",
        body: JSON.stringify(dados),
      });

      const responseData = await response.text();
      //   console.log("Resposta da API:", responseData);

      // Verifica se a resposta contém a mensagem de sucesso
      if (responseData.includes("Dados inseridos com sucesso")) {
        // console.log("Inserção bem-sucedida!");
      }

      // Tenta analisar a parte JSON da resposta (lista de usuários)
      const jsonStartPosition = responseData.indexOf("[");
      const jsonData = responseData.slice(jsonStartPosition);

      try {
        const usersData = JSON.parse(jsonData);
        // console.log("Dados dos usuários:", usersData);
      } catch (error) {
        // console.error("Erro ao analisar dados dos usuários:", error);
      }
    } catch (error) {
      //   console.error("Erro:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que o formulário seja submetido normalmente

    // console.log("Formulário submetido"); // Verifique se o evento de submissão está sendo acionado

    // Aqui você pode chamar a função para enviar os dados para a API
    enviarDadosParaAPI();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MeuFormulario;
