<?php

$sql = "SELECT * FROM `bj_auth` WHERE `token` = '{$token}'";
$result = $conn->query($sql);
$num_rows = $result->num_rows;


if ($num_rows > 0) {
    echo "ok";
}
else {
    header("HTTP/1.1 500 Internal Server Error");
}


?>