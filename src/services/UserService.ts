// userService.ts
class UserService {
  private apiUrl = "http://localhost/testeJson/meusDados.php";

  async getUsers(): Promise<any[]> {
    console.log("teste");
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("Resposta inválida do servidor:", data);
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw new Error("Erro ao buscar usuários");
    }
  }
}

export default UserService;
