<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

// DB CONNECTION
$servername = "localhost";
$username = "s52300_dbuser";
$password = "shte:iy58PJ_dAfc";
$dbname = "s52300_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>