<?
function runDBQuery ($query){
	if (!$query) {
		return null;
	}
	$con = mysql_connect("127.0.0.1","root","maple1105");
	$result = null;
	if (!$con){
		die('Could not connect: '.mysql_error());
	}else{
		mysql_select_db('sms',$con);
		$result = mysql_query($query);
	}
	mysql_close($con);

	return $result;
}
?>