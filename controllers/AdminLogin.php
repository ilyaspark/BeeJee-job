<?php

require('../database.php');

// GET POST DATA
$login = $_POST['login'];
$password = (string) $_POST['password'];

if($login !== 'admin' OR $password !== '123') {
    header("HTTP/1.1 500 Internal Server Error");
    die;
}

// INSERTING

require('../models/AdminLogin.php');

$conn->close();


?>
