<?php
include("conexao.php");

if (isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['telefone']) && isset($_POST['endereco']) && isset($_POST['numero']) && isset($_POST['cep']) && isset($_POST['sexo']) && isset($_POST['senha']) && isset($_POST['Confirmarsenha'])) {

    $nome = mysqli_real_escape_string($conexao, $_POST['nome']);
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $telefone = mysqli_real_escape_string($conexao, $_POST['telefone']);
    $endereco = mysqli_real_escape_string($conexao, $_POST['endereco']);
    $numero = mysqli_real_escape_string($conexao, $_POST['numero']);
    $cep = mysqli_real_escape_string($conexao, $_POST['cep']);
    $sexo = mysqli_real_escape_string($conexao, $_POST['sexo']);
    $senha = mysqli_real_escape_string($conexao, $_POST['senha']);
    $confirmarSenha = mysqli_real_escape_string($conexao, $_POST['Confirmarsenha']);

    if ($senha === $confirmarSenha) {
        $senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nome, email, telefone, endereco, numero, cep, sexo, senha) VALUES ('$nome', '$email', '$telefone', '$endereco', '$numero', '$cep', '$sexo', '$senhaCriptografada')";

        if (mysqli_query($conexao, $sql)) {
            echo "<script>alert('Cadastro realizado com sucesso!'); window.location.href='login.html';</script>";
        } else {
            echo "Erro: " . $sql . "<br>" . mysqli_error($conexao);
        }
    } else {
        echo "As senhas não correspondem.";
    }
}

mysqli_close($conexao);
?>
