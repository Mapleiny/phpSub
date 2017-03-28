<?php
function runDBQuery ($query){
	if (!$query) {
		return null;
	}
	$con = mysqli_connect("127.0.0.1","root","maple1105","sms");
	$result = null;
	if (!$con){
		die('Could not connect: '.mysqli_connect_error());
	}else{
		$result = mysqli_query($con,$query);
	}
	mysqli_close($con);

	return $result;
}
?>