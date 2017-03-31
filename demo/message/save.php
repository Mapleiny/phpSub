<?php
include './db.php';
include './push.php';

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
	$timestamp = time()."000";
}
$result = runDBQuery("INSERT INTO message (fromAddress,content,date) VALUES ('$from','$content','$timestamp')");

$tokenResult = runDBQuery("SELECT `pushtoken` FROM `user` WHERE `username`='maple'");
$tokenArray = $tokenResult->fetch_row();

if (count($tokenArray)>0) {
	$pushtoken = $tokenArray[0];
}

if ($result&&$pushtoken) {
	$pushServer = new PushServer($pushtoken);
	$pushServer->sendMessage($from,$content);
}

mysqli_free_result($tokenResult);

?>