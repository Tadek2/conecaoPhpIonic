<?php
include 'conexao.php'; // Arquivo de conexão com o banco de dados
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        // Consulta SQL para verificar se o usuário e senha correspondem
        $stmt = $conn->prepare("SELECT idusuarios, nome, email, password FROM usuarios WHERE nome = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];

            // Verifica se a senha fornecida corresponde à senha no banco de dados
            if (password_verify($password, $hashedPassword)) {
                echo json_encode(["message" => "Login bem-sucedido"]);
            } else {
                echo json_encode(["message" => "Credenciais inválidas"]);
            }
        } else {
            echo json_encode(["message" => "Usuário não encontrado"]);
        }
    } else {
        echo json_encode(["message" => "Dados ausentes. Insira 'username' e 'password'."]);
    }
}

$conn->close();
?>
