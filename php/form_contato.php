<?php
function console_log($output, $with_script_tags = true) {
  $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
  if ($with_script_tags) {
      $js_code = '<script>' . $js_code . '</script>';
  }
  echo $js_code;
}
# Put your config
$emailTo = "contato@9oficioniteroi.com";
$vname = "Cartorio 9 Oficio Niteroi";

# End your config
 
$name     =  $_POST['name'];
$email    =  $_POST['email'];
$telefone =  $_POST['phone'];
$subject  = 'Contato enviado por 9oficioniteroi.com';
 
$message = '
----------------------------------------------------------------
O teu site ' . $vname . '. Enviou o seguinte contato:
----------------------------------------------------------------
Nome: ' . $name . '
E-mail: ' . $email . '
Telefone: ' . $telefone . '
 
' . $_POST['message'] . '
----------------------------------------------------------------';
 
mail(utf8_decode($emailTo), utf8_decode($subject), utf8_decode($message), utf8_decode($email)."\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\n");
 
console_log($name, $email, $telefone)
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

echo "<script type='text/javascript'> 
alert('Insira um email válido.'); 
</script>"; 
echo "<script>location.href='contato.html'</script>"; // Página que será redirecionada
console_log('if')

}


else{

echo "<script type='text/javascript'> 
alert('Sua mensagem foi enviada com sucesso!'); 
</script>"; 

echo "<script>window.history.back();</script>"; // Página que será redirecionada
console_log('else')
}

?>
