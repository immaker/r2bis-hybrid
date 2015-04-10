/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.charts', [])

.controller('ChartsCtrl', function($scope, $state, searchParam, SessionInfo, calendarInit) {

		// datepicker 초기 설정
		var date = new Date();
		$scope.fromDate = calendarInit.getPrtDate01(date);
		$scope.toDate = calendarInit.getPrtDate(date);

		$scope.fromOptions = {
			format: 'yyyy-mm-dd',
			hiddenName: true,
			onSet: function() {
				$scope.fromDate = this.get('select', 'yyyy-mm-dd');
			}
		};
		$scope.toOptions = {
			format: 'yyyy-mm-dd',
			hiddenName: true,
			onSet: function() {
				$scope.toDate = this.get('select', 'yyyy-mm-dd');
			}
		};

		$scope.searchChart = function(){

			var userInfo = SessionInfo.getCurrentUser();
			var param = {
				"uid": userInfo.AUTH_ID,
				"fromYmd": $scope.fromDate,
				"toYmd": $scope.toDate
			};
			// todo validate
			searchParam.setParam(param);
			$state.go('tab.charts-detail');
		};
})

.controller('ChartsDetailCtrl', function($scope, $http, $ionicLoading, searchParam) {

	var param = searchParam.getParam();

	$ionicLoading.show({
		template: 'Loading...'
	});

	$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesTopGroup", JSON.stringify(param))
		.success(function(data, status) {

			var changeStr =	data.d.replace(/상위그룹/gi,'target');

			var parseData = JSON.parse(changeStr);

			if (status === 200) {
				if (!parseData.length)  {
					$scope.saleList = [{'target': '데이터가 없습니다.'}];
				} else {
					$scope.showGraph(parseData);
					//sale json data
					$scope.saleList = parseData;
				}

				$ionicLoading.hide();
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

		if (!parseData.length) return false;

		var names = [];
		var values = [];
		var maxVal = 0;

		for (var i= 1, len = parseData.length; i<len; i++)
		{
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