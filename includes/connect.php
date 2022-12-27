<?php
  include_once 'dbh.php';
  date_default_timezone_set('Australia/Perth');

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $subscribe = intVal($_POST['subscribe?']);
  $date = date('Y-m-d h:i:s');

  //Database connection
  if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
  }

  $sql = "INSERT INTO website_queries (firstName, lastName, email, message, date, subscribed) VALUES ('$firstName', '$lastName', '$email', '$message', '$date', $subscribe)";

  if (mysqli_query($conn, $sql)) {
    header("location: ../contact?message=successs");
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  mysqli_close($conn);
?>