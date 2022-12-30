<?php

  $public_key = "6LcTL7MjAAAAAI-kqtMfpPXgzwqITD-0Ze414DM2";
  $private_key = "6LcTL7MjAAAAACi8yteXhzSXKAHKGfIpDXeZq3Dx";
  $url = "https://www.google.com/recaptcha/api/siteverify";


  function recaptchaTest()  {
    if(array_key_exists('submit_form',$_POST))
    {
      // echo "<pre>";print_r($_POST);echo "</pre>";
      $response_key = $_POST['g-recaptcha-response'];
      $response = file_get_contents($url.'?secret='.$private_key.'&response='.$response_key.'&remoteip='.$_SERVER['REMOTE_ADDR']);
      $response = json_decode($response);

      // echo "<pre>";print_r($response);echo "</pre>";

      if($response->success = 1)
      {
        // echo "Your Information was valid";
        return TRUE;
      }
      else
      {
        // echo "You are a robot and we don't like robots.";
        return FALSE;
      };
    };
  };

?>