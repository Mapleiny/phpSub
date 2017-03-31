<?php
include './db.php';

$username = $_POST['username'];
$pushtoken = $_POST['pushtoken'];
if ($username && $pushtoken) {
	echo runDBQuery("UPDATE `user` SET `pushtoken` = '$pushtoken' WHERE `username` = '$username'");
}else{
	echo "1";
}
?>