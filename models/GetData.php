<?php

$sql = "SELECT * FROM bj_tasks";
$result = $conn->query($sql);
while($r=mysqli_fetch_object($result))
    {
        $res[]=$r;
    }

echo json_encode($res);

?>