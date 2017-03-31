<?php
include './db.php';


$result = runDBQuery('SELECT `username` FROM `user` WHERE ``')

$username = $_POST['username'];
$password = $_POST['password'];

hash("sha256", $password);

?>