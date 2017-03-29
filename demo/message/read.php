<?php
include './db.php';

$result = runDBQuery('SELECT * FROM `message` ORDER BY `date` DESC LIMIT 20');
$emparray = array();
while($row = mysqli_fetch_array($result)){
	$emparray[] = array(
		'content' => $row['content'],
		'date' => $row['date'],
		'fromAddress' => $row['fromAddress'],
	);
}
$contentType = $_SERVER["CONTENT_TYPE"];
if ($contentType == "application/json") {
	echo json_encode($emparray);
	return ;
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Message</title>
	<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
	<style type="text/css">
		html,body,h1,h2{
			padding: 0;
			margin:0;
		}
		header{
			position: fixed;
			width: 100%;
			padding: 10px 0 10px;
			background: white;
			border-bottom: solid 1px #ccc;
		}
		header h1{
			text-align: center;
			font-size: 20px;
		}
		section{
			padding-top: 56px;
		}
		section dl{
			border-bottom: solid 1px #ccc;
			padding: 0 10px 5px;
			margin:0 0 10px;
		}
		section dl h2{
			font-size: 16px;
			display: inline-block;
		}
		section dl time{
			float: right;
		}
		section dd{
			margin-left:0;
			color: #999;
		}
	</style>
</head>
<body>
	<header>
		<h1>信息</h1>
	</header>
	<section id="list">
	</section>
</body>
<script type="text/javascript">

var prefixZero = function(num){
	return num > 9 ? num.toString() : '0'+num;
}

var timeFormat = function(date){
	let current = new Date();
	let shift = Math.round((current.getTime() - date.getTime())/1000);
	let isSameDate = current.getDate() == date.getDate();
	let isSameYear = current.getFullYear() == date.getFullYear();
	var returnString;

	if (shift < 60) {
		returnString = shift+'秒钟前';
	}else if( shift < 3600 ){
		returnString = Math.round(shift/60)+'分钟前';
	}else if( shift < 86400 ){
		returnString = prefixZero(date.getHours())+':'+prefixZero(date.getMinutes());
		if (!isSameDate) {
			returnString = prefixZero(date.getMonth()+1)+'/'+prefixZero(date.getDate())+' '+returnString;
		}
	}else{
		returnString = prefixZero(date.getMonth()+1)+'/'+prefixZero(date.getDate());
		if (!isSameYear) {
			returnString = date.getFullYear()+'/'+returnString
		}
	}
	return returnString;
};

var data = <?php echo json_encode($emparray)?>;
var index,length;
var htmlArray = [];
for(index = 0 , length = data.length ;index<length;++index ){
	let message = data[index];
	let date = new Date(+message.date);
	htmlArray.push(`
		<dl>
			<dt>
				<h2>${message.fromAddress}</h2>
				<time>${timeFormat(date)}</time>
			</dt>
			<dd>${message.content}</dd>
		</dl>`);
}
document.getElementById('list').innerHTML = htmlArray.join('');
</script>
</html>