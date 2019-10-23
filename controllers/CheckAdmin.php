<?php

require('../database.php');

$token = $_POST['token'];

require('../models/CheckAdmin.php');

$conn->close();


?>
