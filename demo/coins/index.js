var findMin = function( key , history ){
	var count = 1000000,
		current = 0;
		value1 = parseInt( key / 2 ),
		value2 = key - value1,
		part = [];

	while( value1 < key ){
		if( value1 in history && value2 in history ){
			current = history[value1].length + history[value2].length;
			if( count > current ){
				count = current;
				part = [];
				part = part.concat( history[value1] , history[value2] );
			}
		}
		value1++;
		value2 = key - value1;
	}

	return part;
},findRule = function( coins , target ){
	var history = {},
		i , sum , key;
	for( i = 0 , sum = coins.length ; i < sum ; ++i ){
		history[coins[i]] = [coins[i]];
	}

	for( i = 1 ; i < target ; ++i ){
		if( ! ( i in history ) ){
			history[i] = findMin( i , history );
		}
	}
	return history;
	sum = 0;
	for( key in history ){
		sum += history[key].length;
	}
	return sum / ( target - 1 );
},addChange = function( list ){
	var arr = [],
		result = {},
		key , amount , sum ,
		finalPart1 , finalPart2,
		part1 , part2,
		oldCount = 0
		count = 0;
	for( key in list ){
		arr[key] = list[key].length;
	}
	for( amount = 1 , sum = arr.length ; amount < sum ; ++amount ){
		oldCount = count = arr[amount];
		finalPart1 = finalPart2 = 0;
		for( part1 = amount + 1 ; part1 < sum ; ++part1 ){
			part2 = part1 - amount;
			if( count > ( arr[part1] + arr[part2] ) ){
				count = arr[part1] + arr[part2];
				finalPart1 = part1;
				finalPart2 = part2;
			}
		}
		result[amount] = {
			count : count,
			part1 : finalPart1,
			part2 : finalPart2
		}
	}
	return result;
};
var $coins = $('#coins'),
	$amount = $('#amount'),
	$calculate = $('#calculate'),
	$resultDisplay = $('#result-display'),
	$statisticsDisplay = $('#statistics-display');
var resultDisplayFormat = '<table class="table table-bordered table-striped"><thead><tr><th rowspan="2">数额</th><th colspan="2">无找钱环节</th><th colspan="2">有找钱环节</th></tr><tr><th>组成方式</th><th>张数</th><th>组成方式</th><th>张数</th></tr></thead><tbody>{tbody}</tbody></table>',
	statisticsDisplayFormat = '<p class="text-info"><strong>无找钱环节</strong></p><p>总张数：{sum1}张</p><p>平均每个数额张数：{sum1}/{amount1}={average1}张</p><hr /><p class="text-info"><strong>有找钱环节</strong></p><p>总张数：{sum2}张</p><p>平均每个数额张数：{sum2}/{amount2}={average2}张</p>';
var calculate = function(){
	var number = 0,
		amount = 0,
		coins = [],
		result = null,
		changeResult = null;

	$coins.find('input[name="coins[]"]').each(function(){
		if( $(this).val() != '' ){
			number = parseInt($(this).val());
			if( isNaN(number) || number <= 0 ){
				alert('面值输入有误，请输入大于0的数字');
				return;
			}
			coins.push( number );
		}
	});

	amount = parseInt($amount.val());

	if( isNaN(number) || number <= 0 ){
		alert('数额输入有误，请输入大于0的数字');
		return;
	}
	result = findRule( coins , amount , changeResult );
	changeResult = addChange(result);
	display(result,amount,changeResult);

},display = function(result,amount,changeResult){
	var htmlArr = [],
		replace = {},
		sum1 = 0,
		sum2 = 0,
		conb1 = '',
		conb2 = '',
		temp = '',
		statistics = statisticsDisplayFormat,
		key,reg;

	for( key in result ){
		if( changeResult[key].part1 != 0 ){
			conb1 = result[changeResult[key].part1].join();
			conb2 = result[changeResult[key].part2].join();
			temp = key +'='+ changeResult[key].part1 +'('+ conb1 +') - '+ changeResult[key].part2 +'('+ conb2 +')';
		}else{
			temp = '' ;
		}
		htmlArr.push('<tr><td>'+key+'</td><td>'+ result[key].join() +'</td><td>'+ result[key].length +'</td><td>'+temp+'</td><td>'+ changeResult[key].count +'</td></tr>');
	}
	htmlArr = htmlArr.join('');
	$resultDisplay.html(resultDisplayFormat.replace('{tbody}',htmlArr));

	for( key in result ){
		sum1 += result[key].length;
	}

	for( key in changeResult ){
		sum2 += changeResult[key].count;
	}
	sum1 = sum1 - 1;
	sum2 = sum2 - 1;
	amount = amount - 1;
	replace = {
		sum2 : sum2,
		amount2 : amount,
		average2 : (sum2 / amount).toFixed(3),
		sum1 : sum1,
		amount1 : amount,
		average1 : (sum1 / amount).toFixed(3)
	};
	for( key in replace ){
		reg = new RegExp('{'+ key +'}','g');
		statistics = statistics.replace(reg,replace[key]);
	}

	$statisticsDisplay.html(statistics);
};


$calculate.on('click',function(){
	calculate();
});


$(function(){
	var coins = location.search.slice(1).split(',');
	$coins.find('input[name="coins[]"]').each(function(index,elem){
		if (coins.length > index) {
			$(this).val(coins[index]);
		}
	});
});

