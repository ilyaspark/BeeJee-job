<?php

require('../database.php');

$token = $_POST['token'];
$id = $_POST['id'];

// CHECK ADMIN

require('../models/CheckAdmin.php');


// EDIT STATUS

require('../models/EditTask.php');


$conn->close();


?>
