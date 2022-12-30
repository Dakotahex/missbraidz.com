<?php
  include_once 'dbh.php';
  include 'g-captcha.php';
  date_default_timezone_set('UTC');

  if (recaptchaTest() == TRUE)
  {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subscribe = intVal($_POST['subscribe?']);
    $createdAt = date('Y-m-d H:i:s');

    //Database connection
    if($conn->connect_error){
      die('Connection Failed : '.$conn->connect_error);
    }

    $sql = "INSERT INTO website_queries (firstName, lastName, email, createdAt, message, subscribed) VALUES ('$firstName', '$lastName', '$email', '$createdAt', '$message', $subscribe)";

    if (mysqli_query($conn, $sql)) {
      header("location: ../contact?message=successs");
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
  }
  else
  {
    echo "google captcha failed. Your message was not sent.";
  };

?>