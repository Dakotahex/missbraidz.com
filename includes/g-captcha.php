<?php

  function recaptchaTest()  {
    if(array_key_exists('submit_form',$_POST))
    {
      $public_key = "6LcTL7MjAAAAAI-kqtMfpPXgzwqITD-0Ze414DM2";
      $private_key = "6LcTL7MjAAAAACi8yteXhzSXKAHKGfIpDXeZq3Dx";
      $url = "https://www.google.com/recaptcha/api/siteverify";

      $response_key = $_POST['g-recaptcha-response'];
      $response = file_get_contents($url.'?secret='.$private_key.'&response='.$response_key.'&remoteip='.$_SERVER['REMOTE_ADDR']);
      $response = json_decode($response);

      return recaptchaSuccess($response);
    }
  }


  function recaptchaSuccess($response)
  {
    if($response->success == true)
    {
      // echo "Your Information was valid";
      return TRUE;
    }
  }

?>