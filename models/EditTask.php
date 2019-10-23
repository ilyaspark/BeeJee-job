<?php

$sql =  "UPDATE `bj_tasks` SET `status` = 2 WHERE id = '{$id}'";

if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


?>