<?php
# Put your config
$emailTo = "contato@9oficioniteroi.com";
$subject = "Pedido de Certidão";

# End your config
 
$name     =  $_POST['name'];
$email    =  $_POST['email'];
$telefone =  $_POST['phone'];

$tipo_certidao = $_POST['tipo'];
 
$message = '
----------------------------------------------------------------
O seguinte pedido de Certidão foi realizado:
----------------------------------------------------------------
|DADOS DE CONTATO|

Nome: ' . $name . '
E-mail: ' . $email . '
Telefone: ' . $telefone . '

|DADOS DA CERTIDAO|

Tipo de Certidão: ' . $tipo_certidao . '


|DETALHES|

' . $_POST['message'] . '

----------------------------------------------------------------';
 
mail(utf8_decode($emailTo), utf8_decode($subject), utf8_decode($message), utf8_decode($email)."\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\n");

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

echo "<script type='text/javascript'> 
alert('Insira um email válido.'); 
</script>"; 
echo "<script>window.history.back();</script>"; // Página que será redirecionada
}


else{

echo "<script type='text/javascript'> 
alert('Seu pedido foi realizado com sucesso!'); 
</script>"; 
echo "<script>window.history.back();</script>"; // Página que será redirecionada

}

?>
