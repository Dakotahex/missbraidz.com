<?php
  include 'databaseconnect.php';
  $table = "website_queries";

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $message = $_POST['message'];

  //Database connection
  if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
  }else{
    $stmt = $conn->prepare("insert into website_qureies(firstName, lastName, message) values(?, ?, ?)");
    $stmt->bind_param("sss", $firtName, $lastName, $message);
    $stmt->execute();
    echo "Message sent!";
    $stmt->close();
    $conn->close();
  }

  // If subscribe was clicked also create user
?>