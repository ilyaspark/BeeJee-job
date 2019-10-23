<?php

$sql =  "UPDATE `bj_tasks` SET `edited` = 1 WHERE id = '{$id}'";

if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql =  "UPDATE `bj_tasks` SET `text` = '{$text}' WHERE id = '{$id}'";

if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}



?>