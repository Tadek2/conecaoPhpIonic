<?php
$hostname = 'localhost';
$username = 'root';
$password = 'xxxxx';
$dbname = 'json';
$dbport = 3306;

$conn = new mysqli($hostname, $username, $password, $dbname, $dbport);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Endpoint para receber os dados do cliente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados do cliente (supondo que estejam sendo enviados como JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados foram recebidos corretamente
    if (isset($data['nome']) && isset($data['email']) && isset($data['password'])) {
        $nome = $data['nome'];
        $email = $data['email'];
        $password = $data['password']; // Recebe a senha

        // Criptografando a senha antes de armazenar
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Execute uma instrução SQL para inserir os dados na sua tabela
        $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nome, $email, $hashedPassword); // Adiciona a senha criptografada
        $stmt->execute();

        // Confirmação de sucesso
        echo json_encode(["message" => "Dados inseridos com sucesso"]);

        // Consulta para obter o ID do último usuário inserido
        $result = $conn->query("SELECT idusuarios FROM usuarios ORDER BY idusuarios DESC LIMIT 1");
        $row = $result->fetch_assoc();
        $lastInsertedId = $row['idusuarios'];
        echo "ID do último usuário inserido: " . $lastInsertedId;
    } else {
        echo json_encode(["message" => "Dados ausentes. Insira 'nome', 'email' e 'password'."]);
    }
}
?>
