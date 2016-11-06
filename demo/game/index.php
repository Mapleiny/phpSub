<?
	if(isset($_GET['jump'])){
		header("Location: http://".str_replace('http://','',$_GET['jump']));
		exit;
	}
?>
<html>
<head>
	<title>Mapleiny's trick</title>
	<meta content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
</head>
<body>
<div class="container">
	<div>
		<label for="img-url">imgUrl:</label><input type="text" id="img-url">
	</div>
	<div>
		<label for="link">link:</label><input type="text" id="link">
	</div>
	<div>
		<label for="title">title:</label><input type="text" id="title">
	</div>
	<div>
		<label for="desc">desc:</label><input type="text" id="desc">
	</div>
	<div>
		<input type="button" id="button" value="确定">
	</div>
	<div>
		<textarea name="" id="" cols="30" rows="30"></textarea>
	</div>
</div>
</body>
<script type="text/javascript">
var $ = function(id){
	return document.getElementById(id);
},
	btn = $('button'),
	shareData = {};

btn.addEventListener('click',function(){
	shareData['imgUrl'] = $('img-url').value.replace('http://','');
	shareData['link'] = $('link').value.replace('http://','');
	shareData['title'] = $('title').value;
	shareData['desc'] = $('desc').value;
});


document.addEventListener("WeixinJSBridgeReady", function() {
	WeixinJSBridge && WeixinJSBridge.on("menu:share:timeline", function() {
		WeixinJSBridge.invoke("shareTimeline", {
			img_url: 'http://'+shareData['imgUrl'] || 'http://images.1758.com/images/wxicon.png',
			img_width:"640",
			img_height: "640",
			link: 'http://mapledemo.duapp.com/game/?jump=http://'+shareData['link'],
			desc: shareData['desc'] || "找出所有色块中颜色不同的一块。分享朋友圈，找到身边的色魔",
			title: shareData['title'] || '我闯过125关，击败100%的人！我是【孤独求色】！不服来战！'
		}, function(e){
		});
	});
});
</script>
</html>