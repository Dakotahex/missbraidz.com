<?php

  function recaptchaTest()  {
    if(array_key_exists('submit_form',$_POST))
    {
      $public_key = "6LcTL7MjAAAAAI-kqtMfpPXgzwqITD-0Ze414DM2";
      $private_key = "6LcTL7MjAAAAACi8yteXhzSXKAHKGfIpDXeZq3Dx";
      $url = "https://www.google.com/recaptcha/api/siteverify";


      echo "<pre>";print_r($_POST);echo "</pre>";
      $response_key = $_POST['g-recaptcha-response'];

      echo "<pre>";print_r($private_key);echo "</pre>";
      echo "<pre>";print_r($url);echo "</pre>";

      $response = file_get_contents($url.'?secret='.$private_key.'&response='.$response_key.'&remoteip='.$_SERVER['REMOTE_ADDR']);
      echo "<pre>";print_r($response);echo "</pre>";

      $response = json_decode($response);
      echo "<pre>";print_r($response);echo "</pre>";

      echo "<pre>";print_r(recaptchaSuccess($response));echo "</pre>";
      return recaptchaSuccess($response);
    }
  };


  function recaptchaSuccess($response)
  {
    if($response->success == true)
    {
      // echo "Your Information was valid";
      return TRUE;
    }
  }

?>