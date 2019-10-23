<?php

require('../database.php');

// GET POST DATA
$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

if(empty($username) OR empty($email) OR empty($text)) {
    die;
}

// INSERTING

require('../models/AddTask.php');


$conn->close();



?>
