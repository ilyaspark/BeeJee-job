<?php

$sql = "INSERT INTO bj_tasks (username, email, text, status)
VALUES ('$name', '$email', '$text', '1')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


?>