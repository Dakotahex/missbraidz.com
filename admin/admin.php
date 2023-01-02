<?php

include '../includes/dbh.php';

//Database connection
if($conn->connect_error){
  die('Connection Failed : '.$conn->connect_error);
}

$sql = "SELECT id, firstName, lastName, mobile, email, admin, subscribed, createdAt from users";

$result = $conn-> query($sql);

if ($result-> num_rows > 0) {
  while($row = $result-> fetch_assoc()) {
    echo "<tr><td>". $row["id"]."<tr><td>". $row["firstName"]."<tr><td>". $row["lastName"]."<tr><td>". $row["mobile"]."<tr><td>". $row["email"]."<tr><td>". $row["admin"]."<tr><td>". $row["subscribed"]."<tr><td>". $row["createdAt"]."<tr><td>";
  }
  echo "</table>";
}
else {
  echo "0 results";
}

$conn-> close();

?>