<?php
  header('Content-type:text/json'); 
  $codes=array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
  $email = $password = $verify = 0;
  $emailErr=$passwordErr=$verifyErr=$str="";
  $type=0;//登入时0、1、2,分别代表用户名错误、登入成功、密码错误；注册时0、1分别表示用户名重复、注册成功。
  //创建验证码
  function createRandStr(){
      global $codes,$str;
      for($i=0;$i<4;$i++){
          $str.=$codes[rand(0,35)];
      }
  }
//注册验证
  function signup(){
      global $email,$password,$str,$type/*,$emailErr,$passwordErr,$verifyErr*/;
    /*  if($emailErr=="empty"||$verifyErr=="empty"||$passwordErr=="empty"){
          createRandstr();
          $a = array("type" =>$type ,"email" =>"$emailErr" ,"password" =>"$passwordErr","verify"=>"$verifyErr","str"=>"$str");
          echo json_encode($a);
          return;
      }*/
      $f=fopen("./msg.txt",'r');
      while(!feof($f)){
          $e=fgetcsv($f);
          if($e[0]==$email){
              fclose($f);
              // $emailErr="用户名已注册";
              $type=0;
              createRandstr();
              $a = array("type"=>$type,"str"=>"$str","email"=>"$email","sign"=>"$_POST[sign]");
              echo json_encode($a);
              return;
          }
      }
      $f=fopen("./msg.txt",'a');
      fwrite($f,$email.',');
      fwrite($f,$password."\r\n");
      fclose($f);
      $type=1;
      $a = array("type"=>$type,"str"=>"$str","email"=>"$email","sign"=>"$_POST[sign]");
      echo json_encode($a);
  }
  //登入验证
  function signin(){
      global $email,$password,$str;
      /*if($emailErr||$passwordErr){
          $str=createRandstr();
          $a = array("email" =>"$emailErr" ,"password" =>"$passwordErr","verify"=>"$verifyErr","str"=>"$str");
          echo json_encode($a);
          return;
      }*/
      $f=fopen("./msg.txt","r");
      while(!feof($f)){
          $e=fgetcsv($f);
          if( $e[0]==$email and $e[1]==$password){
              $type=1;
          }
          if($e[0]==$email and $e[1]!=$password){
              $type=2;
          }
        }
        createRandstr();
        $a = array("type"=>$type,"str"=>"$str","email"=>"$email","sign"=>"$_POST[sign]");
        echo json_encode($a);
        fclose($f);
  }
  function getData(){
      global  $emailErr,$passwordErr,$verifyErr,$email,$password,$verify;
      $emailErr = $passwordErr = $verifyErr = "";
      $email = $assword = $verify = "";
          if (empty($_POST["email"])) {
              $emailErr = "empty";
          } else {
              $email= test_input($_POST["email"]);
          }
          if (empty($_POST["password"])) {
              $passwordErr = "empty";
          } else {
              $password = test_input($_POST["password"]);
          }
          if (empty($_POST["verify"])) {
              $verifyErr = "empty";
          } else {
              $verify = test_input($_POST["verify"]);
          }
  }
 function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
 }
   function filter(){
       global $emailErr,$passwordErr,$verifyErr,$email,$password,$verify,$str;
      if($_SERVER['REQUEST_METHOD']=="POST"){
          getData();
          if($_POST["sign"]=="signup"){
              signup();
          }else if($_POST["sign"]=="signin"){
              signin();
          } 
      }else if($_SERVER['REQUEST_METHOD']=="GET"){
          createRandStr();
          echo $str;
           }
   }
  filter();
?>