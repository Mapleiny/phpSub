<?
include './db.php';

$result = runDBQuery('SELECT * FROM `message` ORDER BY `date` DESC LIMIT 10');
$emparray = array();
while($row = mysql_fetch_array($result)){
	$emparray[] = array(
		'content' => $row['content'],
		'date' => $row['date'],
		'fromAddress' => $row['fromAddress'],
	);
}
echo(json_encode($emparray));
?>