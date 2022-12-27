<?php
  include_once 'includes/dbh.php';

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  //Database connection
  if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
  }

  $sql = "INSERT INTO website_queries (firstName, lastName, email, message) VALUES ('$firstName', '$lastName', '$email', '$message')";

  if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  mysqli_close($conn);

  // header("location: ../contact.html?message=successs")

  // If subscribe was clicked also create user
?>