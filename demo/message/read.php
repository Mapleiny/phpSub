<?php
include './db.php';

$result = runDBQuery('SELECT * FROM `message` ORDER BY `date` DESC LIMIT 10');
$emparray = array();
while($row = mysqli_fetch_array($result)){
	$emparray[] = array(
		'content' => $row['content'],
		'date' => $row['date'],
		'fromAddress' => $row['fromAddress'],
	);
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Message</title>
	<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
	<style type="text/css">
		html,body,h1,h2{
			padding: 0;
			margin:0;
		}
		header{
			position: fixed;
			width: 100%;
			padding: 5px 0;
		}
		header h1{
			text-align: center;
			font-size: 20px;
		}
		section{
			padding-top: 30px;
		}
		section dl{
			border-bottom: solid 1px #ccc;
			padding: 0 10px;
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

var timeFormat = function(date){
	
};

var data = <?php echo json_encode($emparray)?>;
var index,length;
var htmlArray = [];
for(index = 0 , length = data.length ;index<length;++index ){
	let message = data[index];
	console.log(message);
	let date = new Date(+message.date);
	htmlArray.push(`
		<dl>
			<dt>
				<h2>${message.fromAddress}</h2>
				<time>${date.toString()}</time>
			</dt>
			<dd>${message.content}</dd>
		</dl>`);
}
document.getElementById('list').innerHTML = htmlArray.join('');
</script>
</html>