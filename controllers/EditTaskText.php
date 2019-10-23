<?php

require('../database.php');

$token = $_POST['token'];
$id = $_POST['id'];
$text = $_POST['text'];

// CHECK ADMIN

require('../models/CheckAdmin.php');


// EDIT STATUS

require('../models/EditTaskText.php');


$conn->close();


?>
