<?php
$servername = "missbraidz.com";
$database = "u123456789_missbraidz";
$username = "u123456789_dakota";
$password = "Whitewero104#";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection

if (!$conn) {

    die("Connection failed: " . mysqli_connect_error());

}
echo "Connected successfully";
mysqli_close($conn);
?>