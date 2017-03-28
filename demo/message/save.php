<?php
include './db.php';

$from = $_POST['from'];
if (!$from) {
	$from = "";
}
$content = $_POST['content'];
if (!$content) {
	$content = "";
}
$timestamp = $_POST['date'];
if (!$timestamp) {
	$timestamp = time();
}

error_log("INSERT INTO message (fromAddress,content,date) VALUES ('$from','$content','$timestamp')");

$result = runDBQuery("INSERT INTO message (fromAddress,content,date) VALUES ('$from','$content','$timestamp')");
error_log("db result:$result");
echo $result;
?>