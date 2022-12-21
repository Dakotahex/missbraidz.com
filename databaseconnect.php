<?php
$servername = "localhost";
$database = "u243262170_missbraidz";
$username = "u243262170_dakota";
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