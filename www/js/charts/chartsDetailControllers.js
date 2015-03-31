/**
 * Created by taejun on 2015-03-31.
 */
angular.module('r2bis.charts.detail', [])
.controller('ChartsDetailCtrl', function($scope, $http, $ionicLoading, searchParam) {

	// 검색 조건 // chartsService 통해서 컨트롤러 사이 통신
	var param = searchParam.getParam();

	$ionicLoading.show({
		template: 'Loading...'
	});

	$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesTopGroup", JSON.stringify(param))
	.success(function(data, status) {
		var re = /상위그룹/gi;
		var changeStr =	data.d.replace(re,'target');

		var parseData = JSON.parse(changeStr);

		if (status == 200) {
			$scope.showGraph(parseData);
			//sale json data
			$scope.saleList = parseData;

			$ionicLoading.hide()
		} else {
			$scope.showAlert(parseData.message);
			$ionicLoading.hide();
		}
	})
	.error(function(data, status) {
		console.log("Error " + data + " " + status);
		$ionicLoading.hide();
	});

	$scope.showGraph = function(parseData) {
		var names = [];
		var values = [];
		var maxVal = 0;

		for (var i= 1, len = parseData.length; i<len; i++)
		{
			//if ($("#searchType").val() == "grp")names.push(parseData[i].상위그룹);
			//else if ($("#searchType").val() == "man") names.push(parseData[i].매니저명);
			//else if ($("#searchType").val() == "sub") names.push(parseData[i].소속명);
			names.push(parseData[i].target);
			values.push(parseData[i].KT);

			if (parseData[i].KT > maxVal) maxVal = parseData[i].KT;
		}

		var options = {
			'legend': {
				names: names,
				hrefs: []
			},
			'dataset': {
				title: 'sell phone',
				values: values,
				colorset: ['#886aea']
			},
			'chartDiv': 'chart',
			'chartType': 'column',
			'chartSize': { width: 340, height: 400 },
			'maxValue': maxVal,
			'increment': 50
		};

		Nwagon.chart(options);

	};

});
